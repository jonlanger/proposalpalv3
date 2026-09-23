import type { DemoProposal } from "../types";
import { FORD } from "./ford";
import { JPMORGAN } from "./jpmorgan";
import { PFIZER } from "./pfizer";
import { SEVEN_ELEVEN } from "./seven-eleven";
import { WALMART } from "./walmart";

/** Pre-filled demo proposals, shown on first visit, with content for all 8 modules. */
export const DEMOS: DemoProposal[] = [SEVEN_ELEVEN, WALMART, FORD, PFIZER, JPMORGAN];

export const DEMO_PROPOSALS = DEMOS.map((d) => d.proposal);

export function demoContent(proposalId: string) {
  return DEMOS.find((d) => d.proposal.id === proposalId)?.content;
}
