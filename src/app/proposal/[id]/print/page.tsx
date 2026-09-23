"use client";

import { use, useEffect } from "react";
import { Markdown } from "@/components/markdown";
import { NotFound } from "@/components/not-found";
import { fullProposalMarkdown } from "@/components/workspace/toolbar";
import { useHydrated, useProposal } from "@/lib/storage";

/** Printable view of the whole proposal; opens the browser print dialog (Save as PDF). */
export default function PrintPage({ params }: PageProps<"/proposal/[id]/print">) {
  const { id } = use(params);
  const hydrated = useHydrated();
  const [proposal] = useProposal(id);

  useEffect(() => {
    if (hydrated && proposal) setTimeout(() => window.print(), 300);
  }, [hydrated, proposal]);

  if (!hydrated) return null;
  if (!proposal) return <NotFound />;
  return (
    <main className="mx-auto max-w-3xl bg-white p-10 text-black">
      <Markdown className="text-[13px] [&_h2]:mt-8 [&_h2]:border-b [&_h2]:pb-1 [&_h3]:mt-5">{fullProposalMarkdown(proposal)}</Markdown>
    </main>
  );
}
