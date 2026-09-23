import type { ModuleId } from "./types";

export interface SectionDef {
  id: string;
  title: string;
  /** Guidance given to the model for this section. */
  guidance: string;
}

export interface ModuleDef {
  id: ModuleId;
  title: string;
  shortTitle: string;
  kind: "sections" | "storyline" | "team" | "polish";
  intro: string;
  sections: SectionDef[];
  /** Module that should be generated first to feed this one. */
  dependsOn?: ModuleId;
}

export const MODULES: ModuleDef[] = [
  {
    id: "client-research",
    title: "Client Research",
    shortTitle: "Client Research",
    kind: "sections",
    intro:
      "I'll build a full picture of the client: context, competitors, financials, leadership and priorities. Ask me to dig deeper on any section.",
    sections: [
      { id: "contextual-overview", title: "Contextual Overview", guidance: "Who the client is, business model, scale, footprint, and why this opportunity matters now." },
      { id: "industry-competitors", title: "Industry and Competitors", guidance: "Industry dynamics, key trends, and the client's main competitors with how they compare." },
      { id: "financial-information", title: "Financial Information", guidance: "Revenue, profitability, growth trajectory and recent financial performance. Flag figures that should be verified." },
      { id: "portfolio-offerings", title: "Company Portfolio & Offerings", guidance: "Business units, products, services and channels." },
      { id: "news-publications", title: "Latest News & Publications (Client & Leadership)", guidance: "Notable recent developments, announcements and leadership statements relevant to the proposal." },
      { id: "executive-profiles", title: "Client Executive Profiles & Background", guidance: "Profiles of key stakeholders named in the context and other likely decision makers: background, priorities, what they care about." },
      { id: "company-priorities", title: "Company/Client Priorities", guidance: "The client's strategic priorities and how they connect to this proposal." },
      { id: "sources", title: "Sources", guidance: "A markdown list of the public sources a researcher should consult to verify this research, formatted as '- [Title](url) - why it is useful'. Only use well-known, stable URLs (investor relations, annual reports, major news outlets)." },
    ],
  },
  {
    id: "client-engagement",
    title: "Client Engagement",
    shortTitle: "Client Engagement",
    kind: "sections",
    intro:
      "I'll map relationships with the client, recommend team pairings, and plan the engagement cadence through the proposal.",
    sections: [
      { id: "relationship-mapping", title: "Relationship Mapping Overview", guidance: "Map client stakeholders, their influence, stance and relationship strength with the BCG team." },
      { id: "engagement-pairings", title: "Recommended Engagement Team Pairings", guidance: "Pair each client stakeholder with the most suitable BCG team member and explain why." },
      { id: "prior-engagements", title: "Prior Engagements & Context Summary", guidance: "What prior work or touchpoints likely exist and what context to carry forward. Mark assumptions clearly." },
      { id: "industry-trends", title: "Industry Trends & Thought Leadership", guidance: "Relevant trends and BCG-style thought leadership angles to share with the client." },
      { id: "engagement-cadence", title: "Engagement Cadence & Follow-Up Plan", guidance: "A week-by-week plan of touchpoints up to the proposal due date, with owners." },
    ],
  },
  {
    id: "team-formation",
    title: "Team Formation",
    shortTitle: "Team Formation",
    kind: "team",
    intro:
      "I'll suggest a proposal and case team profile, the roles you need, and any capability gaps against the client's needs.",
    sections: [],
  },
  {
    id: "topic-research",
    title: "Topic Research",
    shortTitle: "Topic Research",
    kind: "sections",
    intro:
      "I'll pull together the methods, primers, credentials and benchmarks that support this topic. Ask me for specific cases or experts.",
    sections: [
      { id: "methods-tools", title: "Methods & Tools", guidance: "Frameworks, methodologies and tools relevant to this topic." },
      { id: "industry-primer", title: "Industry Primer", guidance: "A concise primer on the industry and topic for the team." },
      { id: "past-proposal", title: "Past Proposal", guidance: "The kinds of past proposals worth reusing and which elements to borrow." },
      { id: "credentials", title: "Credentials", guidance: "Types of credentials and case experience to showcase, described generically (no fabricated client names)." },
      { id: "vignettes", title: "Vignettes", guidance: "2-3 short illustrative case vignettes (anonymized, clearly marked as illustrative)." },
      { id: "experts", title: "Experts", guidance: "Expert profiles to involve (by role/expertise, plus the named topic expert if provided)." },
      { id: "benchmarks", title: "Benchmarks", guidance: "Relevant industry benchmarks and KPIs, with ranges. Flag figures that need verification." },
      { id: "client-references", title: "Client References", guidance: "What kind of client references would be most persuasive and how to position them." },
    ],
  },
  {
    id: "storyline",
    title: "Storyline & Proposal",
    shortTitle: "Storyline & Proposal",
    kind: "storyline",
    dependsOn: "client-research",
    intro:
      "I'll draft the proposal storyline section by section, slide by slide. Ask me to sharpen any headline or restructure the flow.",
    sections: [
      { id: "hypothesis-perspective", title: "Hypothesis & Perspective", guidance: "Our point of view on the client's situation and the core hypothesis." },
      { id: "why-bcg-value", title: "Why BCG & Value", guidance: "Why BCG is uniquely positioned and the value at stake." },
      { id: "approach-methodology", title: "Approach & Methodology", guidance: "Phased approach, activities, deliverables and timeline." },
      { id: "team-experience", title: "Team & Experience", guidance: "Proposed team structure and relevant experience." },
      { id: "executive-summary", title: "Executive Summary", guidance: "One-page summary of the whole proposal." },
    ],
  },
  {
    id: "commercial",
    title: "Commercial Approach",
    shortTitle: "Commercial Approach",
    kind: "sections",
    intro:
      "I'll help define pricing logic, phasing, value articulation, and investment framing. Ask for alternative pricing shapes, benchmarks, or sensitivities anytime.",
    sections: [
      { id: "pricing-strategy", title: "Pricing Strategy", guidance: "Recommended pricing model (fixed fee, T&M, value-based, hybrid) with rationale and indicative structure." },
      { id: "investment-framing", title: "Investment Framing", guidance: "How to frame the fee against value at stake and ROI." },
      { id: "delivery-model", title: "Delivery Model", guidance: "Staffing model, phasing, onshore/offshore mix and governance." },
      { id: "competitive-edge", title: "Competitive Edge", guidance: "How our commercial offer beats the named competitors." },
      { id: "risks-watchouts", title: "Risks & Watchouts", guidance: "Commercial risks, assumptions and mitigations." },
      { id: "expert-contacts", title: "Expert Contacts", guidance: "Which internal roles/experts to consult on pricing and delivery." },
    ],
  },
  {
    id: "polish-proposal",
    title: "Polish Proposal",
    shortTitle: "Polish Proposal",
    kind: "polish",
    intro:
      "Upload or paste a draft proposal and I'll review it section by section with strengths, gaps and suggested rewrites.",
    sections: [],
  },
  {
    id: "practice-pitch",
    title: "Practice Pitch",
    shortTitle: "Practice Pitch",
    kind: "sections",
    intro:
      "I'll prepare you for the pitch with the questions the client is most likely to ask, by persona and by slide.",
    sections: [
      { id: "top-questions", title: "Top 5 Questions the Client Will Ask", guidance: "The 5 most likely tough questions, each with a crisp suggested answer." },
      { id: "persona-questions", title: "Persona-Specific Questions", guidance: "Questions grouped by stakeholder persona (e.g. CIO, CFO, COO), with suggested answers." },
      { id: "roleplay-questions", title: "Slide-Specific or Role-Play Questions", guidance: "A short role-play script and slide-specific challenges to rehearse." },
    ],
  },
];

export const MODULE_IDS = MODULES.map((m) => m.id);

export const MODULE_MAP = Object.fromEntries(MODULES.map((m) => [m.id, m])) as Record<ModuleId, ModuleDef>;

export const OVERVIEW_INTRO =
  "I have full context of your proposal details and can help you develop comprehensive client research, commercial approaches, storylines, and more. Select a module or ask me anything to get started!";

export const INDUSTRY_PRACTICE_AREAS = [
  { value: "CP", label: "CP – Consumer" },
  { value: "EN", label: "EN – Energy" },
  { value: "FIP", label: "FIP – Financial Institutions" },
  { value: "HC", label: "HC – Health Care" },
  { value: "IG", label: "IG – Industrial Goods" },
  { value: "INS", label: "INS – Insurance" },
  { value: "PS", label: "PS – Public Sector" },
  { value: "TCI", label: "TCI – Travel, Cities & Infrastructure" },
  { value: "TMT", label: "TMT – Technology, Media & Telecom" },
  { value: "PIPE", label: "PIPE – Principal Investors & Private Equity" },
  { value: "TRF", label: "TRF – BCG Transform" },
];

export const FUNCTIONAL_PRACTICE_AREAS = [
  { value: "CFS", label: "CFS – Corporate Finance & Strategy" },
  { value: "GA", label: "GA – Global Advantage" },
  { value: "MSP", label: "MSP – Marketing Sales & Pricing" },
  { value: "OPS", label: "OPS – Operations" },
  { value: "POP", label: "POP – People & Organization" },
  { value: "RSK", label: "RSK – Risk and Compliance" },
  { value: "SI", label: "SI – Social Impact" },
  { value: "TDA", label: "TDA – Tech and Digital Advantage" },
  { value: "CROSS", label: "Cross Practice Topics" },
];
