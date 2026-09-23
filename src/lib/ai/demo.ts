import "server-only";
import type { SectionDef } from "@/lib/modules";
import type { StoryBookmark } from "./prompts";
import type { Person, PolishAnalysis, Proposal, Slide, StorylineSection, TeamFormationResult } from "@/lib/types";

/**
 * Canned content for AI_PROVIDER=demo. It is templated from the proposal fields so the
 * UI behaves end-to-end without any model; every block is labelled as sample content.
 */

const NOTE = "> _Demo mode: sample content. Add a `GEMINI_API_KEY` to generate real analysis, then click Regenerate._";

const client = (p: Partial<Proposal>) => p.clientName || "the client";
const topic = (p: Partial<Proposal>) => p.proposalName || "this engagement";

export function demoSections(p: Partial<Proposal>, sections: SectionDef[]): Record<string, string> {
  return Object.fromEntries(
    sections.map((s) => [
      s.id,
      s.id === "sources"
        ? `${NOTE}\n\n- [${client(p)} investor relations](https://www.google.com/search?q=${encodeURIComponent(
            `${client(p)} investor relations`,
          )}) - Annual reports and earnings materials\n- [Recent news coverage](https://news.google.com/search?q=${encodeURIComponent(
            client(p),
          )}) - Latest announcements and leadership commentary`
        : `${NOTE}\n\n**Focus:** ${s.guidance}\n\n` +
          `- **${client(p)}** context applied to ${s.title.toLowerCase()}, tailored to *${topic(p)}*.\n` +
          `- Key considerations drawn from the proposal context and competitive landscape.\n` +
          `- Recommended next step: validate with the topic expert and the client team.\n\n` +
          (p.proposalContext ? `**From the brief:** ${p.proposalContext.slice(0, 220)}…` : ""),
    ]),
  );
}

export function demoStoryline(p: Partial<Proposal>, sections: SectionDef[], bookmarks?: StoryBookmark[]): StorylineSection[] {
  return sections.map((s, i) => ({
    name: s.title,
    slides: [demoSlide(p, s.title, 1, i === 0 ? bookmarks : undefined), demoSlide(p, s.title, 2)],
  }));
}

export function demoSlide(p: Partial<Proposal>, section: string, n = 1, bookmarks?: StoryBookmark[]): Slide {
  if (bookmarks?.length) {
    return {
      title: `${section}: what the team flagged about ${client(p)} (sample built from ${bookmarks.length} bookmark${bookmarks.length === 1 ? "" : "s"})`,
      bullets: bookmarks
        .slice(0, 5)
        .map((b) => `${b.text.replace(/[*_#>`]/g, "").replace(/^\s*-\s*/gm, "").replace(/\s+/g, " ").trim().slice(0, 140)} (${b.section ?? b.module})`),
    };
  }
  return {
    title: `${section}: ${client(p)} can unlock value from ${topic(p).toLowerCase()} (sample ${n})`,
    bullets: [
      `Demo mode sample slide for the ${section} section`,
      `Anchored on ${client(p)}'s stated priorities`,
      "Connect an AI provider to generate a real storyline",
    ],
  };
}

export function demoTeam(directory: Person[]): TeamFormationResult {
  return {
    summary: `${NOTE}\n\nA balanced team combining industry depth, technology delivery and commercial leadership.`,
    teamMembers: directory.slice(0, 5).map((m, i) => ({
      name: m.name,
      title: m.title ?? "Consultant",
      office: ["New York", "Chicago", "Dallas", "San Francisco", "Boston"][i],
      matchScore: 92 - i * 6,
      industryExpertise: ["Retail", "Consumer"],
      individualCapabilities: ["Transformation", "Stakeholder management"],
      pastProjects: ["Large-scale operating model redesign (sample)"],
    })),
    suggestedRoles: ["Engagement lead (Partner)", "Technology architect", "Change management lead"],
    potentialGaps: ["Deep ERP vendor-specific expertise (sample gap)"],
    capabilityInsights: "The sample team covers strategy and delivery; add a platform specialist for implementation credibility.",
  };
}

export function demoPolish(): PolishAnalysis {
  return {
    overallAssessment: `${NOTE}\n\nThe draft is well structured but could make the value case more concrete.`,
    score: 72,
    sections: [
      {
        name: "Executive Summary",
        strengths: ["Clear articulation of the client's challenge"],
        gaps: ["No quantified value at stake"],
        rewrites: [
          {
            before: "We will help transform your systems.",
            after: "We will modernize your core systems within 18 months, unlocking an estimated 2-3% margin uplift.",
          },
        ],
      },
    ],
  };
}

export function demoDetails(p: Partial<Proposal>) {
  return {
    proposalDescription: `BCG will partner with ${client(p)} on ${topic(p)}, combining industry expertise with hands-on delivery to create measurable impact. (Demo mode sample.)`,
    competitiveLandscape: "Expect competition from other strategy and technology consultancies. BCG differentiates through end-to-end ownership from strategy to implementation. (Demo mode sample.)",
    topicExpert: "A Partner from the relevant practice area with deep experience in similar transformations. (Demo mode sample.)",
    industryPracticeAreas: p.industryPracticeAreas?.length ? p.industryPracticeAreas : ["CP"],
    functionalPracticeAreas: p.functionalPracticeAreas?.length ? p.functionalPracticeAreas : ["TDA"],
  };
}

export function demoSources(p: Partial<Proposal>) {
  const c = (p.clientName || "Client").replace(/[^A-Za-z0-9]+/g, "_");
  return [
    { fileName: `${c}_Account_Plan_2025.pptx`, type: "Client Context", description: "Account plan and relationship history." },
    { fileName: `${c}_Industry_Benchmarks.xlsx`, type: "BCG IP", description: "Industry KPI benchmarks for comparison." },
    { fileName: "Transformation_Proposal_Template.pptx", type: "Past Proposal", description: "Winning proposal structure to reuse." },
    { fileName: "Practice_Credentials_Deck.pptx", type: "BCG IP", description: "Relevant credentials and case vignettes." },
  ];
}

export function demoChat(p: Partial<Proposal>, message: string) {
  // Leave out any quoted text from "Ask AI"; echo only the question itself.
  const question = message.split("\n").filter((l) => !l.startsWith(">")).join(" ").trim();
  return `${NOTE}\n\nYou asked: _"${question.slice(0, 200)}"_\n\nFor **${client(p)}**, I'd start by aligning on the client's top priorities, then map them to our approach and value case. Connect an AI provider and I'll answer this properly.`;
}
