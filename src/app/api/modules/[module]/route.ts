import { NextRequest } from "next/server";
import { completeJSON, errorResponse, isDemo } from "@/lib/ai/provider";
import { demoPolish, demoSections, demoSlide, demoStoryline, demoTeam } from "@/lib/ai/demo";
import { PERSONA, polishPrompt, proposalContext, sectionsPrompt, slidePrompt, storylinePrompt, teamPrompt } from "@/lib/ai/prompts";
import { MODULE_MAP } from "@/lib/modules";
import { PEOPLE_DIRECTORY } from "@/lib/seed";
import type { ModuleId, PolishAnalysis, Proposal, Slide, StorylineSection, TeamFormationResult } from "@/lib/types";

export const maxDuration = 60;

interface Body {
  proposal: Partial<Proposal>;
  /** Regenerate only this section (section modules). */
  sectionId?: string;
  /** Regenerate a single storyline slide. */
  slide?: { section: string; title: string };
  /** Client research markdown, fed into the storyline. */
  clientResearch?: string;
  /** Draft proposal text for Polish Proposal. */
  draft?: string;
}

export async function POST(req: NextRequest, ctx: RouteContext<"/api/modules/[module]">) {
  const { module } = await ctx.params;
  const mod = MODULE_MAP[module as ModuleId];
  if (!mod) return Response.json({ error: "NOT_FOUND", message: `Unknown module ${module}` }, { status: 404 });

  try {
    const body = (await req.json()) as Body;
    const p = body.proposal ?? {};
    const context = proposalContext(p, mod.id);
    const demo = isDemo();
    const system = { role: "system" as const, content: PERSONA };

    switch (mod.kind) {
      case "sections": {
        const sections = body.sectionId ? mod.sections.filter((s) => s.id === body.sectionId) : mod.sections;
        if (!sections.length) return Response.json({ error: "NOT_FOUND", message: "Unknown section" }, { status: 404 });
        if (demo) return Response.json({ sections: demoSections(p, sections) });
        const data = await completeJSON<Record<string, unknown>>({
          messages: [system, { role: "user", content: sectionsPrompt(mod, sections, context) }],
          maxTokens: 400 * sections.length + 1200,
        });
        const out = Object.fromEntries(sections.map((s) => [s.id, toMarkdown(data[s.id])]));
        return Response.json({ sections: out });
      }

      case "storyline": {
        if (body.slide) {
          if (demo) return Response.json({ slide: demoSlide(p, body.slide.section) });
          const slide = await completeJSON<Slide>({
            messages: [system, { role: "user", content: slidePrompt(body.slide.section, body.slide.title, context) }],
            maxTokens: 1200,
          });
          return Response.json({ slide: normalizeSlide(slide) });
        }
        if (demo) return Response.json({ sections: demoStoryline(p, mod.sections) });
        const data = await completeJSON<{ sections: StorylineSection[] }>({
          messages: [system, { role: "user", content: storylinePrompt(mod.sections, context, body.clientResearch) }],
          maxTokens: 5000,
        });
        // Keep the canonical section order and names even if the model drifts.
        const sections = mod.sections.map((s, i) => {
          const match = data.sections?.find((x) => x.name?.toLowerCase() === s.title.toLowerCase()) ?? data.sections?.[i];
          return { name: s.title, slides: (match?.slides ?? []).map(normalizeSlide) };
        });
        return Response.json({ sections });
      }

      case "team": {
        if (demo) return Response.json({ team: demoTeam(PEOPLE_DIRECTORY) });
        const team = await completeJSON<TeamFormationResult>({
          messages: [system, { role: "user", content: teamPrompt(context, PEOPLE_DIRECTORY) }],
          maxTokens: 3500,
        });
        return Response.json({ team: normalizeTeam(team) });
      }

      case "polish": {
        const draft = body.draft?.trim() || p.draftProposal?.text?.trim();
        if (!draft) {
          return Response.json(
            { error: "NO_DRAFT", message: "Upload or paste a draft proposal to review." },
            { status: 400 },
          );
        }
        if (demo) return Response.json({ polish: demoPolish() });
        const polish = await completeJSON<PolishAnalysis>({
          messages: [system, { role: "user", content: polishPrompt(context, draft) }],
          maxTokens: 4000,
        });
        return Response.json({ polish: { ...polish, sections: polish.sections ?? [] } });
      }
    }
  } catch (err) {
    return errorResponse(err);
  }
}

function toMarkdown(v: unknown): string {
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v.map((x) => `- ${typeof x === "string" ? x : JSON.stringify(x)}`).join("\n");
  if (v && typeof v === "object") return Object.entries(v).map(([k, x]) => `**${k}:** ${toMarkdown(x)}`).join("\n\n");
  return "No content generated.";
}

function normalizeSlide(s: Partial<Slide>): Slide {
  return { title: String(s?.title ?? "Untitled slide"), bullets: Array.isArray(s?.bullets) ? s.bullets.map(String) : [] };
}

function normalizeTeam(t: Partial<TeamFormationResult>): TeamFormationResult {
  const arr = (x: unknown) => (Array.isArray(x) ? x.map(String) : []);
  return {
    summary: String(t.summary ?? ""),
    teamMembers: (t.teamMembers ?? []).map((m) => ({
      ...m,
      matchScore: Math.max(0, Math.min(100, Number(m.matchScore) || 0)),
      industryExpertise: arr(m.industryExpertise),
      individualCapabilities: arr(m.individualCapabilities),
      pastProjects: arr(m.pastProjects),
    })),
    suggestedRoles: arr(t.suggestedRoles),
    potentialGaps: arr(t.potentialGaps),
    capabilityInsights: String(t.capabilityInsights ?? ""),
  };
}
