import type { ModuleId } from "@/lib/types";
import type { CaseStudy, Playbook } from "./types";

/**
 * Consulting best practices, paraphrased from public sources and linked for reference.
 * These ground the AI for each module; they are guidance, not quotations.
 */
export const PLAYBOOKS: Playbook[] = [
  {
    modules: ["storyline", "polish-proposal", "practice-pitch"],
    title: "Answer-first storytelling (Pyramid Principle and SCQA)",
    points: [
      "Lead with the governing recommendation, then two or three grouped supporting arguments, then evidence (the Pyramid Principle, developed by Barbara Minto at McKinsey).",
      "Open the executive summary with SCQA: the Situation (agreed facts), the Complication (why act now), the Question it raises, and the Answer (our recommendation).",
      "Write every slide title as an action title: a full sentence stating the takeaway (e.g., 'Warranty cost has grown twice as fast as revenue since 2023'), not a topic label ('Warranty overview').",
      "Keep titles specific, concise and in the active voice; if you read only the titles in sequence, they should tell the whole story.",
      "Write from the client's side: describe their problem and outcomes before our methods, and quantify value wherever possible.",
      "Aim for at least one genuinely new insight per section, such as a fresh metric or benchmark, rather than restating the RFP.",
    ],
    sources: [
      { title: "ModelThinkers: Minto Pyramid & SCQA", url: "https://modelthinkers.com/mental-model/minto-pyramid-scqa" },
      { title: "Slideworks: How to write action titles", url: "https://slideworks.io/resources/how-to-write-action-titles-like-mckinsey" },
      { title: "Shipley: Seven rules for writing winning proposals", url: "https://www.shipleywins.com/blogs/seven-rules-for-writing-winning-proposals" },
    ],
  },
  {
    modules: ["storyline", "topic-research", "commercial", "client-research"],
    title: "What makes transformations succeed (BCG research)",
    points: [
      "BCG found only about 30% of digital transformations fully meet their objectives; getting six factors right raises the odds to about 80%.",
      "The six factors: an integrated strategy with clear goals; leadership commitment from the CEO through middle management; top talent on the critical initiatives; agile governance; rigorous tracking of outcomes; and a business-led, modular technology and data platform.",
      "For AI, BCG's 10-20-70 rule: about 10% of the effort is algorithms, 20% technology and data, and 70% people, processes and ways of working.",
      "AI leaders concentrate investment on reshaping core functions and new offerings rather than scattered productivity pilots.",
    ],
    sources: [
      { title: "BCG: Flipping the Odds of Digital Transformation Success", url: "https://www.bcg.com/publications/2020/increasing-odds-of-success-in-digital-transformation" },
      { title: "BCG: The Widening AI Value Gap (Build for the Future 2025)", url: "https://media-publications.bcg.com/The-Widening-AI-Value-Gap-Sept-2025.pdf" },
      { title: "BCG: Closing the AI Impact Gap", url: "https://www.bcg.com/publications/2025/closing-the-ai-impact-gap" },
    ],
  },
  {
    modules: ["commercial"],
    title: "Commercial models for consulting engagements",
    points: [
      "Fixed fee suits a well-defined scope (a diagnostic, a strategy phase); price the scope and the change-control process explicitly.",
      "Time and materials suits high uncertainty or evolving scope; cap it or set a not-to-exceed amount to protect the client.",
      "Value-based or outcome-linked fees tie part of the fee to measured results (savings realized, revenue uplift). They need an agreed baseline, measurement method and attribution rules.",
      "Hybrids are now common: a fixed fee for diagnosis and design, then a capped T&M or outcome-linked implementation phase.",
      "Frame the investment against the value at stake: a fee that is a small multiple of the first-year benefit, with phased gates so the client can stop after each phase.",
      "Common watch-outs: scope creep without change control, a baseline dispute on outcome fees, client resource commitments not written down, and exposure to currency or tariffs in global delivery.",
    ],
    sources: [
      { title: "Deltek: Consulting pricing models", url: "https://www.deltek.com/resources/articles/consulting-pricing-models/" },
      { title: "Toggl: Consulting pricing models", url: "https://toggl.com/blog/consulting-pricing-models" },
    ],
  },
  {
    modules: ["client-engagement", "team-formation"],
    title: "Client relationship and team design",
    points: [
      "Map every decision maker and influencer: their role, their stance on the initiative, what they care about, and the strength of our relationship with them.",
      "Pair each senior client stakeholder with one named BCG counterpart at a matching level (partner to C-suite, principal to VP).",
      "Plan touchpoints backward from the due date: kickoff, hypothesis review, orals rehearsal and a pre-read to key sponsors.",
      "Staff the proposal team for the client's buying criteria: industry depth, functional expertise, implementation credibility and a named topic expert.",
      "Flag capability gaps early and close them with experts or alliance partners, rather than discovering them in the orals.",
    ],
    sources: [
      { title: "Flowcase: Consulting proposal management guide", url: "https://www.flowcase.com/blog/consulting-proposal-management-the-complete-guide-to-winning-more-bids" },
      { title: "FIRMSconsulting: Tips for winning consulting proposals", url: "https://firmsconsulting.com/tips-for-writing-winning-consulting-proposals/" },
    ],
  },
  {
    modules: ["practice-pitch"],
    title: "Orals and pitch preparation",
    points: [
      "Expect the top questions to be on value (how sure are you of the numbers?), risk (what could go wrong?), team (who exactly will be on site?), differentiation (why you over the incumbent?) and price.",
      "Prepare persona-specific answers: CFOs probe the business case and fee structure, CIOs probe architecture and vendor neutrality, COOs probe disruption to operations.",
      "Rehearse with a red team playing the client, including one hostile question per slide.",
      "Answer in the first sentence, then give evidence, and bring it back to the client's outcome.",
    ],
    sources: [
      { title: "Shipley: Seven rules for writing winning proposals", url: "https://www.shipleywins.com/blogs/seven-rules-for-writing-winning-proposals" },
    ],
  },
];

/** Public case studies, paraphrased. Use them as analogies; never present them as this client's work. */
export const CASE_STUDIES: CaseStudy[] = [
  {
    firm: "BCG",
    title: "Marketing transformation for a global convenience retailer",
    summary:
      "An end-to-end marketing transformation for one of the world's largest convenience retailers delivered about $200M of in-year growth, on a path to more than $1B of annual impact.",
    industries: ["retail", "convenience", "consumer"],
    url: "https://www.bcg.com/about/client-impact",
  },
  {
    firm: "BCG",
    title: "Pricing and promotions for a leading European grocer",
    summary:
      "A new pricing and promotions strategy using automated merchant analytics across about 25,000 SKUs beat promotional targets by about 33% in the first year.",
    industries: ["retail", "grocery", "consumer"],
    url: "https://www.bcg.com/about/client-impact",
  },
  {
    firm: "BCG",
    title: "End-to-end supply chain transformation for a global retailer",
    summary:
      "An approach that aligned planning, sourcing, logistics and stores cross-functionally instead of optimizing each silo.",
    industries: ["retail", "supply chain", "consumer"],
    url: "https://www.bcg.com/publications/2024/transformative-end-to-end-supply-chain-approach",
  },
  {
    firm: "BCG",
    title: "Retail in transition: AI for cost excellence (BCG and INVERTO)",
    summary:
      "Research on how retailers use AI across procurement, store operations and supply chain to structurally lower costs.",
    industries: ["retail", "consumer", "ai"],
    url: "https://web-assets.bcg.com/24/78/47e56cdf408f976e0a1e694f3141/bcg-inverto-report-retail-in-transition.pdf",
  },
  {
    firm: "BCG",
    title: "Automotive AI transformation with BMW (BCG X and AWS)",
    summary: "BCG X and AWS helped BMW implement and scale an AI transformation built around the customer.",
    industries: ["automotive", "industrial", "ai"],
    url: "https://bcg.com/en-in/capabilities/digital-technology-data/client-success",
  },
  {
    firm: "BCG",
    title: "Organization redesign at a global biotech",
    summary: "A cascaded, holistic organization design helped a global biotech cut gross labor and non-labor costs by about 20%.",
    industries: ["pharma", "biotech", "health care"],
    url: "https://www.bcg.com/industries/health-care/biopharma",
  },
  {
    firm: "BCG",
    title: "Sanofi's digital transformation journey",
    summary: "A multi-year digital and AI transformation across R&D, manufacturing and commercial at a global pharma company.",
    industries: ["pharma", "health care", "ai"],
    url: "https://www.bcg.com/x/mark-your-moment/pharmaceutical-transformation-journey",
  },
  {
    firm: "BCG",
    title: "ING Netherlands agile operating model",
    summary: "ING Bank Netherlands adopted an end-to-end agile model to speed up delivery and respond faster to clients.",
    industries: ["banking", "financial services"],
    url: "https://bcg.com/en-in/capabilities/digital-technology-data/client-success",
  },
  {
    firm: "BCG",
    title: "Core banking replacement at Banque Saudi Fransi",
    summary: "One of Saudi Arabia's largest banks implemented a new core banking system with BCG support.",
    industries: ["banking", "financial services", "erp", "core systems"],
    url: "https://bcg.com/en-in/capabilities/digital-technology-data/client-success",
  },
  {
    firm: "Bain",
    title: "An automaker redesigns customer experience around key episodes",
    summary:
      "Bain helped an automaker map the buying and ownership journey into episodes and focus redesign on about 20 high-value ones.",
    industries: ["automotive", "industrial"],
    url: "https://www.bain.com/client-results/an-automaker-reinvents-customer-experience-with-a-focus-on-key-episodes/",
  },
  {
    firm: "Bain",
    title: "A health insurer builds a digital factory",
    summary: "A health insurer set up a digital factory to propel its transformation, borrowing lessons from banking.",
    industries: ["health care", "insurance"],
    url: "https://www.bain.com/client-results/a-health-insurance-company-creates-a-digital-factory-to-propel-its-transformation/",
  },
  {
    firm: "Bain",
    title: "Retail bank redesigns customer episodes with agile teams",
    summary:
      "A North American retail bank reorganized around customer episodes; one team's balance-transfer redesign lifted response about tenfold, worth about $20M a year.",
    industries: ["banking", "financial services"],
    url: "https://www.bain.com/insights/breakthrough-design-for-a-better-customer-experience-and-better-economics/",
  },
  {
    firm: "McKinsey",
    title: "Rewired in action: tech and AI transformations",
    summary: "A collection of end-to-end technology and AI transformations with published outcomes across industries.",
    industries: ["ai", "banking", "industrial", "consumer"],
    url: "https://www.mckinsey.com/capabilities/mckinsey-digital/how-we-help-clients/rewired-in-action",
  },
  {
    firm: "McKinsey",
    title: "Operations case studies",
    summary: "Operations transformations, including AI demand forecasting in food and beverage and AI in contact centers.",
    industries: ["operations", "supply chain", "consumer", "industrial"],
    url: "https://www.mckinsey.com/capabilities/operations/case-studies",
  },
];

/** Industry keywords used to pick relevant case studies for a proposal. */
const PRACTICE_KEYWORDS: Record<string, string[]> = {
  CP: ["retail", "consumer", "convenience", "grocery"],
  IG: ["automotive", "industrial"],
  HC: ["pharma", "biotech", "health care"],
  FIP: ["banking", "financial services"],
  INS: ["insurance"],
  TDA: ["ai", "erp", "core systems"],
  OPS: ["operations", "supply chain"],
};

export function playbooksFor(moduleId: ModuleId) {
  return PLAYBOOKS.filter((p) => p.modules.includes(moduleId));
}

export function caseStudiesFor(practiceAreas: string[], limit = 5) {
  const words = new Set(practiceAreas.flatMap((a) => PRACTICE_KEYWORDS[a] ?? []));
  return CASE_STUDIES.map((c) => ({ c, score: c.industries.filter((i) => words.has(i)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.c);
}
