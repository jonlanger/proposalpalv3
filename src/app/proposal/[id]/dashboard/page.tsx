"use client";

import { use, useEffect } from "react";
import { Database, FileText, Layers } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { Hint } from "@/components/hint";
import { NotFound } from "@/components/not-found";
import { Button } from "@/components/ui/button";
import { BookmarksPanel } from "@/components/workspace/bookmarks-panel";
import { ChatPanel } from "@/components/workspace/chat-panel";
import { DataSourcesPanel, GeneratedFilesPanel, SystemTasksPanel } from "@/components/workspace/left-panels";
import { ModulePanel } from "@/components/workspace/module-panel";
import { DARK_CHAT_KEY, Toolbar } from "@/components/workspace/toolbar";
import { useWorkspace, WorkspaceProvider, type LeftPanel } from "@/components/workspace/workspace-context";
import { isDemoProposal, keys, seedDemoContent, useHydrated, useProposal, useStored } from "@/lib/storage";
import { cn } from "@/lib/utils";

export default function DashboardPage({ params }: PageProps<"/proposal/[id]/dashboard">) {
  const { id } = use(params);
  const hydrated = useHydrated();
  const [proposal] = useProposal(id);
  // Demo proposals open with pre-filled modules; wait for them so modules don't auto-generate first.
  const [seeded] = useStored<boolean>(keys.seeded(id), false);
  const ready = seeded || !isDemoProposal(id);
  useEffect(() => seedDemoContent(id), [id]);

  if (!hydrated || !ready) return <AppHeader />;
  if (!proposal) return <NotFound />;
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <AppHeader
        crumbs={[
          { label: "Details", href: `/proposal/${proposal.id}/setup`, icon: "details" },
          { label: `${proposal.clientName} - ${proposal.proposalName} - ${proposal.opportunityId}` },
        ]}
      />
      <WorkspaceProvider proposal={proposal}>
        <Toolbar />
        <Workspace />
      </WorkspaceProvider>
    </div>
  );
}

const RAIL: { id: Exclude<LeftPanel, null>; label: string; icon: typeof Database }[] = [
  { id: "files", label: "Generated files and exports", icon: FileText },
  { id: "sources", label: "Data sources", icon: Database },
  { id: "tasks", label: "System tasks", icon: Layers },
];

function Workspace() {
  const { selected, leftPanel, setLeftPanel, showBookmarks, tasks } = useWorkspace();
  const [darkChat] = useStored<boolean>(DARK_CHAT_KEY, true);
  const hasModule = selected !== "overview";
  const running = tasks.some((t) => t.status === "running");

  return (
    <div className="flex min-h-0 flex-1">
      <div className={cn("flex min-h-0 bg-background text-foreground", darkChat && "dark", hasModule || showBookmarks ? "" : "flex-1")}>
        {/* Icon rail */}
        <nav className="flex w-12 shrink-0 flex-col items-center gap-2 border-r py-3">
          {RAIL.map((r) => (
            <Hint key={r.id} label={r.label} side="right">
              <Button
                variant="ghost"
                size="icon"
                aria-label={r.label}
                className={cn("relative text-brand-bright", leftPanel === r.id && "bg-muted")}
                onClick={() => setLeftPanel(leftPanel === r.id ? null : r.id)}
              >
                <r.icon />
                {r.id === "tasks" && running && <span className="absolute right-1 top-1 size-2 animate-pulse rounded-full bg-brand-bright" />}
              </Button>
            </Hint>
          ))}
        </nav>
        {leftPanel && (
          <aside className="w-[320px] shrink-0 border-r xl:w-[380px]">
            {leftPanel === "sources" && <DataSourcesPanel />}
            {leftPanel === "files" && <GeneratedFilesPanel />}
            {leftPanel === "tasks" && <SystemTasksPanel />}
          </aside>
        )}
        <main className={cn("min-w-0 border-r", hasModule || showBookmarks ? "w-[440px] shrink-0 xl:w-[500px]" : "flex-1")}>
          <ChatPanel />
        </main>
      </div>
      {hasModule && (
        <section className="min-w-0 flex-1 bg-surface">
          <ModulePanel key={selected} moduleId={selected} />
        </section>
      )}
      {showBookmarks && (
        <aside className={cn("w-80 shrink-0 border-l bg-background", !hasModule && "flex-1")}>
          <BookmarksPanel />
        </aside>
      )}
    </div>
  );
}
