"use client";

import { useState } from "react";
import { AppHeader } from "@/components/app-header";
import { emptyProposal, ProposalSetup } from "@/components/proposal-setup";

export default function NewProposalPage() {
  const [initial] = useState(emptyProposal);
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <ProposalSetup initial={initial} isNew />
    </div>
  );
}
