import "server-only";
import type { ModuleDef, SectionDef } from "@/lib/modules";
import { FUNCTIONAL_PRACTICE_AREAS, INDUSTRY_PRACTICE_AREAS } from "@/lib/modules";
import type { ModuleId, Person, Proposal } from "@/lib/types";
import { findCompany } from "@/data/companies";
import { caseStudiesFor, playbooksFor } from "@/data/playbooks";

/** Character budget for uploaded document text, to stay inside free-tier token limits. */
const DOC_BUDGET = 8000;

export const PERSONA =
  "You are ProposalPal, an expert proposal strategist at Boston Consulting Group (BCG). " +
  "You write crisp, specific, executive-ready content in markdown: short paragraphs, bullet lists, bold key phrases. " +
  "Ground everything in the proposal context provided. When you state facts about the client that you are not certain of " +
  "(financials, dates, names), say they should be verified rather than inventing precise figures. Never invent BCG case names or client references.";

const area = (codes: string[], list: { value: string; label: string }[]) =>
  codes.map((c) => list.find((a) => a.value === c)?.label ?? c).join(", ") || "—";

/**
 * Verified background the model should build on instead of re-deriving: the client's public
 * profile, the consulting playbook for this module, and analogous public case studies.
 */
export function knowledgeBlock(p: Partial<Proposal>, moduleId?: ModuleId | "overview"): string {
  const out: string[] = [];
  const c = findCompany(p.clientName);
  if (c) {
    out.push(
      `CLIENT PROFILE (public sources, ${c.asOf}; treat as verified facts and cite them rather than guessing):`,
      `${c.name} · ${c.industry} · HQ ${c.headquarters}`,
      c.overview,
      `Financials:\n${c.financials.map((x) => `- ${x}`).join("\n")}`,
      `Segments:\n${c.segments.map((x) => `- ${x}`).join("\n")}`,
      `Leadership:\n${c.leadership.map((x) => `- ${x}`).join("\n")}`,
      `Priorities:\n${c.priorities.map((x) => `- ${x}`).join("\n")}`,
      `Recent developments:\n${c.recentDevelopments.map((x) => `- ${x}`).join("\n")}`,
      `Competitors: ${c.competitors.join(", ")}`,
      `Sources:\n${c.sources.map((s) => `- [${s.title}](${s.url})`).join("\n")}`,
    );
  }
  if (moduleId && moduleId !== "overview") {
    for (const pb of playbooksFor(moduleId)) {
      out.push(`PLAYBOOK – ${pb.title}:\n${pb.points.map((x) => `- ${x}`).join("\n")}`);
    }
    const cases = caseStudiesFor([...(p.industryPracticeAreas ?? []), ...(p.functionalPracticeAreas ?? [])]);
    if (cases.length && ["topic-research", "storyline", "commercial", "practice-pitch"].includes(moduleId)) {
      out.push(
        "ANALOGOUS PUBLIC CASE STUDIES (other firms' published work; use as analogies only, never as BCG credentials unless the firm is BCG):\n" +
          cases.map((cs) => `- ${cs.firm}: ${cs.title} – ${cs.summary} (${cs.url})`).join("\n"),
      );
    }
  }
  return out.join("\n\n");
}

/** Renders the proposal as a compact context block for prompts, plus relevant knowledge. */
export function proposalContext(p: Partial<Proposal>, moduleId?: ModuleId | "overview"): string {
  const lines = [
    `Client: ${p.clientName ?? "—"}`,
    `Proposal: ${p.proposalName ?? "—"}`,
    `Opportunity ID: ${p.opportunityId ?? "—"}`,
    `Due date: ${p.proposalDate || "—"}`,
    `Industry practice areas: ${area(p.industryPracticeAreas ?? [], INDUSTRY_PRACTICE_AREAS)}`,
    `Functional practice areas: ${area(p.functionalPracticeAreas ?? [], FUNCTIONAL_PRACTICE_AREAS)}`,
    p.proposalContext && `\nProposal context:\n${p.proposalContext}`,
    p.proposalDescription && `\nProposal description:\n${p.proposalDescription}`,
    p.competitiveLandscape && `\nCompetitive landscape:\n${p.competitiveLandscape}`,
    p.topicExpert && `\nTopic expert:\n${p.topicExpert}`,
    p.teamMembers?.length && `\nBCG team: ${p.teamMembers.map((m) => `${m.name} (${m.title ?? m.role})`).join("; ")}`,
  ].filter(Boolean) as string[];

  const docs = [p.rfp && { ...p.rfp, label: "RFP" }, p.draftProposal && { ...p.draftProposal, label: "Draft proposal" }]
    .concat((p.uploadedFiles ?? []).map((f) => ({ ...f, label: f.type })))
    .filter((d): d is NonNullable<typeof d> & { text?: string; name: string; label: string } => !!d);

  const withText = docs.filter((d) => d.text);
  if (withText.length) {
    const per = Math.floor(DOC_BUDGET / withText.length);
    lines.push("\nUploaded documents (excerpts):");
    for (const d of withText) lines.push(`--- ${d.label}: ${d.name} ---\n${d.text!.slice(0, per)}`);
  } else if (docs.length) {
    lines.push(`\nAttached files (names only): ${docs.map((d) => d.name).join(", ")}`);
  }
  const knowledge = knowledgeBlock(p, moduleId);
  if (knowledge) lines.push(`\n${knowledge}`);
  return lines.join("\n");
}

export function sectionsPrompt(mod: ModuleDef, sections: SectionDef[], ctx: string, extra?: string) {
  const spec = sections.map((s) => `- "${s.id}" (${s.title}): ${s.guidance}`).join("\n");
  return `${ctx}${extra ? `\n\n${extra}` : ""}

Task: produce the "${mod.title}" module of this proposal.
Return a JSON object whose keys are exactly these section ids, each value a markdown string of 120-250 words (no top-level heading, the title is shown separately):
${spec}`;
}

export interface StoryBookmark {
  module: string;
  section?: string;
  text: string;
}

/** Team-flagged insights the storyline should be built around. */
function bookmarksBlock(bookmarks?: StoryBookmark[]) {
  if (!bookmarks?.length) return "";
  const items = bookmarks
    .slice(0, 25)
    .map((b, i) => `[B${i + 1}] (${b.module}${b.section ? ` › ${b.section}` : ""}) ${b.text.replace(/\s+/g, " ").slice(0, 600)}`)
    .join("\n");
  return `\n\nTEAM BOOKMARKS – insights the proposal team flagged as important. Build the storyline around them: turn the strongest into slide action titles or supporting bullets, and use every bookmark at least once where relevant. Do not quote them verbatim if a sharper phrasing works.\n${items}`;
}

export function storylinePrompt(sections: SectionDef[], ctx: string, research?: string, bookmarks?: StoryBookmark[]) {
  const spec = sections.map((s) => `- "${s.title}": ${s.guidance}`).join("\n");
  return `${ctx}${research ? `\n\nClient research summary:\n${research.slice(0, 3000)}` : ""}${bookmarksBlock(bookmarks)}

Task: draft the proposal storyline as slides. Sections, in this order:
${spec}

Return JSON: {"sections":[{"name":"<section name exactly as above>","slides":[{"title":"<action title: a full-sentence takeaway>","bullets":["<supporting point>", "..."]}]}]}
Use 2-3 slides per section and 3-5 bullets per slide.`;
}

export function slidePrompt(section: string, slideTitle: string, ctx: string, bookmarks?: StoryBookmark[]) {
  return `${ctx}${bookmarksBlock(bookmarks)}

Task: rewrite one slide in the "${section}" section of the proposal storyline. The current title is: "${slideTitle}".
Make it sharper and more specific to the client. Return JSON: {"title":"...","bullets":["...", "..."]} with 3-5 bullets.`;
}

export function teamPrompt(ctx: string, directory: Person[]) {
  const people = directory.map((p) => `- ${p.name}, ${p.title}`).join("\n");
  return `${ctx}

Available BCG people (choose only from this list, do not invent people):
${people}

Task: recommend the proposal team. Return JSON:
{"summary":"<2-3 sentence markdown overview>",
 "teamMembers":[{"name":"<from list>","title":"<their title>","office":"<plausible BCG office>","matchScore":<0-100>,
   "industryExpertise":["..."],"individualCapabilities":["..."],"pastProjects":["<generic, anonymized project description>"]}],
 "suggestedRoles":["<role and why it is needed>"],
 "potentialGaps":["<capability gap and how to close it>"],
 "capabilityInsights":"<markdown paragraph>"}
Recommend 4-6 people, sorted by matchScore descending.`;
}

export function polishPrompt(ctx: string, draft: string) {
  return `${ctx}

Draft proposal to review:
"""
${draft.slice(0, 12000)}
"""

Task: review the draft like a demanding BCG partner. Return JSON:
{"overallAssessment":"<markdown, 3-5 sentences>","score":<0-100>,
 "sections":[{"name":"<section of the draft>","strengths":["..."],"gaps":["..."],"rewrites":[{"before":"<exact short excerpt>","after":"<improved version>"}]}]}
Cover 3-6 sections of the draft, with 1-2 rewrites each.`;
}

export function detailsPrompt(ctx: string) {
  const ind = INDUSTRY_PRACTICE_AREAS.map((a) => a.value).join(", ");
  const fn = FUNCTIONAL_PRACTICE_AREAS.map((a) => a.value).join(", ");
  return `${ctx}

Task: fill in the remaining proposal details. Return JSON:
{"proposalDescription":"<3-4 sentences: what BCG will do and the value>",
 "competitiveLandscape":"<3-4 sentences on likely competitors and how BCG differentiates>",
 "topicExpert":"<the profile of the ideal topic expert (role, practice, experience). Do not invent a name>",
 "industryPracticeAreas":["<1-2 codes from: ${ind}>"],
 "functionalPracticeAreas":["<1-3 codes from: ${fn}>"]}`;
}

export function sourcesPrompt(ctx: string) {
  return `${ctx}

Task: suggest 6 internal data sources (documents) a BCG team would pull for this proposal, as realistic file names.
Return JSON: {"sources":[{"fileName":"<e.g. Retail_ERP_Benchmarks_2025.pptx>","type":"<one of: Client Context, Past Proposal, BCG IP, Other>","description":"<one sentence>"}]}`;
}

export function chatSystem(ctx: string, moduleTitle?: string, moduleContent?: string) {
  return `${PERSONA}

You are helping the team build this proposal:
${ctx}
${moduleTitle ? `\nThe user is currently working in the "${moduleTitle}" module.` : ""}${
    moduleContent ? `\nCurrent module content (for reference):\n${moduleContent.slice(0, 4000)}` : ""
  }

Answer in markdown. Be concise and specific; offer next steps when useful.`;
}
