"use client";

import { use } from "react";
import { AppHeader } from "@/components/app-header";
import { NotFound } from "@/components/not-found";
import { ProposalSetup } from "@/components/proposal-setup";
import { saveProposal, useHydrated, useProposal } from "@/lib/storage";

export default function SetupPage({ params }: PageProps<"/proposal/[id]/setup">) {
  const { id } = use(params);
  const hydrated = useHydrated();
  const [proposal] = useProposal(id);

  if (!hydrated) return <AppHeader />;
  if (!proposal) return <NotFound />;
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader crumbs={[{ label: `${proposal.clientName} - ${proposal.proposalName} - ${proposal.opportunityId}` }]} />
      <ProposalSetup key={proposal.id} initial={proposal} isNew={false} onChange={saveProposal} />
    </div>
  );
}
