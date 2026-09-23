import type { DemoProposal } from "../types";
import { date, ILLUSTRATIVE, member, sourcesSection, team } from "./helpers";

const DRAFT = `Executive Summary
Ford has had quality challenges in recent years, including a high number of recalls. BCG proposes a quality transformation program to reduce warranty costs.

Situation
Warranty costs are high. Recalls reached record levels in 2025.

Our Approach
We will use our proven quality methodology. We will look at engineering, manufacturing and suppliers. We will use AI and analytics to find root causes.

Value
We estimate significant savings.

Why BCG
BCG has worked with many automotive companies around the world.`;

export const FORD: DemoProposal = {
  proposal: {
    id: "demo-ford",
    opportunityId: "498213-05",
    clientName: "Ford Motor Company",
    proposalName: "Quality & Warranty Cost Transformation – Ford Blue and Ford Pro",
    proposalContext:
      "Ford's quality organization, reporting to the CFO and COO, has asked for proposals to cut warranty and recall cost structurally after a record ~152 recalls in 2025 and warranty costs above $4B a year. Ford reduced warranty and material cost by about $1.5B in 2025 and targets more in 2026, supporting 2026 adjusted EBIT guidance of $8–10B. Scope: (1) an early-warning analytics platform using field, dealer and connected-vehicle data, (2) a design and supplier quality program for the next launches, including the 2027 Universal EV Platform pickup, and (3) a governance model linking quality to EBIT. Decision expected by January 2027.\n\n" +
      ILLUSTRATIVE,
    industryPracticeAreas: ["IG"],
    functionalPracticeAreas: ["OPS", "CFS"],
    proposalDate: "2026-12-04",
    proposalDescription:
      "BCG will help Ford take a further step down in warranty and recall cost by detecting issues earlier, preventing them in design and at suppliers, and managing quality as an EBIT lever. The program combines connected-vehicle analytics (BCG X), supplier quality and launch readiness, and a quality value office reporting to the CFO.",
    competitiveLandscape:
      "McKinsey and Roland Berger have deep automotive quality and operations benches; Accenture and Deloitte will pitch the analytics platform. The incumbent quality consultants may already be embedded. BCG differentiates with an integrated EBIT view (quality as a P&L lever, not a compliance function) plus BCG X's connected-vehicle analytics build.",
    topicExpert:
      "Elena Rossi, Managing Director & Partner – automotive operations and quality, led warranty reduction programs at global OEMs",
    uploadedFiles: [
      { name: "Ford_2025_10-K_Risk_Factors.pdf", type: "Client Context" },
      { name: "OEM_Warranty_Benchmarks_2026.xlsx", type: "BCG IP" },
      { name: "Auto_Quality_Program_Proposal_2024.pptx", type: "Past Proposal" },
    ],
    draftProposal: { name: "Ford_Quality_Draft_v0.2.docx", type: "Past Proposal", text: DRAFT },
    teamMembers: team(["Elena Rossi", "Luis Ortega", "Priya Raman", "Amara Nwosu", "Tom Becker"]),
    createdAt: date("2026-09-05"),
    updatedAt: date("2026-09-19"),
  },
  content: {
    "client-research": {
      sections: {
        "contextual-overview":
          "**Ford is at an inflection point.** Revenue hit a record **$187.3B** in 2025, but a **$19.5B EV reset** drove an ~$8.2B net loss. The core businesses (**Ford Pro** and **Ford Blue**) fund the company, and **quality is the biggest controllable drag**: a record ~152 recalls in 2025 and warranty costs above $4B a year.\n\n**Why now:** 2026 guidance (adjusted EBIT $8–10B) depends on continued cost progress, and the 2027 launch of the ~$30K Universal EV Platform pickup must launch cleanly to restore EV credibility.",
        "industry-competitors":
          "**Industry dynamics:** tariffs and supply-chain shocks, EV demand below earlier forecasts, software-defined vehicles, and rising recall scrutiny.\n\n| Competitor | Relevant angle |\n|---|---|\n| General Motors | Strong trucks/SUVs; own EV reset |\n| Toyota | Quality and cost benchmark; hybrids |\n| Stellantis | Similar U.S. truck exposure |\n| Tesla / BYD | EV cost benchmarks Ford's UEV platform targets |\n| Hyundai-Kia | Value and warranty-led positioning |",
        "financial-information":
          "**2025**\n- Revenue **$187.3B** (+1%)\n- Net loss **~$8.2B** (after ~$19.5B special charges)\n- Adjusted EBIT **~$6.8B**; adjusted FCF ~$3.5B\n- Ford Pro EBIT ~$6.8B; Model e EBIT loss ~$4.8B\n\n**2026 guidance:** adjusted EBIT $8–10B, adjusted FCF $5–6B, capex $9.5–10.5B.\n\n**Quality lens:** warranty has run above **$4B a year**, the same order of magnitude as Model e's loss. Every $100M of warranty avoided goes straight to EBIT.\n\n_Verify figures against the 10-K._",
        "portfolio-offerings":
          "- **Ford Blue**: F-Series, Bronco, Explorer, Mustang, hybrids.\n- **Ford Pro**: Super Duty, Transit, E-Transit, telematics and software subscriptions, service.\n- **Ford Model e**: Mustang Mach-E, F-150 Lightning, European EVs; the Universal EV Platform from 2027.\n- **Ford Credit**: captive finance.",
        "news-publications":
          "- **Dec 2025:** EV strategy reset with $19.5B of charges; focus on affordable EVs.\n- **Feb 2026:** Q4 miss but better-than-expected 2026 guidance.\n- **2025:** record recalls (~152); the fuel injector recall alone was estimated at ~$570M.\n- **Jul 2026:** details of the ~$30K midsize electric pickup (2027) and UEV Platform: 20% fewer parts, 40% fewer workstations.\n- **2026:** CFO Sherry House highlights paid software subscription growth.",
        "executive-profiles":
          "**Jim Farley – President & CEO**: has made quality a public priority and speaks candidly about cost gaps versus competitors.\n\n**Sherry House – CFO**: joined in 2025 from Lucid; EV and cost-discipline background. Will want quality savings to show up in EBIT, not just KPIs.\n\n**Quality & Operations leadership (sponsor)**: accountable for recall and warranty trends; needs early wins and credible root-cause capability.\n\n_Views are hypotheses to validate._",
        "company-priorities":
          "1. **Hit 2026 EBIT guidance** through cost, warranty and material savings.\n2. **Fix quality** and reduce recall volume and severity.\n3. **Make EVs profitable** with the UEV Platform launch in 2027.\n4. **Grow Ford Pro software and services.**\n5. **Manage tariffs** and supply disruptions.",
        sources: sourcesSection("ford"),
      },
    },
    "client-engagement": {
      sections: {
        "relationship-mapping":
          "| Stakeholder | Role | Stance | Relationship |\n|---|---|---|---|\n| Sherry House, CFO | Economic buyer | Supportive if EBIT-linked | Medium |\n| Chief Quality Officer (sponsor) | Champion | Urgent need | Strong |\n| Head of Manufacturing | Influencer | Protective of plants | Weak |\n| Purchasing / Supplier Quality | Influencer | Neutral | Medium |\n| Chief Digital / Connected Vehicle | Data owner | Interested in analytics | Weak |",
        "engagement-pairings":
          "- **Elena Rossi ↔ Sherry House (CFO)**: the quality-to-EBIT value case.\n- **Luis Ortega ↔ Chief Quality Officer**: day-to-day sponsor.\n- **Priya Raman ↔ Supplier Quality lead**: supplier program design.\n- **Amara Nwosu ↔ Connected Vehicle data lead**: data access for early warning.",
        "prior-engagements":
          "- Assume past BCG work in Ford purchasing or product cost (validate).\n- The quality organization may have **incumbent advisors**; position as complementary with an EBIT focus.\n- Ford values **plant-floor credibility**: bring people who have run launches.",
        "industry-trends":
          "- **Connected-vehicle data** enables early warning weeks before claims arrive.\n- **Software quality** is a growing recall driver; over-the-air fixes change the cost equation.\n- **Design for quality at launch**: fewer parts (as in UEV) means fewer failure points.\n- **Supplier quality co-investment** as tariffs reshape the supply base.",
        "engagement-cadence":
          "| Week | Touchpoint | Owner |\n|---|---|---|\n| W1 | Sponsor scoping | Luis Ortega |\n| W2 | Warranty data deep-dive | Amara Nwosu |\n| W3 | Plant visit (truck plant) | Priya Raman |\n| W4 | CFO value case preview | Elena Rossi |\n| W6 | Supplier quality workshop | Priya Raman |\n| W7 | Orals rehearsal | Team |\n| W8 | Orals | Elena Rossi |",
      },
    },
    "team-formation": {
      team: {
        summary:
          "A team combining **automotive operations leadership, connected-vehicle analytics and supplier quality**, led by a Managing Director with OEM warranty reduction experience.",
        teamMembers: [
          member("Elena Rossi", "Detroit", 96, ["Automotive", "Industrial goods"], ["Quality transformation", "C-suite advisory"], ["Warranty reduction program at a global OEM", "Launch readiness for a new vehicle platform"]),
          member("Luis Ortega", "Chicago", 88, ["Automotive", "Technology"], ["Connected-vehicle analytics", "AI early warning"], ["Field-failure prediction model with BCG X"]),
          member("Priya Raman", "Detroit", 84, ["Industrial", "Operations"], ["Supplier quality", "Lean manufacturing"], ["Supplier development program for a tier-1 supplier"]),
          member("Amara Nwosu", "Boston", 76, ["Automotive"], ["Data analysis", "Root-cause analytics"], ["Warranty claims analytics for an equipment maker"]),
          member("Tom Becker", "Munich", 70, ["Automotive"], ["Benchmarking", "Research"], ["OEM quality benchmark study"]),
        ],
        suggestedRoles: [
          "Engagement MDP owning the CFO relationship (Elena Rossi)",
          "Connected-vehicle analytics lead (Luis Ortega)",
          "Launch quality expert with plant experience",
          "Software quality / OTA expert",
        ],
        potentialGaps: [
          "Vehicle software quality: add a software-defined vehicle expert",
          "UAW and labor relations sensitivity for plant changes: add an operations expert with union experience",
        ],
        capabilityInsights:
          "The team is strong on analytics and supplier quality. **Launch quality for the 2027 UEV pickup** is where Ford will test depth; bring a named expert who has run a platform launch.",
      },
    },
    "topic-research": {
      sections: {
        "methods-tools":
          "- **Warranty cost waterfall**: cost by system, supplier, plant and model year.\n- **Early-warning analytics**: connected-vehicle signals and dealer repair orders, run through anomaly detection.\n- **8D / root-cause acceleration** with cross-functional squads.\n- **Design FMEA refresh** for new platforms.\n- **Supplier quality tiering** and joint improvement plans.\n- **Quality value office**: EBIT-linked tracking.",
        "industry-primer":
          "OEM warranty cost typically runs at a low single-digit percentage of revenue and is driven by **a small number of systems** (powertrain, electrical, software). Recalls are lumpy and expensive; detecting an issue **weeks earlier** can cut the affected population sharply. EVs shift the failure mix toward **batteries, electronics and software**, where over-the-air updates can fix issues cheaply.",
        "past-proposal":
          "Reuse from **Auto_Quality_Program_Proposal_2024**: the warranty waterfall exhibit, the early-warning architecture diagram and the value office governance. Update for Ford's scale, recall profile and the UEV launch.",
        credentials:
          "- Warranty reduction programs at global OEMs (anonymized)\n- Connected-vehicle analytics builds (BCG X)\n- Supplier development and quality programs\n- Launch readiness for new platforms",
        vignettes:
          "**Illustrative vignette – Early warning:** an OEM combined telematics and repair-order text analytics to spot a failure trend ~6 weeks earlier, shrinking the recall population.\n\n**Illustrative vignette – Supplier quality:** a joint program with the ten highest-cost suppliers cut defect escapes and recovered part of the warranty cost through contract terms.\n\n_Illustrative only._",
        experts:
          "- **Elena Rossi** (topic expert): OEM quality and operations\n- **BCG X** connected-vehicle and AI lead\n- **Purchasing practice**: supplier recovery and contracts\n- **Software-defined vehicle** expert",
        benchmarks:
          "- Ford warranty: above $4B a year; 2025 warranty and material cost reduction ~$1.5B\n- Recall count: ~152 in 2025 (industry high)\n- Peer warranty as % of revenue (validate by OEM)\n- Detection-to-containment lead time (days)\n\n_Validate peer benchmarks before use._",
        "client-references":
          "The most persuasive references are **OEMs or large tier-1 suppliers** that achieved sustained warranty reductions **and** a clean platform launch. Position around EBIT impact and speed.",
      },
    },
    storyline: {
      storyline: [
        {
          name: "Hypothesis & Perspective",
          slides: [
            { title: "Quality is Ford's largest controllable EBIT lever in 2026–27", bullets: ["Warranty has run above $4B a year", "Record ~152 recalls in 2025", "2026 guidance relies on continued warranty and material savings"] },
            { title: "The next step-down comes from detecting earlier and preventing upstream, not from more containment", bullets: ["Connected-vehicle data enables early warning", "Design and supplier quality prevent repeat issues", "The UEV launch is the moment to lock in quality by design"] },
          ],
        },
        {
          name: "Why BCG & Value",
          slides: [
            { title: "BCG treats quality as a P&L program, reporting to the CFO", bullets: ["Quality value office with an EBIT-linked ledger", "BCG X builds the early-warning analytics", "OEM operations leaders who have run launches"] },
            { title: "Illustrative value: a meaningful reduction in annual warranty run-rate within two years", bullets: ["Sized by system and supplier in the diagnostic", "Plus avoided recall exposure on new launches", "Part of the fee linked to verified savings"] },
          ],
        },
        {
          name: "Approach & Methodology",
          slides: [
            { title: "Three workstreams deliver quick wins in 12 weeks and structural change over 18 months", bullets: ["Detect: early-warning analytics MVP", "Prevent: design and supplier quality program", "Govern: quality value office"] },
            { title: "The 2027 UEV pickup launch gets a dedicated quality-by-design track", bullets: ["DFMEA refresh", "Supplier readiness gates", "Software quality and OTA plan"] },
          ],
        },
        {
          name: "Team & Experience",
          slides: [
            { title: "Led by an MDP who has cut warranty at global OEMs, with BCG X analytics built in", bullets: ["Elena Rossi (MDP) leads", "Luis Ortega: analytics lead", "Plant-experienced supplier quality experts"] },
          ],
        },
        {
          name: "Executive Summary",
          slides: [
            { title: "BCG will help Ford turn quality into a lasting EBIT advantage, starting with quick wins in 12 weeks", bullets: ["Situation: record recalls and warranty above $4B a year", "Complication: 2026 EBIT and the 2027 EV launch depend on quality", "Answer: detect earlier, prevent upstream, govern to EBIT", "Outcome: lower warranty run-rate and a clean UEV launch"] },
          ],
        },
      ],
    },
    commercial: {
      sections: {
        "pricing-strategy":
          "**Recommended: fixed fee plus a success fee.**\n- 12-week diagnostic and quick wins: fixed fee.\n- Scale-up phase: reduced fixed fee plus a **success fee on verified warranty run-rate reduction**, measured by the quality value office with Ford Finance.\n\n_Indicative levels set with the pricing desk._",
        "investment-framing":
          "Warranty above $4B a year means a single-digit percentage reduction is worth hundreds of millions. Position the fee as **a small fraction of first-year savings**, with a success component that aligns BCG with Ford's EBIT.",
        "delivery-model":
          "- A Dearborn-based core team plus plant rotations.\n- BCG X squad for the early-warning MVP (on Ford's cloud).\n- Joint teams with Quality, Purchasing and Engineering.\n- Monthly CFO review of the value ledger.",
        "competitive-edge":
          "- Against McKinsey and Roland Berger: an EBIT-linked success fee and a built analytics platform, not just a methodology.\n- Against Accenture and Deloitte: we own the business outcome, not just the platform build.",
        "risks-watchouts":
          "- **Attribution** of warranty savings (mix, volume, pricing): agree the method with Finance.\n- **Data access** to connected-vehicle data: privacy and legal review.\n- **Plant and union sensitivities** around process changes.\n- **Lag**: warranty savings appear with a delay; use leading indicators.",
        "expert-contacts":
          "- Automotive practice pricing lead\n- BCG X delivery lead\n- Legal: success fee terms and data privacy\n- Tom Becker: OEM benchmarks",
      },
    },
    "polish-proposal": {
      polish: {
        overallAssessment:
          "The draft identifies the right problem but **reads like a capability brochure**. It lacks Ford-specific facts, a quantified value case and a point of view on *how* the next step-down happens. Anchor it on 2026 EBIT guidance, the UEV launch and early warning, and replace 'significant savings' with a sized range.",
        score: 52,
        sections: [
          {
            name: "Executive Summary",
            strengths: ["Names warranty cost as the target"],
            gaps: ["No answer-first recommendation", "No link to EBIT or 2026 guidance"],
            rewrites: [
              {
                before: "BCG proposes a quality transformation program to reduce warranty costs.",
                after: "Quality is Ford's largest controllable EBIT lever: warranty has run above $4B a year. We will lower that run-rate by detecting issues earlier with connected-vehicle data, preventing them in design and at suppliers, and tracking every dollar to EBIT.",
              },
            ],
          },
          {
            name: "Value",
            strengths: [],
            gaps: ["'Significant savings' is not credible to a CFO"],
            rewrites: [
              {
                before: "We estimate significant savings.",
                after: "Each 1% reduction in warranty run-rate is worth roughly $40M+ a year. The diagnostic will size the reduction by system and supplier within 12 weeks, and we will link part of our fee to verified savings.",
              },
            ],
          },
          {
            name: "Why BCG",
            strengths: ["Mentions automotive experience"],
            gaps: ["Generic; no named experts or differentiators"],
            rewrites: [
              {
                before: "BCG has worked with many automotive companies around the world.",
                after: "Our team is led by Elena Rossi, who has run warranty reduction programs at global OEMs, and includes BCG X engineers who will build Ford's early-warning analytics on Ford's own data platform.",
              },
            ],
          },
        ],
      },
    },
    "practice-pitch": {
      sections: {
        "top-questions":
          "1. **\"We've already cut $1.5B. Why pay you for the rest?\"**: The next tranche needs early warning and upstream prevention, which is a different capability from containment.\n2. **\"How will you attribute savings?\"**: A method agreed with Finance up front, including volume and mix adjustments.\n3. **\"Can you work with our connected-vehicle data?\"**: Yes, on Ford's platform, with privacy review in week 1.\n4. **\"What about the UEV launch?\"**: A dedicated quality-by-design track.\n5. **\"Will this disrupt the plants?\"**: Changes are piloted on one line with plant leadership.",
        "persona-questions":
          "**CFO:** \"Show me the math on the success fee.\" Walk through the baseline, measurement and cap.\n\n**Chief Quality Officer:** \"What do we get in the first 90 days?\" An early-warning MVP on the top three failure systems and supplier actions on the top ten.\n\n**Manufacturing head:** \"Who on your team has run a plant?\" Name the operations experts.",
        "roleplay-questions":
          "**Role-play (CEO):** \"Everyone tells me they'll fix quality. Why should I believe you?\"\n- Answer: \"Because we'll be measured on it. Part of our fee depends on warranty run-rate reduction verified by your Finance team.\"\n\n**Slide challenge – Value:** \"Where does the 1% = $40M come from?\" Answer: ~$4B+ annual warranty run-rate × 1%, to be refined with Ford data.",
      },
    },
  },
};
