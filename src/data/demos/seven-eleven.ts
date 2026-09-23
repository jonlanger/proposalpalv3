import { DEMO_PROPOSAL } from "@/lib/seed";
import type { DemoProposal } from "../types";
import { member, sourcesSection } from "./helpers";

const DRAFT = `Executive Summary
7-Eleven needs a new ERP. BCG will help select and implement a cloud ERP to replace legacy systems across 13,000 stores.

Understanding
The current systems are old and do not provide real-time data. Franchisees need better tools.

Approach
We will run a vendor selection, design processes and support implementation over 18 months.

Why BCG
We have ERP experience and retail expertise.`;

export const SEVEN_ELEVEN: DemoProposal = {
  proposal: {
    ...DEMO_PROPOSAL,
    draftProposal: { name: "Draft_Proposal_7Eleven_v1.docx", type: "Past Proposal", text: DRAFT },
  },
  content: {
    "client-research": {
      sections: {
        "contextual-overview":
          "**7-Eleven, Inc. is the North American convenience business of Seven & i Holdings**, with roughly **13,000 stores** in the U.S. and Canada (projected to fall to about 12,300 after ~645 closures). Seven & i plans to **list the North American business**, a move now delayed to fiscal 2027 at the earliest, while keeping majority ownership.\n\n**Why an ERP transformation now:** a standalone listing requires public-company-grade systems, reporting and controls; the **food-forward strategy** needs real-time inventory and fresh-food supply chain visibility; and franchise operations need modern tools. The legacy POS and back-office estate is a constraint on all three.\n\n_Stakeholder names in the RFP context are illustrative._",
        "industry-competitors":
          "**U.S. convenience retail:** fuel margins are volatile, and growth is shifting to **fresh food, loyalty and delivery**. Store counts are consolidating.\n\n| Competitor | Angle |\n|---|---|\n| Circle K (Couche-Tard) | Scale; made a takeover approach for Seven & i |\n| Casey's | Prepared food leader (pizza) |\n| Wawa / Sheetz | Fresh food and customer experience benchmarks |\n| Murphy USA / QuikTrip | Low-cost fuel-led formats |",
        "financial-information":
          "- Owned by **Seven & i Holdings** (Tokyo-listed); North American results are reported within the group.\n- **IPO timing:** slipped from 2026 to fiscal 2027 at the earliest.\n- **Footprint:** 13,000+ stores (2024), heading to ~12,272 by fiscal year end.\n- Detailed standalone financials will be available with IPO filings. Treat revenue and margin figures as **to be verified**.",
        "portfolio-offerings":
          "- Company-operated and **franchised** stores, many with fuel (including the Speedway network acquired in 2021).\n- **Proprietary and fresh food**: the core of the food-forward strategy.\n- **7NOW** delivery and the **7Rewards** loyalty program.\n- Private brands (7-Select).",
        "news-publications":
          "- **2025:** Stephen Hayes Dacus becomes Seven & i CEO, the group's first non-Japanese CEO.\n- **2026:** IPO delayed; layoffs and ~645 store closures; bigger fresh-food push.\n- Seven & i refocuses exclusively on convenience after rejecting Couche-Tard's approach.",
        "executive-profiles":
          "**Stephen Hayes Dacus – CEO, Seven & i Holdings**: driving the group's focus on convenience and the North American listing.\n\n**CIO (named in RFP context as John Phee – illustrative)**: owns the ERP and POS program; priorities are scalability and real-time data.\n\n**VP Operations (illustrative: Tony Harris, Tom Lesser)**: care about store and franchisee adoption and minimal disruption.\n\n_Validate all stakeholder names and views._",
        "company-priorities":
          "1. **IPO readiness**: systems, controls and financial reporting.\n2. **Food-forward growth**: fresh-food supply chain and waste reduction.\n3. **Store productivity** and footprint rationalization.\n4. **Franchisee experience**: modern tools and real-time data.\n5. **Loyalty and delivery** growth (7Rewards, 7NOW).",
        sources: sourcesSection("seven-eleven"),
      },
    },
    "client-engagement": {
      sections: {
        "relationship-mapping":
          "| Stakeholder | Role | Stance | Relationship |\n|---|---|---|---|\n| CIO (John Phee, illustrative) | Economic buyer | Supportive | Medium |\n| VP Operations (Tony Harris) | Influencer | Adoption-focused | Weak |\n| VP Operations (Tom Lesser) | Influencer | Franchise-focused | Weak |\n| CFO / IPO readiness lead | Gatekeeper | Controls-focused | Weak |\n| Seven & i group IT | Influencer | Standards-focused | None |",
        "engagement-pairings":
          "- **Sarah Chen (Partner) ↔ CIO**: ERP strategy and roadmap.\n- **Joe Smith ↔ CFO / IPO readiness lead**: reporting and controls.\n- **Priya Raman ↔ VP Operations**: store and franchise process design.\n- **Marcus Webb ↔ IT architecture**: current-state assessment.",
        "prior-engagements":
          "- Assume **no recent BCG work** at 7-Eleven, Inc. (validate); possible relationships at the Seven & i group level.\n- The ERP decision likely involves **group IT standards** from Tokyo.\n- System integrators (Accenture, Deloitte) may already be in discussions.",
        "industry-trends":
          "- **Clean-core cloud ERP** with a composable retail stack.\n- **Real-time inventory** for fresh food to cut waste.\n- **IPO-grade finance transformation** alongside ERP.\n- **Franchise-facing apps** as part of the ERP program.",
        "engagement-cadence":
          "| Week | Touchpoint | Owner |\n|---|---|---|\n| W1 | CIO scoping | Sarah Chen |\n| W2 | Store visits (company and franchise) | Priya Raman |\n| W3 | Architecture deep-dive | Marcus Webb |\n| W4 | IPO readiness framing with the CFO | Joe Smith |\n| W6 | Draft roadmap review | Sarah Chen |\n| W7 | Orals rehearsal | Team |\n| W8 | Orals | Sarah Chen |",
      },
    },
    "team-formation": {
      team: {
        summary:
          "An ERP transformation team with **retail operations, technology strategy and finance/IPO readiness** skills, led by a Partner with Fortune 500 retail ERP experience.",
        teamMembers: [
          member("Sarah Chen", "Dallas", 95, ["Retail", "Technology"], ["ERP transformation", "Program leadership"], ["ERP transformation for a Fortune 500 retailer", "POS modernization program"]),
          member("Joe Smith", "Chicago", 88, ["Retail", "Consumer"], ["Finance transformation", "IPO readiness"], ["Carve-out readiness for a retail spin-off"]),
          member("Priya Raman", "Dallas", 84, ["Retail"], ["Process design", "Franchise operations"], ["Franchise operating model redesign"]),
          member("Marcus Webb", "Dallas", 74, ["Technology"], ["Architecture assessment"], ["Legacy retail systems assessment"]),
          member("David Okafor", "Chicago", 68, ["Consumer"], ["Business case modeling"], ["ERP business case for a grocer"]),
        ],
        suggestedRoles: [
          "ERP program Partner (Sarah Chen)",
          "Finance and IPO readiness lead",
          "Fresh-food supply chain expert",
          "Change lead for franchisee adoption",
        ],
        potentialGaps: ["Japanese-speaking liaison for Seven & i group IT", "Fuel systems expertise"],
        capabilityInsights:
          "Strong ERP and retail depth. Winning requires linking ERP to **IPO readiness** and the **food-forward strategy**, not just a technology refresh.",
      },
    },
    "topic-research": {
      sections: {
        "methods-tools":
          "- **Value-led ERP roadmap**: sequence releases by business value.\n- **Clean-core design** to minimize customization.\n- **Vendor-neutral selection** with scripted demos.\n- **IPO readiness assessment** (controls, close, reporting).\n- **Store-level change and training** at scale.",
        "industry-primer":
          "Convenience retail ERP must handle **very high store counts, franchise and corporate models, fuel, and short-shelf-life food**. Modern programs combine a cloud ERP core with composable POS, inventory and loyalty. **The biggest risks are store rollout and data migration**, not software.",
        "past-proposal":
          "Reuse the retail ERP roadmap graphic and rollout wave plan from prior retail ERP proposals; add IPO readiness and fresh-food modules.",
        credentials:
          "- Retail ERP and POS modernization programs\n- Core system replacement (e.g., the published Banque Saudi Fransi core banking case as an analogy for large core replacements)\n- Finance transformation for listings and carve-outs",
        vignettes:
          "**Illustrative – Wave rollout:** a retailer piloted in 50 stores, fixed issues, then scaled in regional waves, avoiding a big-bang cutover.\n\n**Illustrative – Fresh food:** real-time inventory cut fresh-food waste in pilot stores.\n\n_Illustrative only._",
        experts:
          "- **Sarah Chen**: ERP transformations (topic expert)\n- **Finance function** expert for IPO readiness\n- **Fresh supply chain** expert\n- **BCG Platinion** architects for technology design",
        benchmarks:
          "- ERP program duration for large retailers (months)\n- Share of cost in data migration and change management\n- Fresh-food waste % before and after real-time inventory\n\n_Validate benchmarks before use._",
        "client-references":
          "Best references: **multi-unit or franchise retailers** that completed ERP and POS modernization, and companies that went through **IPO or carve-out readiness**.",
      },
    },
    storyline: {
      storyline: [
        {
          name: "Hypothesis & Perspective",
          slides: [
            { title: "ERP is the backbone for 7-Eleven's IPO, food-forward growth and franchise experience", bullets: ["The IPO requires public-company-grade controls", "Fresh food needs real-time inventory", "Franchisees need modern tools"] },
            { title: "A value-led, clean-core roadmap beats a big-bang technology swap", bullets: ["Sequence releases by value", "Pilot, then roll out in waves", "Minimize customization"] },
          ],
        },
        {
          name: "Why BCG & Value",
          slides: [
            { title: "BCG ties the ERP program to IPO readiness and food-led growth", bullets: ["Business-led, vendor-neutral", "Retail and finance transformation experience", "BCG Platinion architecture depth"] },
            { title: "Illustrative value: lower fresh-food waste, faster close and IPO readiness", bullets: ["Sized in the diagnostic", "Tracked by release", "Linked to the IPO timeline"] },
          ],
        },
        {
          name: "Approach & Methodology",
          slides: [
            { title: "A 12-week blueprint leads into an 18–24 month wave-based rollout", bullets: ["Weeks 1–4: current-state and value case", "Weeks 5–12: target design, vendor selection and roadmap", "Then pilot in ~50 stores and regional waves"] },
          ],
        },
        {
          name: "Team & Experience",
          slides: [
            { title: "A Partner-led team with retail ERP, finance and franchise expertise", bullets: ["Sarah Chen (Partner) leads", "IPO readiness lead", "Franchise change lead"] },
          ],
        },
        {
          name: "Executive Summary",
          slides: [
            { title: "BCG will help 7-Eleven build the systems backbone for its listing and food-forward strategy, with a 12-week blueprint and a wave-based rollout", bullets: ["Situation: ~13,000 stores and a planned listing", "Complication: legacy systems limit controls, food and franchise tools", "Answer: value-led, clean-core ERP roadmap", "Outcome: IPO-ready controls and real-time operations"] },
          ],
        },
      ],
    },
    commercial: {
      sections: {
        "pricing-strategy":
          "**Blueprint phase: fixed fee.** Rollout support: capped T&M per wave, with optional milestone payments tied to wave go-lives.",
        "investment-framing":
          "Frame against the **cost of a delayed or failed IPO** and the value of fresh-food waste reduction. The blueprint phase is a small, fixed investment before multi-year SI spend.",
        "delivery-model":
          "- Irving-based core team.\n- BCG Platinion architects for the design.\n- Vendor-neutral: the SI is selected in the blueprint.\n- Governance with the CIO, CFO and VP Operations.",
        "competitive-edge":
          "Against the SIs (Accenture, Deloitte): business-led and vendor-neutral, and we help pick the SI. Against McKinsey: IPO readiness integration and Platinion architecture.",
        "risks-watchouts":
          "- **Group IT standards** from Seven & i.\n- **IPO timeline changes.**\n- **Franchisee adoption.**\n- **Data migration** across 13,000 stores.",
        "expert-contacts":
          "- Retail practice pricing lead\n- BCG Platinion lead\n- Finance function expert\n- Hannah Kim: ERP benchmarks",
      },
    },
    "polish-proposal": {
      polish: {
        overallAssessment:
          "The draft treats this as a **technology replacement** and misses the strategic drivers: the IPO, food-forward growth and franchise experience. It also commits to implementation before a blueprint. Reframe around business value and a phased, vendor-neutral approach.",
        score: 50,
        sections: [
          {
            name: "Executive Summary",
            strengths: ["Clear on the scope (13,000 stores, cloud ERP)"],
            gaps: ["No link to the IPO or food strategy", "Implies a vendor choice up front"],
            rewrites: [
              {
                before: "7-Eleven needs a new ERP. BCG will help select and implement a cloud ERP to replace legacy systems across 13,000 stores.",
                after: "A modern ERP is the backbone for 7-Eleven's planned listing, its food-forward strategy and a better franchisee experience. We will build a value-led, vendor-neutral blueprint in 12 weeks, then support a wave-based rollout.",
              },
            ],
          },
          {
            name: "Approach",
            strengths: ["Mentions vendor selection"],
            gaps: ["18 months is committed before the blueprint", "No pilot or wave plan"],
            rewrites: [
              {
                before: "We will run a vendor selection, design processes and support implementation over 18 months.",
                after: "Weeks 1–12: value case, target design and vendor-neutral selection. Then a ~50-store pilot and regional waves, with go/no-go gates at each wave.",
              },
            ],
          },
        ],
      },
    },
    "practice-pitch": {
      sections: {
        "top-questions":
          "1. **\"Why not go straight to an SI?\"**: a vendor-neutral blueprint protects the business case and helps choose the right SI.\n2. **\"How does this help the IPO?\"**: controls, close and reporting requirements are designed into release 1.\n3. **\"How will franchisees adopt it?\"**: franchisee co-design and a pilot first.\n4. **\"What does it cost overall?\"**: the blueprint produces the full business case.\n5. **\"What about group IT in Tokyo?\"**: engaged from week 1 on standards.",
        "persona-questions":
          "**CIO:** \"Cloud or hybrid?\" Clean-core cloud with a composable POS.\n**CFO:** \"Will this be ready for the listing?\" Finance releases are sequenced first.\n**VP Operations:** \"How much store disruption?\" Wave rollout outside peak seasons.",
        "roleplay-questions":
          "**Role-play (VP Operations):** \"The last system rollout hurt our franchisees. Why would this be different?\"\n- Answer: \"Franchisees help design it, we pilot in 50 stores first, and we don't move to the next wave until the pilot KPIs are met.\"",
      },
    },
  },
};
