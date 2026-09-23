"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowDownUp, EllipsisVertical, Plus, SlidersHorizontal, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AppHeader } from "@/components/app-header";
import { Hint } from "@/components/hint";
import { TeamAvatars } from "@/components/team-avatars";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { INDUSTRY_PRACTICE_AREAS, FUNCTIONAL_PRACTICE_AREAS } from "@/lib/modules";
import { DEMO_PROPOSALS } from "@/data/demos";
import { deleteProposal, saveProposal, useHydrated, useProposals } from "@/lib/storage";
import type { Proposal } from "@/lib/types";

type Sort = "updated" | "due" | "name";

export default function HomePage() {
  const hydrated = useHydrated();
  const [proposals] = useProposals();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("updated");
  const [areas, setAreas] = useState<string[]>([]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return proposals
      .filter((p) =>
        !q ? true : [p.proposalName, p.clientName, p.opportunityId].some((f) => f.toLowerCase().includes(q)),
      )
      .filter((p) =>
        areas.length === 0 ? true : [...p.industryPracticeAreas, ...p.functionalPracticeAreas].some((a) => areas.includes(a)),
      )
      .sort((a, b) =>
        sort === "name"
          ? a.proposalName.localeCompare(b.proposalName)
          : sort === "due"
            ? (a.proposalDate || "9999").localeCompare(b.proposalDate || "9999")
            : b.updatedAt - a.updatedAt,
      );
  }, [proposals, query, sort, areas]);

  const toggleArea = (a: string) => setAreas((xs) => (xs.includes(a) ? xs.filter((x) => x !== a) : [...xs, a]));

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <section className="relative overflow-hidden bg-background bg-dots">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-12 text-center sm:py-16">
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Welcome to
            <br />
            ProposalPal
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Your one-stop AI proposal partner that unifies research, content, teaming, and commercial strategy to
            create a winning proposal.
          </p>
          <div className="mt-6 flex gap-3">
            <Button size="lg" className="h-9 w-30" nativeButton={false} render={<Link href="/new-proposal" />}>
              New Proposal
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-9 w-28 border-brand text-brand hover:text-brand"
              nativeButton={false}
              render={<Link href="/help" />}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <section className="flex-1 bg-surface px-4 py-6 sm:px-5">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <h2 className="mr-auto text-xl font-semibold">Proposals</h2>
          <Input
            placeholder="Search Proposals..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-8 w-full bg-background sm:w-50"
          />
          <DropdownMenu>
            <Hint label="Sort">
              <DropdownMenuTrigger render={<Button variant="outline" size="icon" aria-label="Sort" />}>
                <ArrowDownUp />
              </DropdownMenuTrigger>
            </Hint>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={sort} onValueChange={(v) => setSort(v as Sort)}>
                  <DropdownMenuRadioItem value="updated">Last updated</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="due">Due date</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <Hint label="Filter by practice area">
              <DropdownMenuTrigger
                render={<Button variant={areas.length ? "secondary" : "outline"} size="icon" aria-label="Filter" />}
              >
                <SlidersHorizontal />
              </DropdownMenuTrigger>
            </Hint>
            <DropdownMenuContent align="end" className="max-h-96 w-64">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Industry practice areas</DropdownMenuLabel>
                {INDUSTRY_PRACTICE_AREAS.map((a) => (
                  <DropdownMenuCheckboxItem
                    key={a.value}
                    checked={areas.includes(a.value)}
                    onCheckedChange={() => toggleArea(a.value)}
                  >
                    {a.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel>Functional practice areas</DropdownMenuLabel>
                {FUNCTIONAL_PRACTICE_AREAS.map((a) => (
                  <DropdownMenuCheckboxItem
                    key={a.value}
                    checked={areas.includes(a.value)}
                    onCheckedChange={() => toggleArea(a.value)}
                  >
                    {a.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="icon" aria-label="More options" />}>
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem
                disabled={DEMO_PROPOSALS.every((d) => proposals.some((p) => p.id === d.id))}
                onClick={() => {
                  DEMO_PROPOSALS.filter((d) => !proposals.some((p) => p.id === d.id)).forEach(saveProposal);
                  toast.success("Demo proposals restored");
                }}
              >
                Restore demo proposals
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Link
            href="/new-proposal"
            className="group flex min-h-[330px] flex-col overflow-hidden rounded-lg border-2 border-dashed border-border bg-background shadow-sm transition hover:border-brand"
          >
            <div className="flex h-[120px] items-center justify-center bg-muted/60">
              <Plus className="size-10 text-muted-foreground transition group-hover:text-brand" strokeWidth={1.5} />
            </div>
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <div className="text-lg font-semibold">New Proposal</div>
              <div className="mt-1 text-sm text-muted-foreground">Start a new proposal project</div>
            </div>
          </Link>
          {hydrated && visible.map((p) => <ProposalCard key={p.id} proposal={p} />)}
        </div>
        {hydrated && proposals.length > 0 && visible.length === 0 && (
          <p className="mt-6 text-sm text-muted-foreground">No proposals match your search.</p>
        )}
      </section>
    </div>
  );
}

function ProposalCard({ proposal: p }: { proposal: Proposal }) {
  return (
    <div className="group relative flex min-h-[330px] flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition hover:shadow-md">
      <Link href={`/proposal/${p.id}/setup`} className="flex flex-1 flex-col">
        <div className="h-[120px] bg-dots" />
        <div className="flex flex-1 flex-col p-5">
          <h3 className="line-clamp-3 text-lg font-semibold leading-snug">{p.proposalName}</h3>
          <p className="mt-3 text-sm text-muted-foreground">{p.clientName}</p>
          <p className="mt-2 text-sm text-muted-foreground">{p.opportunityId}</p>
          <div className="mt-auto pt-4">
            <TeamAvatars people={p.teamMembers} />
          </div>
        </div>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute right-2 top-2 opacity-0 transition group-hover:opacity-100 data-[popup-open]:opacity-100"
              aria-label="Proposal options"
            />
          }
        >
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem render={<Link href={`/proposal/${p.id}/dashboard`} />}>Open workspace</DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => {
              if (confirm(`Delete "${p.proposalName}"? This removes it and its generated content from this browser.`)) {
                deleteProposal(p.id);
                toast.success("Proposal deleted");
              }
            }}
          >
            <Trash2 /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
