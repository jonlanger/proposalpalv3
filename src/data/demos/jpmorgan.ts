import type { DemoProposal } from "../types";
import { date, ILLUSTRATIVE, member, sourcesSection, team } from "./helpers";

const DRAFT = `Executive Summary
JPMorgan Chase is a leader in AI. We propose to help the bank scale agentic AI in its operations.

Context
The bank has hundreds of AI use cases and a large internal LLM platform. Agentic AI is the next step.

Our Approach
1. Identify use cases
2. Prioritize
3. Build pilots
4. Scale

Governance
We will follow the bank's risk policies.

Team
Our team has banking and AI experts.`;

export const JPMORGAN: DemoProposal = {
  proposal: {
    id: "demo-jpmorgan",
    opportunityId: "547602-09",
    clientName: "JPMorgan Chase & Co.",
    proposalName: "Agentic AI in Operations – From Use Cases to Redesigned End-to-End Processes",
    proposalContext:
      "JPMorgan Chase has asked for proposals to move from 450+ AI use cases (target ~1,000) toward agentic AI that redesigns end-to-end operations processes in Consumer & Community Banking and the Commercial & Investment Bank. Context: about $2B of annual AI spend matched by about $2B of benefits; LLM Suite available to 200,000+ employees; 2026 expense outlook of about $105B including about $20B for technology. With the CDAO role being folded into the lines of business at the end of 2026, the sponsors are the business COOs, and the work must meet model risk, access control and regulatory expectations. Decision expected in Q1 2027.\n\n" +
      ILLUSTRATIVE,
    industryPracticeAreas: ["FIP"],
    functionalPracticeAreas: ["TDA", "OPS"],
    proposalDate: "2026-12-18",
    proposalDescription:
      "BCG will help JPMorgan Chase turn AI use cases into redesigned operations. We will pick three end-to-end processes (e.g., commercial client onboarding/KYC, payments exceptions, card disputes), redesign them around agents with human oversight, build them with BCG X on the bank's platforms, and set up the operating model and controls to scale, with the 10-20-70 principle guiding the effort.",
    competitiveLandscape:
      "Accenture and IBM will pitch scale engineering; McKinsey (QuantumBlack) will pitch AI transformation; the Big Four will lead on risk and controls. JPMorgan builds heavily in-house and is selective. BCG differentiates with process redesign plus BCG X build, a lines-of-business ownership model, and control design from day one.",
    topicExpert: "Luis Ortega, Principal – AI in financial services operations; agentic workflow design",
    uploadedFiles: [
      { name: "JPMC_4Q25_Earnings_Release.pdf", type: "Client Context" },
      { name: "Bank_Ops_Automation_Benchmarks_2026.xlsx", type: "BCG IP" },
      { name: "GenAI_Operations_Proposal_Tier1_Bank_2025.pptx", type: "Past Proposal" },
    ],
    draftProposal: { name: "JPMC_Agentic_Ops_Draft_v0.2.docx", type: "Past Proposal", text: DRAFT },
    teamMembers: team(["Elena Rossi", "Luis Ortega", "Marcus Webb", "Amara Nwosu", "Tom Becker"]),
    createdAt: date("2026-09-12"),
    updatedAt: date("2026-09-21"),
  },
  content: {
    "client-research": {
      sections: {
        "contextual-overview":
          "**JPMorgan Chase is the largest U.S. bank (~$4.4T in assets)** and one of the most advanced AI adopters in any industry. 2025 net income was **~$57.0B** with ~20% ROTCE. It spends **~$18B a year on technology** (about $20B planned for 2026) and reports **~$2B of annual AI benefits** matching its ~$2B AI spend.\n\n**Why now:** with rate tailwinds fading, expense discipline matters more. The next AI step, **agents that act across processes**, must show up in operating expense. AI ownership is also **moving into the lines of business** as the standalone CDAO role is retired at the end of 2026.",
        "industry-competitors":
          "**Trends:** AI moving from copilots to agents; regulators focused on model risk and third-party risk; deposit competition and fading net interest income tailwinds; tech spend as a moat.\n\n| Peer | Angle |\n|---|---|\n| Bank of America | Erica and digital scale |\n| Citi | Transformation and controls remediation |\n| Wells Fargo | Efficiency post asset cap |\n| Goldman / Morgan Stanley | AI in markets and wealth |",
        "financial-information":
          "**2025:** net income ~$57.0B ($20.02/share); revenue ~$182B; ROTCE ~20%; assets ~$4.4T.\n**Technology:** ~$18B spend in 2025; 2026 expense outlook ~$105B including ~$20B tech.\n**AI:** ~$2B annual spend, ~$2B annual benefit (management commentary); 450+ use cases in production.\n**AWM:** record inflows; client assets ~$7.1T.\n\n_Verify against the 10-K and 4Q25 release._",
        "portfolio-offerings":
          "- **Consumer & Community Banking (Chase)**: branches, deposits, cards, auto, home lending, Chase digital.\n- **Commercial & Investment Bank**: IB, markets, payments, commercial banking, securities services.\n- **Asset & Wealth Management**: asset management and the Private Bank.\n- **Internal AI**: LLM Suite, 450+ production use cases.",
        "news-publications":
          "- **Jan 2026:** full-year 2025 results; $105B 2026 expense outlook.\n- **Jun 2026:** Doug Petno and Troy Rohrbaugh named co-presidents; Marianne Lake departs.\n- **2026:** CDAO Teresa Heitsenrether to retire at year end; AI moves into the businesses.\n- **Sep 2026:** Jamie Dimon comments on hyperscaler AI capex reaching ~$1T.",
        "executive-profiles":
          "**Jamie Dimon – Chairman & CEO**: publicly bullish on AI and demanding on returns.\n\n**Doug Petno – Co-President & CEO, CIB**: operations scale in payments and onboarding.\n\n**Troy Rohrbaugh – Co-President & CEO, CCB**: new to consumer; will want quick, visible wins.\n\n**Jeremy Barnum – CFO**: focused on expense discipline and the AI benefit ledger.\n\n**Business COOs (sponsors)**: own the operations processes and headcount plans.\n\n_Views are hypotheses._",
        "company-priorities":
          "1. **Expense discipline** as the NII tailwind fades.\n2. **Scale AI** from use cases to process redesign and agents.\n3. **Controls**: model risk, access control for agents, regulatory confidence.\n4. **Modernize the tech estate** (cloud, data).\n5. **Succession and leadership transitions** in CCB and CIB.",
        sources: sourcesSection("jpmorgan", [
          { title: "CNBC: Dimon on AI spending (Sep 2026)", url: "https://www.cnbc.com/2026/09/21/jamie-dimon-jpm-jpmorgan-indiaconference.html", why: "Latest CEO view on AI economics" },
        ]),
      },
    },
    "client-engagement": {
      sections: {
        "relationship-mapping":
          "| Stakeholder | Role | Stance | Relationship |\n|---|---|---|---|\n| CIB COO (sponsor) | Economic buyer | Supportive | Medium |\n| CCB COO | Co-sponsor | Wants quick wins | Weak |\n| CFO office | Benefit validation | Demanding | Medium |\n| Chief Risk / Model Risk | Gatekeeper | Cautious on agents | Weak |\n| Firmwide AI platform team | Builder | May see overlap | Medium |",
        "engagement-pairings":
          "- **Elena Rossi ↔ CIB COO**: process redesign and value.\n- **Luis Ortega ↔ AI platform leadership**: build-with, not build-around.\n- **Marcus Webb ↔ CCB operations**: card disputes and servicing.\n- **Amara Nwosu ↔ Model risk**: control framework for agents.\n- **Tom Becker**: benchmarks and peer research.",
        "prior-engagements":
          "- Assume past BCG work in payments strategy or CCB (validate).\n- The bank builds in-house; BCG must **amplify internal teams** and hand over.\n- Agents need **new control patterns** (identity, permissions, audit), so engage Risk early.",
        "industry-trends":
          "- **From copilots to agents**: value moves from task time saved to end-to-end cycle time and headcount avoided.\n- **10-20-70**: most value comes from redesigning work and roles.\n- **Agent controls**: identity, least privilege, human-in-the-loop thresholds, audit trails.\n- **Benefit ledgers**: CFO-validated AI benefits are becoming the norm.",
        "engagement-cadence":
          "| Week | Touchpoint | Owner |\n|---|---|---|\n| W1 | Sponsor scoping (CIB COO) | Elena Rossi |\n| W2 | Process shortlist workshop | Luis Ortega |\n| W3 | Model risk pre-read | Amara Nwosu |\n| W4 | CCB working session | Marcus Webb |\n| W5 | CFO benefit ledger alignment | Elena Rossi |\n| W7 | Orals rehearsal | Team |\n| W8 | Orals | Elena Rossi |",
      },
    },
    "team-formation": {
      team: {
        summary:
          "A team combining **banking operations, agentic AI build and model risk** to redesign end-to-end processes, not just deploy tools.",
        teamMembers: [
          member("Luis Ortega", "New York", 94, ["Financial institutions", "AI"], ["Agentic workflow design", "BCG X build"], ["GenAI operations program at a tier-1 bank", "KYC automation redesign"]),
          member("Elena Rossi", "New York", 88, ["Financial services", "Operations"], ["C-suite advisory", "Operating model"], ["Operations transformation at a global bank"]),
          member("Amara Nwosu", "New York", 82, ["Banking", "Risk"], ["Model risk", "Controls design"], ["AI governance framework for a large bank"]),
          member("Marcus Webb", "Chicago", 75, ["Banking"], ["Process mining", "Analytics"], ["Card disputes process redesign"]),
          member("Tom Becker", "London", 68, ["Financial services"], ["Benchmarking"], ["Bank operations cost benchmark"]),
        ],
        suggestedRoles: [
          "Financial institutions Partner / MDP (Elena Rossi)",
          "Agent architecture lead from BCG X",
          "Regulatory expert (OCC/Fed model risk expectations)",
          "Change and workforce lead for operations roles",
        ],
        potentialGaps: [
          "Regulatory depth on agent supervision; add an FIP risk expert",
          "Workforce planning for large operations centers",
        ],
        capabilityInsights:
          "Strong technical and ops pairing. The **model risk story** will make or break this; lead the orals with the control framework, not the technology.",
      },
    },
    "topic-research": {
      sections: {
        "methods-tools":
          "- **Process mining** to baseline cycle time and touchpoints.\n- **Agent opportunity scoring**: volume × variability × rules clarity × risk.\n- **Human-in-the-loop design**: confidence thresholds and escalation.\n- **Agent control framework**: identity, permissions, audit and monitoring.\n- **Benefit ledger** validated by Finance.\n- **10-20-70** effort allocation.",
        "industry-primer":
          "Bank operations (onboarding/KYC, payments exceptions, disputes, reconciliations) are **high-volume, rules-heavy and document-intensive**, which makes them ideal for agents. The constraint is **control**: agents that act (not just draft) need permissions, audit trails and supervision acceptable to regulators. Leaders are moving from use-case counts to **process-level P&L outcomes**.",
        "past-proposal":
          "Reuse from **GenAI_Operations_Proposal_Tier1_Bank_2025**: the process prioritization matrix, the control framework graphic and the benefit ledger design.",
        credentials:
          "- GenAI and automation programs in tier-1 bank operations\n- KYC/onboarding redesign\n- AI governance and model risk frameworks\n- BCG X builds in regulated environments",
        vignettes:
          "**Illustrative – KYC agent:** agents assembled client due-diligence files and flagged exceptions, with analysts approving. Cycle time fell and analyst capacity moved to complex cases.\n\n**Illustrative – Payments exceptions:** an agent triaged and resolved routine repair items within limits, escalating the rest.\n\n_Illustrative only._",
        experts:
          "- **Luis Ortega** (topic expert)\n- **BCG X** agent architecture lead\n- **FIP risk** expert on model risk and supervision\n- **Operations excellence** expert on process mining",
        benchmarks:
          "- JPMC: 450+ AI use cases; ~$2B AI spend / ~$2B benefit; ~$18B tech spend (2025)\n- Operations cost per account or transaction by process (peer ranges)\n- Straight-through processing rates in payments\n- KYC cycle time (days)\n\n_Validate peer benchmarks._",
        "client-references":
          "The most persuasive references are **other G-SIBs or large regional banks** that moved agents into production under regulatory scrutiny. Position around control design and CFO-validated benefits.",
      },
    },
    storyline: {
      storyline: [
        {
          name: "Hypothesis & Perspective",
          slides: [
            { title: "JPMorgan Chase has won the use-case race; the next ~$B comes from redesigning whole processes around agents", bullets: ["450+ use cases; ~$2B benefit", "Use-case gains are task-level; process redesign is P&L-level", "Agents can own routine end-to-end work under supervision"] },
            { title: "Control design, not model capability, is the binding constraint", bullets: ["Agents act, so they need identity, permissions and audit", "Regulators expect clear accountability", "Designing controls first speeds approval"] },
          ],
        },
        {
          name: "Why BCG & Value",
          slides: [
            { title: "BCG pairs process redesign with BCG X build and a control framework", bullets: ["10-20-70: most effort on work redesign", "Builds on LLM Suite and bank platforms", "Benefit ledger validated with Finance"] },
            { title: "Illustrative value: material opex reduction in three priority processes within a year", bullets: ["Sized with process mining in weeks 1–4", "Leading indicators: cycle time, straight-through processing, backlog", "Tracked in the CFO's AI benefit ledger"] },
          ],
        },
        {
          name: "Approach & Methodology",
          slides: [
            { title: "Three processes, redesigned and live within 20 weeks", bullets: ["Weeks 1–4: baseline and prioritization", "Weeks 5–12: redesign and build", "Weeks 13–20: controlled production, then scale plan"] },
            { title: "The line-of-business ownership model replaces the central AI function", bullets: ["COOs own outcomes", "The platform team owns shared agent services", "Risk owns the control standards"] },
          ],
        },
        {
          name: "Team & Experience",
          slides: [
            { title: "Bank operations, agent engineering and model risk experts in one team", bullets: ["Elena Rossi (MDP) leads", "Luis Ortega: agentic AI", "Amara Nwosu: model risk"] },
          ],
        },
        {
          name: "Executive Summary",
          slides: [
            { title: "BCG will help JPMorgan Chase move from AI use cases to agent-run processes, starting with three live processes in 20 weeks", bullets: ["Situation: AI leader with ~$2B benefit", "Complication: expense pressure; AI moving to the businesses", "Answer: process redesign, agents built on bank platforms, controls first", "Outcome: CFO-validated opex reduction and a repeatable model"] },
          ],
        },
      ],
    },
    commercial: {
      sections: {
        "pricing-strategy":
          "**A fixed fee per process wave plus a benefit-linked component.** Each wave (three processes) has a fixed fee; an optional component is tied to CFO-validated run-rate benefit at the end of the wave.",
        "investment-framing":
          "Anchor on JPMC's own ledger: **~$2B of AI benefit against ~$2B of spend**. The proposal adds process-level benefits on top, and the fee is a fraction of the first-year run-rate benefit per wave.",
        "delivery-model":
          "- Joint squads: BCG, the line of business and the platform team.\n- BCG X engineers work in the bank's environment under bank controls.\n- Model risk embedded from design.\n- Monthly steering with both COOs and the CFO office.",
        "competitive-edge":
          "Against Accenture and IBM: outcome-led, not staff-augmentation. Against McKinsey: controls-first design and line-of-business ownership. Against the Big Four: we build, not just assure.",
        "risks-watchouts":
          "- **Regulatory scrutiny** of agents: engage Risk in week 1.\n- **Third-party risk** onboarding for BCG X engineers: start early.\n- **Overlap with the internal platform team**: define the RACI in the SOW.\n- **Benefit attribution**: follow the CFO's ledger rules.",
        "expert-contacts":
          "- FIP practice pricing lead\n- BCG X financial services delivery lead\n- Legal: data access and third-party risk\n- Tom Becker: peer benchmarks",
      },
    },
    "polish-proposal": {
      polish: {
        overallAssessment:
          "The draft flatters the client but **doesn't challenge or inform them**. JPMC already has 450+ use cases; a four-step 'identify, prioritize, pilot, scale' approach sounds behind them. Lead with process redesign, control design and the benefit ledger.",
        score: 45,
        sections: [
          {
            name: "Executive Summary",
            strengths: ["Recognizes JPMC's AI leadership"],
            gaps: ["No insight beyond the RFP", "No value or timeline"],
            rewrites: [
              {
                before: "We propose to help the bank scale agentic AI in its operations.",
                after: "JPMorgan Chase has won the use-case race. The next wave of value comes from redesigning whole operations processes around supervised agents. We will put three redesigned processes into controlled production within 20 weeks, with benefits validated in the CFO's ledger.",
              },
            ],
          },
          {
            name: "Our Approach",
            strengths: ["Simple and clear"],
            gaps: ["Use-case approach the client has already outgrown", "No controls step"],
            rewrites: [
              {
                before: "1. Identify use cases\n2. Prioritize\n3. Build pilots\n4. Scale",
                after: "1. Baseline three end-to-end processes with process mining\n2. Redesign work around agents with human-in-the-loop thresholds\n3. Build on LLM Suite with the control framework agreed with Model Risk\n4. Run in controlled production and set up line-of-business ownership to scale",
              },
            ],
          },
          {
            name: "Governance",
            strengths: [],
            gaps: ["Passive; risk is the key differentiator and is underplayed"],
            rewrites: [
              {
                before: "We will follow the bank's risk policies.",
                after: "We will co-design the agent control framework (identity, permissions, audit, escalation) with Model Risk in the first four weeks, so approval is on the critical path rather than a late gate.",
              },
            ],
          },
        ],
      },
    },
    "practice-pitch": {
      sections: {
        "top-questions":
          "1. **\"We build everything in-house. Why BCG?\"**: we build with your teams, bring process redesign and cross-bank patterns, and hand over.\n2. **\"How will Model Risk approve agents?\"**: a controls-first framework designed with Risk from week 1.\n3. **\"How is this different from our use-case program?\"**: it targets the process P&L, not task time.\n4. **\"What's the benefit and who validates it?\"**: sized in weeks 1–4 and validated in the CFO's ledger.\n5. **\"What happens to operations staff?\"**: capacity redeployment plans with HR from the start.",
        "persona-questions":
          "**CFO:** \"How do you avoid double-counting with existing AI benefits?\" Use the ledger's attribution rules.\n**Chief Risk:** \"Who is accountable when an agent errs?\" Named process owners, with human thresholds.\n**CIB COO:** \"Which processes first?\" Onboarding/KYC and payments exceptions.\n**Platform lead:** \"Are you building a parallel stack?\" No; we build on LLM Suite.",
        "roleplay-questions":
          "**Role-play (Jamie Dimon-style challenge):** \"We already save $2B with AI. Tell me something I don't know.\"\n- Answer: \"Most of that is task time. The larger prize is removing whole steps from processes like KYC, where agents can own routine cases end to end under supervision.\"\n\n**Slide challenge – Timeline:** \"20 weeks to production in a bank?\" Answer: controlled production for defined case types, with Risk engaged from week 1.",
      },
    },
  },
};
