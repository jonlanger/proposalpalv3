import type { ModuleContent, ModuleId, Proposal } from "@/lib/types";

export interface SourceLink {
  title: string;
  url: string;
}

/** Public-information profile of a client, summarized from filings and news. */
export interface CompanyProfile {
  id: string;
  name: string;
  /** Lower-case names used to match a proposal's client name. */
  aliases: string[];
  industry: string;
  headquarters: string;
  asOf: string;
  overview: string;
  financials: string[];
  segments: string[];
  leadership: string[];
  priorities: string[];
  recentDevelopments: string[];
  competitors: string[];
  sources: SourceLink[];
}

/** A public consulting case study, paraphrased, with a link to the original. */
export interface CaseStudy {
  firm: string;
  title: string;
  summary: string;
  industries: string[];
  url: string;
}

/** Consulting best-practice guidance used as grounding for a module. */
export interface Playbook {
  modules: ModuleId[];
  title: string;
  points: string[];
  sources: SourceLink[];
}

/** A fully pre-filled demo proposal. */
export interface DemoProposal {
  proposal: Proposal;
  content: Partial<Record<ModuleId, Omit<ModuleContent, "generatedAt">>>;
}
