"use client";

import { Bookmark, ChevronDown, Database, FolderOpen, History, Plus, RefreshCw, Settings, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FUNCTIONAL_PRACTICE_AREAS, INDUSTRY_PRACTICE_AREAS, MODULE_MAP, MODULES } from "@/lib/modules";
import { readModuleContent, useChats, useStored } from "@/lib/storage";
import type { Proposal } from "@/lib/types";
import { cn } from "@/lib/utils";
import { downloadText, moduleMarkdown, slug, useWorkspace } from "./workspace-context";

export const DARK_CHAT_KEY = "pp:darkChat";

export function fullProposalMarkdown(p: Proposal) {
  const label = (codes: string[], list: { value: string; label: string }[]) =>
    codes.map((c) => list.find((a) => a.value === c)?.label ?? c).join(", ") || "—";
  const header = [
    `# ${p.proposalName}`,
    `**Client:** ${p.clientName}  \n**Opportunity ID:** ${p.opportunityId}  \n**Due date:** ${p.proposalDate || "—"}`,
    `**Industry practice areas:** ${label(p.industryPracticeAreas, INDUSTRY_PRACTICE_AREAS)}  \n**Functional practice areas:** ${label(p.functionalPracticeAreas, FUNCTIONAL_PRACTICE_AREAS)}`,
    p.proposalContext && `## Proposal Context\n\n${p.proposalContext}`,
    p.proposalDescription && `## Proposal Description\n\n${p.proposalDescription}`,
    p.competitiveLandscape && `## Competitive Landscape\n\n${p.competitiveLandscape}`,
  ].filter(Boolean);
  const modules = MODULES.map((m) => moduleMarkdown(m.id, readModuleContent(p.id, m.id))).filter(Boolean);
  return [...header, ...modules].join("\n\n");
}

export function Toolbar() {
  const { proposal, selected, select, leftPanel, setLeftPanel, showBookmarks, setShowBookmarks, setThreadId, threadId, generate, isRunning, clear } =
    useWorkspace();
  const [threads, setThreads] = useChats(proposal.id);
  const [darkChat, setDarkChat] = useStored<boolean>(DARK_CHAT_KEY, true);
  const mod = selected === "overview" ? null : MODULE_MAP[selected];
  const canRegenerate = mod && mod.kind !== "polish" && !isRunning(mod.id);

  return (
    <div className="no-print flex h-[52px] shrink-0 items-center gap-1 border-b bg-background px-3">
      <Hint label="Toggle data sources sidebar">
        <Button variant="ghost" className={cn(leftPanel === "sources" && "bg-muted")} onClick={() => setLeftPanel(leftPanel === "sources" ? null : "sources")}>
          <Database /> Data Sources
        </Button>
      </Hint>
      <span className="mx-1 h-5 w-px bg-border" />
      <Hint label="Start a new chat conversation">
        <Button variant="ghost" size="icon" onClick={() => setThreadId(null)} aria-label="New chat">
          <Plus />
        </Button>
      </Hint>
      <Popover>
        <Hint label="View your previous chat conversations">
          <PopoverTrigger render={<Button variant="ghost" size="icon" aria-label="Chat history" />}>
            <History />
          </PopoverTrigger>
        </Hint>
        <PopoverContent align="start" className="w-80 p-2">
          <div className="px-2 pb-2 pt-1 text-sm font-semibold">Chat History</div>
          {threads.length === 0 ? (
            <p className="px-2 pb-2 text-sm text-muted-foreground">No chat history yet. Start a new chat!</p>
          ) : (
            <ul className="max-h-80 overflow-y-auto">
              {threads.map((t) => (
                <li key={t.id} className={cn("group flex items-center gap-1 rounded-md hover:bg-muted", t.id === threadId && "bg-muted")}>
                  <button
                    className="min-w-0 flex-1 px-2 py-1.5 text-left"
                    onClick={() => {
                      setThreadId(t.id);
                      select(t.moduleId);
                    }}
                  >
                    <div className="truncate text-sm">{t.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.moduleId === "overview" ? "Overview" : MODULE_MAP[t.moduleId].title} · {new Date(t.updatedAt).toLocaleDateString()}
                    </div>
                  </button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="opacity-0 group-hover:opacity-100"
                    aria-label="Delete chat"
                    onClick={() => {
                      setThreads((all) => all.filter((x) => x.id !== t.id));
                      if (t.id === threadId) setThreadId(null);
                    }}
                  >
                    <Trash2 />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </PopoverContent>
      </Popover>
      <Hint label="View proposal overview">
        <Button
          variant="ghost"
          className={cn("ml-1", selected === "overview" && "bg-accent text-accent-foreground")}
          onClick={() => select("overview")}
        >
          <FolderOpen /> Proposal Overview
        </Button>
      </Hint>

      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" disabled={!canRegenerate} onClick={() => mod && generate(mod.id)}>
          <RefreshCw className={mod && isRunning(mod.id) ? "animate-spin" : ""} /> Regenerate
        </Button>
        <Hint label="Toggle bookmarks panel">
          <Button variant="ghost" className={cn(showBookmarks && "bg-muted")} onClick={() => setShowBookmarks(!showBookmarks)}>
            <Bookmark /> Bookmarks
          </Button>
        </Hint>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" />}>
            Export <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem
              disabled={!mod || !readModuleContent(proposal.id, mod.id)}
              onClick={() =>
                mod && downloadText(`${slug(proposal.proposalName)}_${slug(mod.title)}.md`, moduleMarkdown(mod.id, readModuleContent(proposal.id, mod.id)))
              }
            >
              Export {mod ? mod.title : "module"} (.md)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadText(`${slug(proposal.proposalName)}.md`, fullProposalMarkdown(proposal))}>
              Export proposal (.md)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.open(`/proposal/${proposal.id}/print`, "_blank")}>
              Print / Save as PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="Settings" />}>
            <Settings />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuCheckboxItem checked={darkChat} onCheckedChange={(v) => setDarkChat(!!v)}>
              Dark chat panel
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                if (!confirm("Clear all generated module content for this proposal?")) return;
                MODULES.forEach((m) => clear(m.id));
                toast.success("Generated content cleared");
              }}
            >
              Clear all generated content
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
