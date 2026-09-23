import type { DemoProposal } from "../types";
import { date, ILLUSTRATIVE, member, sourcesSection, team } from "./helpers";

const DRAFT = `Executive Summary
Pfizer faces a large patent cliff. We propose to help Pfizer improve its commercial model so that new launches can replace lost revenue.

Background
Several Pfizer products will lose exclusivity. Pfizer has new products in oncology and has acquired Metsera.

Scope
- Review current commercial model
- Benchmark against peers
- Design new model
- Support launches

Approach
We will conduct interviews, analyze data and run workshops. AI will be used where helpful.

Timeline
20 weeks.`;

export const PFIZER: DemoProposal = {
  proposal: {
    id: "demo-pfizer",
    opportunityId: "533071-02",
    clientName: "Pfizer Inc.",
    proposalName: "Launch Excellence & AI-Enabled Commercial Model for the LOE Transition",
    proposalContext:
      "Pfizer's U.S. commercial leadership has requested proposals to redesign its commercial model ahead of a 2026–2028 loss-of-exclusivity wave (an estimated $17–18B of annual revenue at risk by 2028, including Eliquis, Ibrance and Xtandi). The objectives: (1) launch excellence for oncology and upcoming launches, and readiness for the obesity portfolio from Metsera, (2) resize and redeploy field and medical resources as mature brands lose exclusivity, and (3) scale AI-enabled omnichannel engagement with physicians, all within the SI&A envelope of the cost realignment program (2026 adjusted SI&A $12.5–13.5B). Decision targeted for Q1 2027; the finance point of contact is the Interim CFO's office.\n\n" +
      ILLUSTRATIVE,
    industryPracticeAreas: ["HC"],
    functionalPracticeAreas: ["MSP", "TDA"],
    proposalDate: "2026-12-11",
    proposalDescription:
      "BCG will help Pfizer shift commercial investment from brands losing exclusivity to launches and growth assets, without growing SI&A. We will design a launch excellence playbook, a flexible resourcing model that moves field and medical capacity as the portfolio changes, and AI-enabled omnichannel engagement, piloted on two launch brands.",
    competitiveLandscape:
      "IQVIA and ZS are strong on commercial analytics and field sizing; McKinsey and Bain have deep pharma commercial practices; Accenture will pitch omnichannel platforms. BCG differentiates through launch excellence, the integration of resourcing with SI&A targets, and BCG X AI build capability.",
    topicExpert:
      "Joe Smith, Principal – biopharma commercial excellence and launch strategy",
    uploadedFiles: [
      { name: "Pfizer_FY2025_Earnings_Release.pdf", type: "Client Context" },
      { name: "Pharma_Launch_Benchmarks_2026.xlsx", type: "BCG IP" },
      { name: "Oncology_Commercial_Model_Proposal_2025.pptx", type: "Past Proposal" },
    ],
    draftProposal: { name: "Pfizer_Commercial_Draft_v0.4.docx", type: "Past Proposal", text: DRAFT },
    teamMembers: team(["Joe Smith", "Hannah Kim", "David Okafor", "Amara Nwosu"]),
    createdAt: date("2026-09-08"),
    updatedAt: date("2026-09-20"),
  },
  content: {
    "client-research": {
      sections: {
        "contextual-overview":
          "**Pfizer is managing one of the largest patent cliffs in the industry** while rebuilding growth. 2025 revenue was **~$62.6B** (−2% operationally, but **+6% excluding COVID products**). An estimated **$17–18B** of annual revenue is at risk by 2028 as Eliquis, Ibrance, Xtandi and others lose exclusivity.\n\n**Growth bets:** oncology (Seagen), a return to obesity via **Metsera** (~$7B enterprise value, closed Nov 2025), and ~20 pivotal study starts in 2026.\n\n**Constraint:** SI&A is being held to **$12.5–13.5B** in 2026 under the cost realignment program. Commercial reinvention must be self-funding.",
        "industry-competitors":
          "**Industry forces:** the 2026–2030 LOE wave across big pharma, IRA price negotiation, obesity as the largest growth market, and digital/AI in HCP engagement.\n\n| Competitor | Angle |\n|---|---|\n| Eli Lilly / Novo Nordisk | Obesity leaders; the bar for the Metsera assets |\n| Merck, AstraZeneca | Oncology competition |\n| J&J, Novartis | Commercial model innovators |",
        "financial-information":
          "**2025:** revenue ~$62.6B; ex-COVID operational growth ~6%.\n**Cost realignment:** ~$5.7B of net savings expected through 2026; ~$500M of 2025 R&D savings reinvested.\n**2026 guidance:** revenue $59.5–62.5B; adjusted EPS $2.80–3.00; adjusted SI&A $12.5–13.5B.\n**LOE exposure:** ~$17–18B of annual revenue at risk by 2028 (analyst estimates vary).\n\n_Verify against the Q4 2025 release and 10-K._",
        "portfolio-offerings":
          "- **Primary care**: Eliquis (with BMS), Prevnar family, Abrysvo, Paxlovid, Comirnaty.\n- **Specialty care**: Vyndaqel family, Nurtec, Xeljanz.\n- **Oncology**: Ibrance, Xtandi (with Astellas), Padcev and ADCs from Seagen.\n- **Pipeline**: obesity (Metsera injectables and orals), oncology ADCs, vaccines.",
        "news-publications":
          "- **Nov 2025:** Metsera acquisition completed.\n- **Feb 2026:** FY2025 results; 2026 guidance reaffirmed; ~20 pivotal starts planned.\n- **May 2026:** Eliquis European exclusivity begins to erode.\n- **Jun 2026:** CFO Dave Denton to leave in August; Cecile Guegan named interim CFO.",
        "executive-profiles":
          "**Dr. Albert Bourla – Chairman & CEO**: champions science-led growth; has publicly framed 2026 as catalyst-rich.\n\n**Cecile Guegan – Interim CFO (from Aug 2026)**: previously SVP Finance for the global biopharma business. Likely to scrutinize SI&A neutrality.\n\n**U.S. Commercial leadership (sponsor)**: owns launches and field deployment; under pressure to deliver growth with a flat SI&A budget.\n\n_Views are hypotheses._",
        "company-priorities":
          "1. **Offset the LOE wave** with launches and growth brands.\n2. **Win in obesity** with the Metsera portfolio.\n3. **Deliver the cost realignment** and keep SI&A within guidance.\n4. **Execute ~20 pivotal starts** and advance oncology.\n5. **Use AI** to raise commercial and R&D productivity.",
        sources: sourcesSection("pfizer"),
      },
    },
    "client-engagement": {
      sections: {
        "relationship-mapping":
          "| Stakeholder | Role | Stance | Relationship |\n|---|---|---|---|\n| U.S. Commercial President (sponsor) | Economic buyer | Urgent | Medium |\n| Interim CFO office | Gatekeeper | SI&A-focused | Weak |\n| Oncology BU head | Influencer | Protective of field | Medium |\n| Chief Digital & Technology | Platform owner | Supportive of AI | Medium |\n| Medical Affairs | Compliance voice | Cautious | Weak |",
        "engagement-pairings":
          "- **Joe Smith ↔ U.S. Commercial President**: launch and resourcing story.\n- **Hannah Kim ↔ Commercial Analytics lead**: benchmark sharing.\n- **David Okafor ↔ Oncology BU operations**: field deployment data.\n- **Amara Nwosu ↔ Digital/omnichannel team**: AI engagement pilots.\n- Add a **Partner** to pair with the Interim CFO office.",
        "prior-engagements":
          "- Assume prior BCG work on cost realignment or R&D (validate).\n- Pfizer's teams have deep analytics vendors (IQVIA, ZS); we must bring **strategy and redesign**, not just data.\n- Medical and compliance review will be required for any HCP-facing AI.",
        "industry-trends":
          "- **Launch excellence** separates winners: the first six months predict the peak share.\n- **Dynamic resourcing**: moving reps and MSLs as brands mature.\n- **AI next-best-action** for HCP engagement across channels.\n- **Obesity market** access and supply constraints shape launch plans.",
        "engagement-cadence":
          "| Week | Touchpoint | Owner |\n|---|---|---|\n| W1 | Sponsor scoping | Joe Smith |\n| W2 | Launch benchmarks readout | Hannah Kim |\n| W3 | Oncology BU working session | David Okafor |\n| W4 | Finance: SI&A-neutral framing | Partner (TBD) |\n| W5 | Medical/compliance guardrails for AI | Amara Nwosu |\n| W7 | Orals rehearsal | Team |\n| W8 | Orals | Joe Smith |",
      },
    },
    "team-formation": {
      team: {
        summary:
          "A **biopharma commercial** team with launch, resourcing and AI engagement skills. It needs a senior Partner for the CFO relationship.",
        teamMembers: [
          member("Joe Smith", "New York", 92, ["Biopharma", "Oncology"], ["Launch strategy", "Commercial model design"], ["Oncology launch playbook for a top-10 pharma", "Field force resizing after LOE"]),
          member("Hannah Kim", "Boston", 85, ["Health care"], ["Benchmarks", "Knowledge management"], ["Launch performance benchmark database"]),
          member("Amara Nwosu", "New York", 80, ["Health care", "Technology"], ["Omnichannel analytics", "Next-best-action"], ["AI HCP engagement pilot"]),
          member("David Okafor", "Philadelphia", 72, ["Biopharma"], ["Resource allocation modeling"], ["Brand investment prioritization"]),
          member("Elena Rossi", "New York", 66, ["Cross-industry"], ["C-suite advisory", "Cost transformation"], ["SG&A redesign at a global company"]),
        ],
        suggestedRoles: [
          "Health care Partner to lead the CFO and CEO relationship",
          "Medical/regulatory expert on AI use with HCPs",
          "Obesity market expert (access, supply, patient journey)",
        ],
        potentialGaps: [
          "No health care Partner is named yet; this is critical for orals",
          "Obesity-specific market access depth",
        ],
        capabilityInsights:
          "Commercial design is strong; the proposal will be judged on **SI&A neutrality** and **compliant AI**. Bring proof of both.",
      },
    },
    "topic-research": {
      sections: {
        "methods-tools":
          "- **Launch excellence diagnostic**: benchmark early uptake against analog launches.\n- **Portfolio resource allocation**: shift spend by lifecycle stage.\n- **Field and medical sizing**: dynamic deployment models.\n- **Omnichannel next-best-action** (BCG X), with medical/legal review.\n- **SI&A-neutral business case**: savings from LOE brands fund launches.",
        "industry-primer":
          "Pharma commercial models were built for blockbusters sold through large field forces. LOEs, specialty launches and digital engagement are pushing models toward **smaller, more targeted teams**, **key account management**, and **AI-guided omnichannel** outreach. **Launch trajectory is set early**: analog studies show uptake in the first 6–12 months strongly predicts the peak.",
        "past-proposal":
          "Reuse from **Oncology_Commercial_Model_Proposal_2025**: the launch analog exhibit, the resource shift waterfall and the omnichannel pilot design. Add obesity and LOE-specific content.",
        credentials:
          "- Launch excellence programs for oncology and specialty brands (anonymized)\n- Commercial model redesign after LOE\n- AI omnichannel engagement pilots\n- SG&A transformation programs",
        vignettes:
          "**Illustrative – Resource shift:** a pharma company moved field capacity from two mature brands to a launch, holding total SI&A flat while accelerating launch share.\n\n**Illustrative – Omnichannel AI:** next-best-action recommendations raised HCP engagement quality in a pilot territory.\n\n_Illustrative only._",
        experts:
          "- **Joe Smith**: commercial excellence (topic expert)\n- **BCG X** omnichannel AI lead\n- **Health care Partner** (to be named)\n- **Market access** expert for obesity",
        benchmarks:
          "- Share of peak sales reached in the first 12 months (by therapy area)\n- Field force cost as % of brand revenue by lifecycle stage\n- Omnichannel engagement rates, digital vs. in-person\n- Pfizer 2026 SI&A guidance: $12.5–13.5B\n\n_Validate benchmarks before use._",
        "client-references":
          "Most persuasive: **top-20 pharma** companies that navigated an LOE while launching, ideally oncology or cardiometabolic. Emphasize held-flat SI&A and launch outcomes.",
      },
    },
    storyline: {
      storyline: [
        {
          name: "Hypothesis & Perspective",
          slides: [
            { title: "Pfizer's growth depends on redeploying commercial capacity faster than exclusivity is lost", bullets: ["~$17–18B of annual revenue at risk by 2028", "Launches and obesity must fill the gap", "SI&A is capped at $12.5–13.5B in 2026"] },
            { title: "A lifecycle-based commercial model can fund launches from mature brands", bullets: ["Resources move with the portfolio", "Launch excellence sets the peak share", "AI makes smaller teams more effective"] },
          ],
        },
        {
          name: "Why BCG & Value",
          slides: [
            { title: "BCG links launch excellence, resourcing and SI&A in one plan", bullets: ["Launch analog database", "SI&A-neutral business case", "BCG X builds compliant omnichannel AI"] },
            { title: "Illustrative value: faster launch uptake with total SI&A held flat", bullets: ["Sized by brand in the diagnostic", "Tracked in the brand P&L", "Pilots on two launch brands"] },
          ],
        },
        {
          name: "Approach & Methodology",
          slides: [
            { title: "Diagnose, design and pilot in 16 weeks, then scale by wave", bullets: ["Weeks 1–5: launch and resourcing diagnostic", "Weeks 6–11: target model and SI&A case", "Weeks 12–16: two-brand pilot, including AI engagement"] },
          ],
        },
        {
          name: "Team & Experience",
          slides: [
            { title: "Biopharma commercial specialists with launch and AI experience", bullets: ["Health care Partner (TBD) leads", "Joe Smith: commercial excellence", "BCG X omnichannel lead"] },
          ],
        },
        {
          name: "Executive Summary",
          slides: [
            { title: "BCG will help Pfizer fund its next growth wave from within, redeploying commercial capacity to launches without growing SI&A", bullets: ["Situation: a large LOE wave and a strong pipeline", "Complication: fixed SI&A and a critical launch window", "Answer: lifecycle-based model, launch playbook and AI engagement", "Outcome: faster launches, flat SI&A"] },
          ],
        },
      ],
    },
    commercial: {
      sections: {
        "pricing-strategy":
          "**Fixed-fee phases with a pilot success component**: a fixed fee for diagnosis and design; a fixed fee for pilots plus a modest success fee tied to launch KPIs agreed with the brand teams (e.g., new-to-brand prescriptions versus the analog).",
        "investment-framing":
          "Frame against **revenue at risk (~$17–18B)** and the value of launch share: a few points of peak share on a major launch are worth far more than the fee. Emphasize the design is **SI&A-neutral**.",
        "delivery-model":
          "- Core team in New York with the U.S. Commercial organization.\n- BCG X squad for omnichannel AI.\n- Medical, legal and regulatory review embedded for HCP-facing tools.\n- Biweekly steering with the Commercial President.",
        "competitive-edge":
          "Against IQVIA and ZS: we design the model and business case, not just the analytics. Against McKinsey and Bain: SI&A integration and a BCG X build. Against Accenture: outcome ownership, not platform licenses.",
        "risks-watchouts":
          "- **Compliance** for AI in HCP engagement.\n- **Field morale** during redeployment.\n- **CFO transition**: re-validate the finance sponsor.\n- **Obesity supply and access** uncertainty affecting launch timing.",
        "expert-contacts":
          "- Health care practice pricing lead\n- BCG X health care lead\n- Legal: pharma compliance\n- Hannah Kim: launch benchmarks",
      },
    },
    "polish-proposal": {
      polish: {
        overallAssessment:
          "The draft has the right scope but **no insight and no numbers**. It lists activities instead of outcomes and never mentions the SI&A constraint, which is the CFO's first question. Lead with the LOE math and the SI&A-neutral answer.",
        score: 55,
        sections: [
          {
            name: "Executive Summary",
            strengths: ["Correct framing: patent cliff and launches"],
            gaps: ["No quantification", "No SI&A angle", "No point of view"],
            rewrites: [
              {
                before: "We propose to help Pfizer improve its commercial model so that new launches can replace lost revenue.",
                after: "With ~$17–18B of annual revenue at risk by 2028 and SI&A capped at $12.5–13.5B, Pfizer must fund launches by redeploying capacity from maturing brands. We will design that lifecycle-based model and prove it on two launch brands in 16 weeks.",
              },
            ],
          },
          {
            name: "Scope",
            strengths: ["Covers the main elements"],
            gaps: ["Activities, not deliverables", "Obesity readiness missing"],
            rewrites: [
              {
                before: "- Review current commercial model\n- Benchmark against peers",
                after: "- Launch diagnostic against analogs for the top upcoming launches\n- Resource shift plan by brand lifecycle, SI&A-neutral\n- Obesity launch readiness assessment (Metsera portfolio)",
              },
            ],
          },
          {
            name: "Approach",
            strengths: [],
            gaps: ["'AI will be used where helpful' is vague and raises compliance concerns"],
            rewrites: [
              {
                before: "AI will be used where helpful.",
                after: "We will pilot AI next-best-action for HCP engagement in two territories, with medical, legal and regulatory review built in from design.",
              },
            ],
          },
        ],
      },
    },
    "practice-pitch": {
      sections: {
        "top-questions":
          "1. **\"How is this SI&A-neutral?\"**: savings from mature brands fund launch capacity; we show the bridge.\n2. **\"What's different from our analytics vendors?\"**: they measure; we redesign the model and own the business case.\n3. **\"How do you handle compliance for AI?\"**: medical, legal and regulatory review is embedded; pilots are reviewed before launch.\n4. **\"What about obesity?\"**: a dedicated readiness track.\n5. **\"How fast will we see results?\"**: pilot KPIs within one quarter of the pilot start.",
        "persona-questions":
          "**Interim CFO:** \"Show me SI&A by quarter.\"\n**Oncology BU head:** \"Will you cut my field force?\" Answer: capacity moves to launches based on data, with BU input.\n**Chief Digital:** \"Will this sit on our platforms?\" Yes.\n**Medical Affairs:** \"Who approves AI-generated content?\" Existing medical/legal review.",
        "roleplay-questions":
          "**Role-play (Commercial President):** \"We've done field resizing before and it hurt morale. Why is this different?\"\n- Answer: \"This time it's a redeployment toward launches, not a cut, and field leaders co-design it.\"\n\n**Slide challenge – Value:** \"Illustrative value isn't a number.\" Answer: sized by brand in weeks 1–5.",
      },
    },
  },
};
