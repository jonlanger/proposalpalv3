import { NextRequest } from "next/server";
import { complete, getProvider } from "@/lib/ai/provider";

export const maxDuration = 60;

/** Which AI provider is active. Add ?check=1 to send a tiny live request and time it. */
export async function GET(req: NextRequest) {
  let provider: string;
  let model: string;
  try {
    ({ name: provider, model } = getProvider());
  } catch (err) {
    return Response.json({ provider: "error", model: "", message: (err as Error).message });
  }
  if (!req.nextUrl.searchParams.has("check") || provider === "demo") return Response.json({ provider, model });

  const started = Date.now();
  try {
    const reply = await complete({ messages: [{ role: "user", content: "Reply with exactly: OK" }], maxTokens: 256 });
    return Response.json({ provider, model, ok: true, reply: reply.trim().slice(0, 100), ms: Date.now() - started });
  } catch (err) {
    return Response.json({ provider, model, ok: false, error: (err as Error).message, ms: Date.now() - started });
  }
}
