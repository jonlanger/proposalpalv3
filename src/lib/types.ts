export type TeamRole = "Owner" | "Editor" | "Viewer";

export interface Person {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatar?: string;
  title?: string;
  role: TeamRole;
}

export type FileCategory = "Client Context" | "Past Proposal" | "BCG IP" | "Other";

export interface UploadedDoc {
  name: string;
  type: FileCategory;
  /** Extracted plain text (truncated), used as AI context. */
  text?: string;
}

export interface Proposal {
  id: string;
  opportunityId: string;
  clientName: string;
  proposalName: string;
  proposalContext: string;
  rfp?: UploadedDoc;
  draftProposal?: UploadedDoc;
  industryPracticeAreas: string[];
  functionalPracticeAreas: string[];
  proposalDate: string;
  proposalDescription: string;
  competitiveLandscape: string;
  topicExpert: string;
  uploadedFiles: UploadedDoc[];
  teamMembers: Person[];
  createdAt: number;
  updatedAt: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
}

export interface ChatThread {
  id: string;
  title: string;
  moduleId: ModuleId | "overview";
  messages: ChatMessage[];
  updatedAt: number;
}

export interface Bookmark {
  id: string;
  text: string;
  moduleId: ModuleId | "overview";
  /** "section" = a whole module section; "selection" = highlighted text; "chat" = an assistant reply. */
  source?: "section" | "selection" | "chat";
  sectionId?: string;
  sectionTitle?: string;
  /** Feeds the Storyline & Proposal module (default true). */
  includeInStoryline?: boolean;
  createdAt: number;
}

export interface DataSource {
  id: string;
  fileName: string;
  type: FileCategory;
  description: string;
}

export type ModuleId =
  | "client-research"
  | "client-engagement"
  | "team-formation"
  | "topic-research"
  | "storyline"
  | "commercial"
  | "polish-proposal"
  | "practice-pitch";

export interface Slide {
  title: string;
  bullets: string[];
}

export interface StorylineSection {
  name: string;
  slides: Slide[];
}

export interface SuggestedTeamMember {
  name: string;
  title: string;
  office: string;
  matchScore: number;
  industryExpertise: string[];
  individualCapabilities: string[];
  pastProjects: string[];
}

export interface TeamFormationResult {
  summary: string;
  teamMembers: SuggestedTeamMember[];
  suggestedRoles: string[];
  potentialGaps: string[];
  capabilityInsights: string;
}

export interface PolishAnalysis {
  overallAssessment: string;
  score: number;
  sections: {
    name: string;
    strengths: string[];
    gaps: string[];
    rewrites: { before: string; after: string }[];
  }[];
}

/** What is stored per module. Section modules store markdown keyed by section id. */
export interface ModuleContent {
  sections?: Record<string, string>;
  storyline?: StorylineSection[];
  team?: TeamFormationResult;
  polish?: PolishAnalysis;
  /** Bookmarks that fed this content (storyline), to detect new ones since. */
  bookmarkIds?: string[];
  generatedAt: number;
}
