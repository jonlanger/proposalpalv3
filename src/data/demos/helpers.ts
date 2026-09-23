import { PEOPLE_DIRECTORY } from "@/lib/seed";
import type { Person, SuggestedTeamMember, TeamRole } from "@/lib/types";
import { COMPANIES } from "../companies";

export const ILLUSTRATIVE =
  "_Illustrative demo opportunity built on public information. Client facts are sourced; stakeholders' views, fees and estimates are hypothetical._";

/** Proposal team members by name, with roles in order (first is Owner). */
export function team(names: string[]): Person[] {
  return names.map((n, i) => {
    const p = PEOPLE_DIRECTORY.find((x) => x.name === n);
    if (!p) throw new Error(`Unknown person ${n}`);
    const role: TeamRole = i === 0 ? "Owner" : i === 1 ? "Editor" : "Viewer";
    return { ...p, role };
  });
}

export function member(
  name: string,
  office: string,
  matchScore: number,
  industryExpertise: string[],
  individualCapabilities: string[],
  pastProjects: string[],
): SuggestedTeamMember {
  const p = PEOPLE_DIRECTORY.find((x) => x.name === name);
  if (!p) throw new Error(`Unknown person ${name}`);
  return { name, title: p.title ?? "", office, matchScore, industryExpertise, individualCapabilities, pastProjects };
}

/** The Client Research "Sources" section, built from the company profile's sources. */
export function sourcesSection(companyId: string, extra: { title: string; url: string; why: string }[] = []) {
  const c = COMPANIES.find((x) => x.id === companyId)!;
  const lines = c.sources.map((s) => `- [${s.title}](${s.url})`);
  const more = extra.map((s) => `- [${s.title}](${s.url}) - ${s.why}`);
  return [...lines, ...more, "", "_Figures are rounded from these sources as of September 2026. Verify before client use._"].join("\n");
}

export const date = (iso: string) => Date.parse(`${iso}T12:00:00Z`);
