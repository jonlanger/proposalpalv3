import type { DemoProposal } from "../types";
import { date, ILLUSTRATIVE, member, sourcesSection, team } from "./helpers";

const DRAFT = `Executive Summary
Walmart has invested heavily in automation. We will help Walmart get more value from these investments by looking at the network and finding opportunities. Our team has deep experience and we are confident we can deliver results.

Our Understanding
Walmart's eCommerce business is growing quickly and the supply chain needs to keep up. There are many initiatives underway including Symbotic and drone delivery. It is important that these are coordinated.

Approach
Phase 1: Diagnostic (8 weeks). We will interview stakeholders and collect data.
Phase 2: Design (10 weeks). We will design the future network.
Phase 3: Implementation support (ongoing).

Team
Our team combines retail and operations experts.

Fees
Our fees will be based on time and materials.`;

export const WALMART: DemoProposal = {
  proposal: {
    id: "demo-walmart",
    opportunityId: "512840-12",
    clientName: "Walmart Inc.",
    proposalName: "Automated Fulfillment Network – Value Capture & AI Operating Model",
    proposalContext:
      "Walmart's U.S. supply chain leadership has asked for a proposal to maximize returns from its automation program: automated regional DCs (serving about 65% of stores by the end of FY26), about 400 Symbotic accelerated pickup-and-delivery centers (APDs), and expanding drone delivery with Wing. The ask: (1) a network-level view of where automation, store fulfillment and last-mile modes should split volume, (2) an AI-driven planning and labor model that lowers cost to serve as eCommerce passes $150B, and (3) a workforce transition plan for associates. The decision is expected in Q1 FY27, with the sponsor reporting to Walmart U.S. CEO David Guggina.\n\n" +
      ILLUSTRATIVE,
    industryPracticeAreas: ["CP"],
    functionalPracticeAreas: ["OPS", "TDA"],
    proposalDate: "2026-11-20",
    proposalDescription:
      "BCG will help Walmart turn its automation investments into a single, AI-orchestrated fulfillment network. In 16 weeks we will set the target volume split across automated DCs, APDs, stores and last-mile modes; stand up AI planning for inventory placement and labor; and design the associate transition. Our goal is a structurally lower cost per eCommerce order while keeping speed promises.",
    competitiveLandscape:
      "Expect McKinsey (strong operations and supply chain credentials), Accenture (systems integration and AI build) and possibly boutique supply-chain firms. Symbotic and Wing are partners, not competitors, but they shape the solution. BCG's edge: end-to-end retail supply chain transformation experience, BCG X build capability, and a vendor-neutral view of the network.",
    topicExpert:
      "Sarah Chen, Partner – supply chain and retail operations, leads network design and automation value-capture work",
    uploadedFiles: [
      { name: "Walmart_FY26_10-K_excerpts.pdf", type: "Client Context" },
      { name: "Retail_Automation_Benchmarks_2026.xlsx", type: "BCG IP" },
      { name: "Grocer_Network_Redesign_Proposal_2025.pptx", type: "Past Proposal" },
    ],
    draftProposal: { name: "Walmart_Automation_Draft_v0.3.docx", type: "Past Proposal", text: DRAFT },
    teamMembers: team(["Sarah Chen", "Joe Smith", "Priya Raman", "Marcus Webb", "Hannah Kim"]),
    createdAt: date("2026-09-10"),
    updatedAt: date("2026-09-18"),
  },
  content: {
    "client-research": {
      sections: {
        "contextual-overview":
          "**Walmart is the world's largest retailer (~$713B FY26 revenue)** and is now also a fast-growing digital platform. The strategy is omnichannel: 4,600+ U.S. stores act as fulfillment nodes for eCommerce, which grew about **24% to roughly $150B** in FY26 and is now about 23% of sales.\n\n**Why this matters now**\n- Automation is moving from pilots to network scale: about 65% of stores are served by automated DCs, and a $520M program with Symbotic will add about 400 APDs.\n- New CEO **John Furner** (from Feb 2026) ran Walmart U.S. and knows the network well. Expect a focus on execution and returns.\n- Operating margin is thin (~4.2%), so every cent of cost per order counts.",
        "industry-competitors":
          "**U.S. mass retail is a scale-and-speed game.** Key trends:\n- **Delivery speed as the battleground**: same-day and under-3-hour delivery are becoming standard in metros.\n- **Retail media and membership** fund price investment.\n- **Automation and robotics** in DCs and micro-fulfillment.\n\n| Competitor | Where it competes | Implication for Walmart |\n|---|---|---|\n| Amazon | eCommerce, speed, logistics | The benchmark for delivery cost and speed |\n| Costco | Membership, value | Pressure on Sam's Club |\n| Target | Stores-as-hubs, discretionary | Similar store-fulfillment model |\n| Kroger / Aldi | Grocery price | Grocery is Walmart's traffic driver |",
        "financial-information":
          "**FY26 (ended Jan 31, 2026)**\n- Revenue: **~$713B**, +4.7% (+5.1% constant currency)\n- Operating income: **~$29.8B** (~4.2% of net sales, down ~13 bps)\n- Global eCommerce: **~$150B**, +24%; Walmart U.S. eCommerce ~$100B\n- Q4: advertising +37%, membership fees +15%\n- Operating cash flow ~$41.6B; free cash flow ~$14.9B\n\n**Read-across for the proposal:** heavy capex on automation is compressing free cash flow relative to operating cash flow. The CFO will want a clear payback on each automation wave.\n\n_Source: FY26 10-K and Q4 FY26 release. Verify before use._",
        "portfolio-offerings":
          "- **Walmart U.S.**: supercenters, Neighborhood Markets, pickup and delivery, Walmart+.\n- **Walmart International**: Walmex, Flipkart/PhonePe, Massmart and others; eCommerce +17% in Q4.\n- **Sam's Club U.S.**: membership warehouse; record membership.\n- **Platform businesses**: Walmart Connect (retail media), marketplace and Walmart Fulfillment Services, VIZIO, data insights.\n- **Last mile**: Spark driver network, drone delivery with Wing, InHome delivery.",
        "news-publications":
          "- **Feb 2026:** John Furner becomes CEO; David Guggina becomes CEO of Walmart U.S.\n- **2025–26:** Symbotic acquires Walmart's robotics business and signs a ~$520M APD development program.\n- **Jan 2026:** drone delivery expansion to about 150 more stores; **1M drone deliveries** reached in May 2026; 270+ locations planned for 2027.\n- **Apr 2026:** FY26 annual report highlights eCommerce profitability, store investments and AI.",
        "executive-profiles":
          "**John Furner – President & CEO**\nA 25+ year Walmart veteran who ran Walmart U.S. from 2019 and oversaw its store-fulfillment model. He is likely to value operational pragmatism and associate impact.\n\n**David Guggina – CEO, Walmart U.S.**\nPreviously led U.S. eCommerce and supply chain. He is the most likely sponsor for network decisions and will be fluent in the details.\n\n**Supply chain leadership (sponsor)**\nWill care about throughput, cost per case and per order, and a smooth ramp-up of automated sites.\n\n_Stakeholder views are hypotheses to validate._",
        "company-priorities":
          "1. **Profitable eCommerce growth**: lower last-mile and fulfillment cost per order.\n2. **Automation at scale**: finish the DC program and ramp the APDs without service disruption.\n3. **Higher-margin businesses**: advertising and membership funding price.\n4. **AI everywhere**: planning, merchandising, associate tools, shopping agents.\n5. **People**: re-skill associates into higher-value roles as automation grows.\n\n**Our proposal hits priorities 1, 2, 4 and 5 directly.**",
        sources: sourcesSection("walmart", [
          { title: "Wing: Walmart drone delivery expansion", url: "https://wing.com/news/wing-walmart-expand-drone-delivery-coast-to-coast", why: "Last-mile mode volumes and footprint" },
        ]),
      },
    },
    "client-engagement": {
      sections: {
        "relationship-mapping":
          "| Stakeholder | Role in decision | Likely stance | BCG relationship |\n|---|---|---|---|\n| David Guggina, CEO Walmart U.S. | Economic buyer | Supportive if ROI is clear | Medium |\n| SVP Supply Chain (sponsor) | Champion | Strongly supportive | Strong |\n| CFO office | Gatekeeper on capex payback | Skeptical | Weak |\n| CTO / Global Tech | Owns planning systems | Neutral, worried about build vs. buy | Medium |\n| People / Associate experience | Workforce transition | Cautious | Weak |\n\n**Gaps:** the CFO office and People are weak relationships and must be built before orals.",
        "engagement-pairings":
          "- **Sarah Chen (Partner) ↔ David Guggina**: network strategy and value case.\n- **Joe Smith (Principal) ↔ SVP Supply Chain**: day-to-day sponsor and scoping.\n- **Priya Raman (Project Leader) ↔ CFO office FP&A lead**: build the payback model together.\n- **Marcus Webb ↔ Global Tech planning lead**: data availability and architecture.\n- **Hannah Kim (Knowledge Expert)**: benchmarks and case material for every touchpoint.",
        "prior-engagements":
          "- Assume **no current BCG engagement** in U.S. supply chain (validate in CRM).\n- Walmart is sophisticated and has built much in-house; it buys **specific expertise and speed**, not generic frameworks.\n- The Symbotic relationship matters: our proposal must **complement** its roadmap, not second-guess it.\n\n_Mark as assumptions until checked with the account team._",
        "industry-trends":
          "Themes to bring to conversations:\n- **Network orchestration beats node optimization**: the value is in how DCs, APDs, stores and last mile share volume.\n- **AI planning**: probabilistic demand and inventory placement reduce split shipments.\n- **The 10-20-70 rule** (BCG): most AI value comes from process and people change, not algorithms.\n- **Last-mile economics**: drone and store-based delivery change the cost curve for small baskets.",
        "engagement-cadence":
          "| Week | Touchpoint | Owner |\n|---|---|---|\n| W1 | Scoping call with the sponsor | Joe Smith |\n| W2 | Data request and site visit (automated RDC) | Priya Raman |\n| W3 | Hypothesis review with Supply Chain and Tech | Sarah Chen |\n| W4 | CFO office: value case framing | Priya Raman |\n| W5 | People team: workforce transition principles | Joe Smith |\n| W6 | Pre-read to David Guggina | Sarah Chen |\n| W7 | Orals rehearsal (red team) | Whole team |\n| W8 | Orals, then follow-up within 24h | Sarah Chen |",
      },
    },
    "team-formation": {
      team: {
        summary:
          "A team built for **network design, automation value capture and AI planning**, anchored by a supply chain Partner and supported by retail operations and data science depth.",
        teamMembers: [
          member("Sarah Chen", "Dallas", 95, ["Retail", "Supply chain", "Automation"], ["Network design", "Executive storytelling"], ["National grocer DC network redesign", "Omnichannel fulfillment strategy for a big-box retailer"]),
          member("Joe Smith", "Chicago", 90, ["Retail", "Consumer"], ["Program management", "Value capture tracking"], ["eCommerce profitability program for a mass merchant"]),
          member("Priya Raman", "New York", 86, ["Retail", "Operations"], ["Cost-to-serve modeling", "Labor planning"], ["Store labor model redesign for a national chain"]),
          member("Luis Ortega", "San Francisco", 82, ["Technology", "AI"], ["AI planning systems", "Build-vs-buy assessment"], ["AI inventory placement build with BCG X"]),
          member("Marcus Webb", "Dallas", 74, ["Retail"], ["Data analysis", "Simulation"], ["Last-mile cost benchmarking"]),
        ],
        suggestedRoles: [
          "Engagement Partner: owns the CEO and Walmart U.S. relationship and the value case (Sarah Chen)",
          "AI planning lead: credibility with Global Tech on build vs. buy (Luis Ortega)",
          "Workforce transition expert: associate re-skilling and change",
          "Network simulation specialist: models volume splits across nodes",
        ],
        potentialGaps: [
          "People and change expertise for a very large hourly workforce; add a POP practice expert",
          "Drone and autonomous last-mile regulation; bring in an aviation or regulatory expert on call",
        ],
        capabilityInsights:
          "Strong on network design and value capture. The winning differentiator will be showing **BCG X can build the AI planning layer alongside Walmart's in-house team** without overlapping Symbotic's scope.",
      },
    },
    "topic-research": {
      sections: {
        "methods-tools":
          "- **End-to-end network design**: optimize the volume split across DCs, APDs, stores and last mile together.\n- **Cost-to-serve by order profile** (basket size, speed promise, distance).\n- **Digital twin / simulation** of flows under peak and disruption scenarios.\n- **AI inventory placement** and probabilistic demand forecasting.\n- **Labor model redesign** with activity-based standards for automated sites.\n- **Value capture office** with a benefits ledger tied to the P&L.",
        "industry-primer":
          "Retail fulfillment has moved from **stores + DCs** to a **multi-node network**: automated regional DCs, micro-fulfillment and pickup/delivery centers, stores as hubs, and new last-mile modes (gig drivers, drones). The economics depend on **density** (orders per route or node), **basket size** and the **speed promise**. Automation lowers variable cost but raises fixed cost, so **utilization** is the key lever. AI planning decides where inventory sits and which node serves each order.",
        "past-proposal":
          "Reuse from **Grocer_Network_Redesign_Proposal_2025**:\n- The 3-phase structure (diagnose → design → mobilize)\n- The cost-to-serve waterfall exhibit\n- The value capture governance slide\n\nUpdate for Walmart's scale, the Symbotic partnership and drone delivery.",
        credentials:
          "Credentials to show (generic, anonymized):\n- Network redesign for a national grocer\n- Automation business-case reviews for large retailers\n- AI demand forecasting builds (BCG X)\n- Labor model transformations in large hourly workforces\n\n_Pull specific approved credentials from the knowledge team._",
        vignettes:
          "**Illustrative vignette 1 – Node utilization:** a retailer's new automated DC ran at 60% utilization because store replenishment volume wasn't rerouted. Re-planning the network lifted utilization and cut cost per case.\n\n**Illustrative vignette 2 – Split shipments:** AI inventory placement cut split eCommerce shipments by moving slow-moving SKUs to fewer nodes.\n\n_Illustrative only, not client work._",
        experts:
          "- **Sarah Chen** – supply chain network design (topic expert)\n- **BCG X** AI planning and optimization lead\n- **POP practice** expert on workforce transition\n- **Retail media / eCommerce** expert for the fulfillment-to-growth link",
        benchmarks:
          "Benchmarks to validate with Hannah Kim's team:\n- Share of stores served by automated DCs: Walmart ~65% (FY26)\n- eCommerce share of sales: Walmart ~23% (Q4 FY26)\n- Last-mile cost per order by mode (store-picked vs. APD vs. drone)\n- DC throughput per labor hour, automated vs. conventional\n\n_External ranges need verification before use._",
        "client-references":
          "Most persuasive references: **large omnichannel retailers** that scaled automation and could speak to value capture, ideally a **grocer** (grocery is Walmart's traffic driver). Position references around outcomes (cost per order, utilization) rather than technology.",
      },
    },
    storyline: {
      storyline: [
        {
          name: "Hypothesis & Perspective",
          slides: [
            { title: "Walmart has built the assets; the next $B of value comes from orchestrating them as one network", bullets: ["Automated DCs now serve ~65% of stores; ~400 APDs are coming", "eCommerce is ~$150B and growing ~24% a year", "Each node is optimized locally, but volume allocation across nodes is not"] },
            { title: "Utilization and routing, not more capex, will decide the return on automation", bullets: ["Automation shifts cost from variable to fixed", "Returns depend on steering the right volume to each node", "AI planning is the control tower that makes this possible"] },
          ],
        },
        {
          name: "Why BCG & Value",
          slides: [
            { title: "BCG combines retail network design with the ability to build the AI layer", bullets: ["End-to-end supply chain transformation approach", "BCG X builds production AI alongside client teams", "Vendor-neutral: complements Symbotic and Wing"] },
            { title: "Illustrative value: a sizable reduction in cost per eCommerce order at full ramp", bullets: ["Levers: node utilization, split-shipment reduction, labor standards", "Sized in the diagnostic with Walmart's own data", "Tracked in a benefits ledger tied to the P&L"] },
          ],
        },
        {
          name: "Approach & Methodology",
          slides: [
            { title: "A 16-week program moves from network diagnostic to a live AI planning pilot", bullets: ["Weeks 1–5: cost-to-serve and utilization diagnostic", "Weeks 6–11: target network and volume split", "Weeks 12–16: AI planning pilot in one region, plus a workforce plan"] },
            { title: "Workforce transition is designed in from day one, not bolted on", bullets: ["Role maps for automated sites", "Re-skilling paths for associates", "Change plan co-owned with the People team"] },
          ],
        },
        {
          name: "Team & Experience",
          slides: [
            { title: "A Partner-led team with retail operations, AI build and change expertise", bullets: ["Sarah Chen (Partner) leads", "BCG X AI planning lead embedded", "POP expert for workforce transition"] },
          ],
        },
        {
          name: "Executive Summary",
          slides: [
            { title: "BCG will help Walmart turn automation investments into a lower-cost, AI-orchestrated fulfillment network in 16 weeks", bullets: ["Situation: world-class assets and fast eCommerce growth", "Complication: node-level optimization leaves network value unrealized", "Answer: target volume split, AI planning pilot and workforce plan", "Outcome: lower cost per order with speed promises protected"] },
          ],
        },
      ],
    },
    commercial: {
      sections: {
        "pricing-strategy":
          "**Recommended: a hybrid model.**\n- **Phase 1 diagnostic (5 weeks): fixed fee.** A well-defined scope with data-driven outputs.\n- **Phases 2–3 (11 weeks): fixed fee plus an outcome-linked component** tied to the cost per order improvement in the pilot region.\n\n_Indicative fee levels to be set with the Partner and pricing desk._",
        "investment-framing":
          "Frame the fee against **the value at stake from better utilization of assets Walmart has already paid for**. Even a small improvement in cost per order across a ~$100B U.S. eCommerce business dwarfs the fee. Use **phase gates**: Walmart can stop after the diagnostic with a standalone deliverable.",
        "delivery-model":
          "- Core team of 6–8 on site in Bentonville, plus BCG X engineers for the pilot.\n- Joint squads with Walmart supply chain and Global Tech.\n- Weekly steering with the sponsor; monthly with the Walmart U.S. CEO.\n- Knowledge transfer so Walmart owns the models at handover.",
        "competitive-edge":
          "- Against **McKinsey**: similar credentials; win on BCG X's build-with-you model and a faster pilot.\n- Against **Accenture**: they will lead with systems integration; we lead with network economics and stay vendor-neutral.\n- Offer the outcome-linked fee to **signal confidence**.",
        "risks-watchouts":
          "- **Data access**: network data spans many systems. Agree a data request in week 1.\n- **Baseline disputes** on the outcome component: agree the method up front.\n- **Overlap with Symbotic** scope: define boundaries in the SOW.\n- **Workforce sensitivity**: all communication about associates goes through the People team.",
        "expert-contacts":
          "- Retail practice pricing lead: fee structure and outcome terms\n- BCG X delivery lead: pilot staffing and engineering cost\n- Legal: outcome-linked fee terms\n- Hannah Kim: benchmark sourcing",
      },
    },
    "polish-proposal": {
      polish: {
        overallAssessment:
          "The draft is **too generic for Walmart**. It never states a point of view, quantifies nothing, and could be sent to any retailer. Rebuild it answer-first: lead with the network-orchestration hypothesis, size the value, and show how we complement Symbotic and Wing. Fees on pure T&M undercut confidence; offer a hybrid.",
        score: 48,
        sections: [
          {
            name: "Executive Summary",
            strengths: ["Correctly identifies automation as the focus"],
            gaps: ["No point of view or answer", "No numbers", "Vague claims of experience"],
            rewrites: [
              {
                before: "We will help Walmart get more value from these investments by looking at the network and finding opportunities.",
                after: "Walmart has built world-class automated assets; the next wave of value comes from orchestrating DCs, APDs, stores and last mile as one AI-planned network. We will set that target network and prove it in a live regional pilot within 16 weeks.",
              },
            ],
          },
          {
            name: "Our Understanding",
            strengths: ["Mentions Symbotic and drone delivery"],
            gaps: ["No facts (65% of stores automated, ~$150B eCommerce)", "Doesn't explain why coordination matters economically"],
            rewrites: [
              {
                before: "There are many initiatives underway including Symbotic and drone delivery. It is important that these are coordinated.",
                after: "With ~65% of stores served by automated DCs and ~400 APDs coming, returns now depend on utilization: steering the right volume to each node. Today each node is optimized on its own.",
              },
            ],
          },
          {
            name: "Approach",
            strengths: ["A clear phase structure"],
            gaps: ["Activities, not outcomes", "'Ongoing' implementation support is open-ended", "No workforce component"],
            rewrites: [
              {
                before: "Phase 1: Diagnostic (8 weeks). We will interview stakeholders and collect data.",
                after: "Weeks 1–5 – Diagnostic: cost-to-serve and node utilization baseline across the U.S. network, with the value at stake sized by lever.",
              },
            ],
          },
          {
            name: "Fees",
            strengths: [],
            gaps: ["T&M only signals low confidence and exposes the client"],
            rewrites: [
              {
                before: "Our fees will be based on time and materials.",
                after: "We propose a fixed fee for the diagnostic and a fixed-plus-outcome structure for design and pilot, linked to the measured cost-per-order improvement in the pilot region.",
              },
            ],
          },
        ],
      },
    },
    "practice-pitch": {
      sections: {
        "top-questions":
          "1. **\"We've already automated. What's left?\"**: Utilization and orchestration. Assets optimized one at a time leave network value on the table; we'll show where.\n2. **\"How is this different from what Symbotic provides?\"**: Symbotic optimizes inside the building; we optimize which volume goes to which building.\n3. **\"How confident are you in the value?\"**: We size it with your data in the diagnostic and put part of our fee at risk.\n4. **\"What happens to our associates?\"**: Workforce transition is a workstream from day one, co-owned with People.\n5. **\"Why not do this in-house?\"**: Speed and cross-retailer pattern recognition; we build with your team and hand over the models.",
        "persona-questions":
          "**CEO Walmart U.S.:** \"How does this show up in the P&L this fiscal year?\" Answer: through the pilot region's cost per order, tracked monthly.\n\n**CFO office:** \"What's the payback on the fee?\" Answer: a phase gate after the diagnostic, with the value case built with FP&A.\n\n**CTO:** \"Will you lock us into a tool?\" Answer: no; models are handed over and run on Walmart's platforms.\n\n**People leader:** \"How will associates hear about this?\" Answer: only through agreed People channels, with re-skilling paths first.",
        "roleplay-questions":
          "**Role-play (CFO, skeptical):** \"Your value slide says 'sizable'. That's not a number.\"\n- Response: \"Fair. We won't guess with your money. The diagnostic produces a number with your data in five weeks, and we'll put part of our fee against it.\"\n\n**Slide challenge – Approach:** \"16 weeks feels fast for a network of this scale.\" Response: the pilot is one region; the full rollout is a later phase.",
      },
    },
  },
};
