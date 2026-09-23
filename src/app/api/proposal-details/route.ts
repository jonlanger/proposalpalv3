import { NextRequest } from "next/server";
import { completeJSON, errorResponse, isDemo } from "@/lib/ai/provider";
import { demoDetails } from "@/lib/ai/demo";
import { detailsPrompt, PERSONA, proposalContext } from "@/lib/ai/prompts";
import { FUNCTIONAL_PRACTICE_AREAS, INDUSTRY_PRACTICE_AREAS } from "@/lib/modules";
import type { Proposal } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const { proposal } = (await req.json()) as { proposal: Partial<Proposal> };
    if (isDemo()) return Response.json({ details: demoDetails(proposal) });
    const data = await completeJSON<Record<string, unknown>>({
      messages: [
        { role: "system", content: PERSONA },
        { role: "user", content: detailsPrompt(proposalContext(proposal)) },
      ],
      maxTokens: 1500,
    });
    const codes = (v: unknown, list: { value: string }[]) =>
      Array.isArray(v) ? v.map(String).filter((c) => list.some((a) => a.value === c)) : [];
    return Response.json({
      details: {
        proposalDescription: String(data.proposalDescription ?? ""),
        competitiveLandscape: String(data.competitiveLandscape ?? ""),
        topicExpert: String(data.topicExpert ?? ""),
        industryPracticeAreas: codes(data.industryPracticeAreas, INDUSTRY_PRACTICE_AREAS),
        functionalPracticeAreas: codes(data.functionalPracticeAreas, FUNCTIONAL_PRACTICE_AREAS),
      },
    });
  } catch (err) {
    return errorResponse(err);
  }
}
