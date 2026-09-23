import { NextRequest } from "next/server";
import { completeJSON, errorResponse, isDemo } from "@/lib/ai/provider";
import { demoSources } from "@/lib/ai/demo";
import { PERSONA, proposalContext, sourcesPrompt } from "@/lib/ai/prompts";
import type { FileCategory, Proposal } from "@/lib/types";

const TYPES: FileCategory[] = ["Client Context", "Past Proposal", "BCG IP", "Other"];

export async function POST(req: NextRequest) {
  try {
    const { proposal } = (await req.json()) as { proposal: Partial<Proposal> };
    const raw = isDemo()
      ? demoSources(proposal)
      : (
          await completeJSON<{ sources: { fileName: string; type: string; description: string }[] }>({
            messages: [
              { role: "system", content: PERSONA },
              { role: "user", content: sourcesPrompt(proposalContext(proposal)) },
            ],
            maxTokens: 1200,
          })
        ).sources ?? [];
    const sources = raw.map((s, i) => ({
      id: `src-${Date.now()}-${i}`,
      fileName: String(s.fileName),
      type: (TYPES.includes(s.type as FileCategory) ? s.type : "Other") as FileCategory,
      description: String(s.description ?? ""),
    }));
    return Response.json({ sources });
  } catch (err) {
    return errorResponse(err);
  }
}
