import { NextRequest } from "next/server";
import { errorResponse, isDemo, streamStatic, streamText } from "@/lib/ai/provider";
import { demoChat } from "@/lib/ai/demo";
import { chatSystem, proposalContext } from "@/lib/ai/prompts";
import { MODULE_MAP } from "@/lib/modules";
import type { ModuleId, Proposal } from "@/lib/types";

export const maxDuration = 60;

interface Body {
  proposal: Partial<Proposal>;
  messages: { role: "user" | "assistant"; content: string }[];
  moduleId?: ModuleId | "overview";
  moduleContent?: string;
  /** Text of a file attached to this message. */
  attachment?: { name: string; text: string };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body;
    const history = (body.messages ?? []).slice(-12);
    const last = history.at(-1);
    if (!last || last.role !== "user") {
      return Response.json({ error: "BAD_REQUEST", message: "Last message must be from the user." }, { status: 400 });
    }
    if (body.attachment) {
      history[history.length - 1] = {
        ...last,
        content: `${last.content}\n\nAttached file "${body.attachment.name}":\n"""\n${body.attachment.text.slice(0, 10000)}\n"""`,
      };
    }

    const headers = { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" };
    if (isDemo()) return new Response(streamStatic(demoChat(body.proposal ?? {}, last.content)), { headers });

    const mod = body.moduleId && body.moduleId !== "overview" ? MODULE_MAP[body.moduleId] : undefined;
    const system = chatSystem(proposalContext(body.proposal ?? {}, body.moduleId), mod?.title, body.moduleContent);
    const stream = await streamText({
      messages: [{ role: "system", content: system }, ...history],
      maxTokens: 2500,
      temperature: 0.6,
    });
    return new Response(stream, { headers });
  } catch (err) {
    return errorResponse(err);
  }
}
