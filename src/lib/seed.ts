import type { Person, Proposal } from "./types";

const avatar = (seed: string, bg: string) =>
  `https://api.dicebear.com/9.x/lorelei/svg?seed=${encodeURIComponent(seed)}&backgroundColor=${bg}`;

function person(first: string, last: string, title: string, bg: string): Person {
  return {
    id: `user-${first.toLowerCase()}-${last.toLowerCase()}`,
    name: `${first} ${last}`,
    email: `${last.toLowerCase()}.${first.toLowerCase()}@bcg.com`,
    initials: `${first[0]}${last[0]}`,
    avatar: avatar(`${first}${last}`, bg),
    title,
    role: "Viewer",
  };
}

/** Directory of people that can be added to a proposal team. */
export const PEOPLE_DIRECTORY: Person[] = [
  person("Joe", "Smith", "Principal", "a8e6cf"),
  person("Sarah", "Chen", "Partner", "ffd3b6"),
  person("Priya", "Raman", "Project Leader", "dcedc1"),
  person("Marcus", "Webb", "Consultant", "ffaaa5"),
  person("Elena", "Rossi", "Managing Director & Partner", "bae1ff"),
  person("David", "Okafor", "Associate", "ffdfba"),
  person("Hannah", "Kim", "Knowledge Expert", "caffbf"),
  person("Luis", "Ortega", "Principal", "e0bbe4"),
  person("Amara", "Nwosu", "Consultant", "fdfd96"),
  person("Tom", "Becker", "Senior Knowledge Analyst", "c9c9ff"),
];

/** The signed-in user (there is no auth; this mirrors the original app). */
export const CURRENT_USER: Person = { ...PEOPLE_DIRECTORY[0], role: "Owner" };

export const DEMO_PROPOSAL: Proposal = {
  id: "demo-proposal-1",
  clientName: "7-Eleven USA",
  proposalName: "ERP Digital Transformation – Comprehensive Client Intelligence",
  opportunityId: "405020-70",
  proposalContext:
    "7-Eleven USA has issued an RFP for a comprehensive ERP transformation to modernize their core business systems across 13,000+ US stores. The scope includes replacing legacy point-of-sale systems, implementing cloud-based inventory management, and integrating supply chain operations with their corporate headquarters. Key stakeholders include CIO John Phee and VP of Operations Tony Harris & Tom Lesser, with decision timeline targeting Q1 2026 implementation. The client is prioritizing scalability, real-time data visibility, and seamless franchise operations integration.",
  industryPracticeAreas: ["CP"],
  functionalPracticeAreas: ["TDA", "OPS"],
  proposalDate: "2026-03-15",
  proposalDescription:
    "BCG will partner with 7-Eleven USA to execute a comprehensive digital transformation of their enterprise resource planning systems. Our approach combines deep retail expertise with cutting-edge technology implementation to deliver a scalable, cloud-native platform that supports real-time operations across 13,000+ locations. The solution will modernize point-of-sale infrastructure, optimize inventory management, and create seamless integration between franchise operations and corporate systems.",
  competitiveLandscape:
    "The RFP has attracted interest from major consulting firms including Accenture, Deloitte, and McKinsey. Accenture brings strong SAP implementation experience, while Deloitte has deep retail industry credentials. However, BCG's unique combination of strategic insight, proprietary digital tools, and proven track record in large-scale retail transformations positions us as the preferred partner for this critical initiative.",
  topicExpert:
    "Sarah Chen, Partner in BCG's Technology Advantage practice, with 15+ years experience leading ERP transformations for Fortune 500 retailers",
  uploadedFiles: [
    { name: "RFP_7-Eleven_ERP_Transformation_2025.pdf", type: "Client Context" },
    { name: "Draft_Proposal_7Eleven_v1.docx", type: "Past Proposal" },
    { name: "7-Eleven_Market_Analysis_2024.xlsx", type: "BCG IP" },
  ],
  teamMembers: PEOPLE_DIRECTORY.slice(0, 5).map((p, i) => ({
    ...p,
    role: i === 0 ? "Owner" : i === 1 ? "Editor" : "Viewer",
  })),
  createdAt: Date.UTC(2025, 10, 1),
  updatedAt: Date.UTC(2025, 10, 1),
};
