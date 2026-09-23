import "server-only";

/**
 * One OpenAI-compatible client for every supported backend. Groq, Gemini and Ollama
 * all expose an OpenAI-style /chat/completions endpoint, so only config differs.
 *
 *   AI_PROVIDER=groq    GROQ_API_KEY=...   [GROQ_MODEL=openai/gpt-oss-120b]
 *   AI_PROVIDER=gemini  GEMINI_API_KEY=... [GEMINI_MODEL=gemini-3.8-flash]
 *   AI_PROVIDER=ollama                     [OLLAMA_MODEL=llama3.1] [OLLAMA_BASE_URL=http://localhost:11434/v1]
 *   AI_PROVIDER=demo    (no AI; canned sample content)
 *
 * If AI_PROVIDER is unset, the first provider with a key wins (Gemini, then Groq), otherwise demo mode.
 */

export type ProviderName = "groq" | "gemini" | "ollama" | "demo";

export interface ChatTurn {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ProviderConfig {
  name: ProviderName;
  baseUrl: string;
  apiKey?: string;
  model: string;
}

export class AIError extends Error {
  constructor(
    message: string,
    public status = 500,
    public code: "RATE_LIMIT" | "CONFIG" | "UPSTREAM" | "PARSE" = "UPSTREAM",
  ) {
    super(message);
  }
}

export function getProvider(): ProviderConfig {
  const env = process.env;
  const explicit = env.AI_PROVIDER?.toLowerCase() as ProviderName | undefined;
  const name: ProviderName = explicit ?? (env.GEMINI_API_KEY ? "gemini" : env.GROQ_API_KEY ? "groq" : "demo");

  switch (name) {
    case "groq":
      if (!env.GROQ_API_KEY) throw new AIError("GROQ_API_KEY is not set. Add it to .env.local or set AI_PROVIDER=demo.", 500, "CONFIG");
      return { name, baseUrl: "https://api.groq.com/openai/v1", apiKey: env.GROQ_API_KEY, model: env.GROQ_MODEL || "openai/gpt-oss-120b" };
    case "gemini":
      if (!env.GEMINI_API_KEY) throw new AIError("GEMINI_API_KEY is not set. Add it to .env.local or set AI_PROVIDER=demo.", 500, "CONFIG");
      return { name, baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai", apiKey: env.GEMINI_API_KEY, model: env.GEMINI_MODEL || "gemini-3.8-flash" };
    case "ollama":
      return { name, baseUrl: env.OLLAMA_BASE_URL || "http://localhost:11434/v1", model: env.OLLAMA_MODEL || "llama3.1" };
    case "demo":
      return { name, baseUrl: "", model: "demo" };
    default:
      throw new AIError(`Unknown AI_PROVIDER "${explicit}". Use groq, gemini, ollama or demo.`, 500, "CONFIG");
  }
}

export function isDemo() {
  try {
    return getProvider().name === "demo";
  } catch {
    return false;
  }
}

interface RequestOptions {
  messages: ChatTurn[];
  json?: boolean;
  maxTokens?: number;
  temperature?: number;
  stream?: boolean;
}

/** `optional` = send response_format / reasoning_effort; dropped on retry if the model rejects them. */
async function request(cfg: ProviderConfig, opts: RequestOptions, optional = true): Promise<Response> {
  const body: Record<string, unknown> = {
    model: cfg.model,
    messages: opts.messages,
    temperature: opts.temperature ?? 0.5,
    // Gemini counts "thinking" tokens against max_tokens, so give it headroom for the answer itself.
    max_tokens: cfg.name === "gemini" ? Math.max(opts.maxTokens ?? 4096, 8192) : (opts.maxTokens ?? 4096),
    stream: !!opts.stream,
  };
  if (optional) {
    if (opts.json) body.response_format = { type: "json_object" };
    // Reasoning models: low effort keeps latency (and free-tier token usage) down.
    if (cfg.name === "gemini" || (cfg.name === "groq" && cfg.model.startsWith("openai/gpt-oss"))) body.reasoning_effort = "low";
  }

  let res: Response;
  try {
    res = await fetch(`${cfg.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(cfg.apiKey ? { Authorization: `Bearer ${cfg.apiKey}` } : {}),
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    const hint = cfg.name === "ollama" ? " Is Ollama running (`ollama serve`)?" : "";
    throw new AIError(`Could not reach ${cfg.name}.${hint} ${(err as Error).message}`, 502);
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    // Gemini reports a bad key as 400 "API key not valid".
    if (res.status === 401 || res.status === 403 || /API key not valid|API_KEY_INVALID/i.test(text)) {
      throw new AIError(`The ${cfg.name} API key was rejected. Check your environment variables.`, 500, "CONFIG");
    }
    if (res.status === 400 && optional && (body.response_format || body.reasoning_effort)) {
      return request(cfg, opts, false);
    }
    if (res.status === 429) {
      const retry = res.headers.get("retry-after");
      throw new AIError(
        `Rate limit or quota reached on ${cfg.name}.${retry ? ` Try again in ~${Math.ceil(Number(retry))}s.` : " Wait a minute and try again."}`,
        429,
        "RATE_LIMIT",
      );
    }
    throw new AIError(`${cfg.name} error (${res.status}): ${text.slice(0, 400)}`, 502);
  }
  return res;
}

/** Single, non-streaming completion. */
export async function complete(opts: Omit<RequestOptions, "stream">): Promise<string> {
  const cfg = getProvider();
  if (cfg.name === "demo") throw new AIError("Demo mode has no model.", 500, "CONFIG");
  const res = await request(cfg, opts);
  const data = await res.json();
  const content: string | undefined = data?.choices?.[0]?.message?.content;
  if (!content) throw new AIError("The model returned an empty response. Please try again.", 502);
  return content;
}

/** Completion that must return a JSON object. Retries once if parsing fails. */
export async function completeJSON<T>(opts: Omit<RequestOptions, "stream" | "json">): Promise<T> {
  for (let attempt = 0; attempt < 2; attempt++) {
    const text = await complete({ ...opts, json: true });
    const parsed = extractJSON<T>(text);
    if (parsed) return parsed;
  }
  throw new AIError("The AI response was malformed. Please try again.", 502, "PARSE");
}

export function extractJSON<T>(text: string): T | null {
  const cleaned = text.replace(/```(?:json)?/g, "").trim();
  const start = cleaned.search(/[[{]/);
  if (start < 0) return null;
  const end = Math.max(cleaned.lastIndexOf("}"), cleaned.lastIndexOf("]"));
  try {
    return JSON.parse(cleaned.slice(start, end + 1)) as T;
  } catch {
    return null;
  }
}

/** Streams completion text as plain UTF-8 chunks. */
export async function streamText(opts: Omit<RequestOptions, "stream" | "json">): Promise<ReadableStream<Uint8Array>> {
  const cfg = getProvider();
  const res = await request(cfg, { ...opts, stream: true });
  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  let emitted = false;
  let finishReason: string | undefined;
  let upstreamError: string | undefined;

  return new ReadableStream({
    // Keep reading until there is text to hand over; a pull that enqueues nothing can stall the stream.
    async pull(controller) {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) {
          if (!emitted) {
            // Surface empty answers instead of ending silently (e.g. the output budget went to reasoning).
            const why = finishReason === "length" ? "it ran out of output tokens while reasoning" : `finish reason: ${finishReason ?? "none"}`;
            controller.enqueue(encoder.encode(upstreamError ?? `⚠️ The model returned no text (${why}). Please try again.`));
          }
          controller.close();
          return;
        }
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        let sent = false;
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const payload = trimmed.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const json = JSON.parse(payload);
            if (json?.error) upstreamError = `⚠️ ${cfg.name} error: ${json.error.message ?? JSON.stringify(json.error)}`;
            const choice = json?.choices?.[0];
            if (choice?.finish_reason) finishReason = choice.finish_reason;
            const delta = choice?.delta?.content;
            if (delta) {
              controller.enqueue(encoder.encode(delta));
              emitted = sent = true;
            }
          } catch {
            // Ignore keep-alive or partial lines.
          }
        }
        if (sent) return;
      }
    },
    cancel() {
      reader.cancel();
    },
  });
}

/** Streams a fixed string in small chunks, so demo mode feels like a live model. */
export function streamStatic(text: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const words = text.split(/(\s+)/);
  let i = 0;
  return new ReadableStream({
    async pull(controller) {
      if (i >= words.length) {
        controller.close();
        return;
      }
      controller.enqueue(encoder.encode(words.slice(i, i + 4).join("")));
      i += 4;
      await new Promise((r) => setTimeout(r, 15));
    },
  });
}

export function errorResponse(err: unknown) {
  const e = err instanceof AIError ? err : new AIError((err as Error)?.message || "Unknown error");
  console.error(`[ai] ${e.code}: ${e.message}`);
  return Response.json({ error: e.code, message: e.message }, { status: e.status });
}
