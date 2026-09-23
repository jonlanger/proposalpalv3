"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Database, Download, FileText, Loader2, Minus, Plus, RefreshCw, X } from "lucide-react";
import { toast } from "sonner";
import { forAI } from "@/components/proposal-setup";
import { Hint } from "@/components/hint";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MODULE_IDS, MODULES } from "@/lib/modules";
import { keys, read, useAllModuleContent, useSources } from "@/lib/storage";
import type { DataSource } from "@/lib/types";
import { downloadText, moduleMarkdown, slug, useWorkspace } from "./workspace-context";

function PanelHeader({ title, onClose, children }: { title: string; onClose: () => void; children?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 px-3 pb-2 pt-3">
      <h2 className="flex-1 text-sm font-semibold">{title}</h2>
      {children}
      <Button variant="ghost" size="icon-xs" onClick={onClose} aria-label="Close panel" className="text-brand max-lg:hidden">
        <X />
      </Button>
    </div>
  );
}

function Empty({ icon: Icon, title, hint, children }: { icon: typeof Database; title: string; hint: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-4 py-8 text-center">
      <span className="flex size-10 items-center justify-center rounded-full bg-muted">
        <Icon className="size-5 text-muted-foreground" />
      </span>
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-muted-foreground">{hint}</div>
      {children}
    </div>
  );
}

export function DataSourcesPanel() {
  const { proposal, setLeftPanel } = useWorkspace();
  const [sources, setSources] = useSources(proposal.id);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  async function pull() {
    setLoading(true);
    try {
      const res = await fetch("/api/sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposal: forAI(proposal) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to pull sources");
      setSources((s) => ({ ...s, available: data.sources }));
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  // Pull suggestions automatically the first time the workspace opens.
  useEffect(() => {
    const s = read(keys.sources(proposal.id), { available: [], added: [] } as { available: DataSource[]; added: DataSource[] });
    if (s.available.length || s.added.length) return;
    const t = setTimeout(pull, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposal.id]);

  const match = (s: DataSource) => !q || `${s.fileName} ${s.description}`.toLowerCase().includes(q.toLowerCase());
  const add = (s: DataSource) =>
    setSources((cur) => ({ available: cur.available.filter((x) => x.id !== s.id), added: [...cur.added, s] }));
  const remove = (s: DataSource) =>
    setSources((cur) => ({ added: cur.added.filter((x) => x.id !== s.id), available: [s, ...cur.available] }));

  return (
    <div className="flex h-full flex-col">
      <PanelHeader title="Global Data Sources" onClose={() => setLeftPanel(null)}>
        <Hint label="Regenerate data sources">
          <Button variant="ghost" size="icon-xs" onClick={pull} disabled={loading} aria-label="Regenerate data sources">
            <RefreshCw className={loading ? "animate-spin" : ""} />
          </Button>
        </Hint>
      </PanelHeader>
      <div className="border-b px-3 pb-3">
        <Input placeholder="Search sources..." value={q} onChange={(e) => setQ(e.target.value)} className="h-8" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        <section className="border-b">
          <div className="flex items-center justify-between px-3 py-3 text-sm font-semibold">
            Added Sources <span className="text-xs font-normal text-muted-foreground">{sources.added.length}</span>
          </div>
          {sources.added.length === 0 ? (
            <Empty icon={Database} title="No Sources Added Yet" hint="Add sources from available files below" />
          ) : (
            <ul className="space-y-1 px-2 pb-3">
              {sources.added.filter(match).map((s) => (
                <SourceRow key={s.id} source={s} action={<Minus />} actionLabel="Remove source" onAction={() => remove(s)} />
              ))}
            </ul>
          )}
        </section>
        <section>
          <div className="flex items-center justify-between px-3 py-3 text-sm font-semibold">
            Available Sources <span className="text-xs font-normal text-muted-foreground">{sources.available.length}</span>
          </div>
          {sources.available.length === 0 ? (
            <Empty icon={FileText} title="No sources available" hint="Generate relevant data sources for your proposal">
              <Button
                variant="outline"
                size="sm"
                className="mt-2 border-brand-bright text-brand-bright hover:text-brand-bright"
                onClick={pull}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : <RefreshCw />}
                {loading ? "Pulling Relevant Sources..." : "Pull Relevant Sources"}
              </Button>
            </Empty>
          ) : (
            <ul className="space-y-1 px-2 pb-3">
              {sources.available.filter(match).map((s) => (
                <SourceRow key={s.id} source={s} action={<Plus />} actionLabel="Add source" onAction={() => add(s)} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

function SourceRow({
  source: s,
  action,
  actionLabel,
  onAction,
}: {
  source: DataSource;
  action: React.ReactNode;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <li className="group flex items-start gap-2 rounded-md p-2 hover:bg-muted">
      <FileText className="mt-0.5 size-4 shrink-0 text-brand" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm">{s.fileName}</div>
        <div className="line-clamp-2 text-xs text-muted-foreground">{s.description}</div>
        <Badge variant="secondary" className="mt-1 text-[10px]">
          {s.type}
        </Badge>
      </div>
      <Hint label={actionLabel}>
        <Button variant="ghost" size="icon-xs" onClick={onAction} aria-label={actionLabel}>
          {action}
        </Button>
      </Hint>
    </li>
  );
}

export function GeneratedFilesPanel() {
  const { proposal, setLeftPanel } = useWorkspace();
  return (
    <div className="flex h-full flex-col">
      <PanelHeader title="Generated Files and Exports" onClose={() => setLeftPanel(null)} />
      <GeneratedFilesList pid={proposal.id} proposalName={proposal.proposalName} />
    </div>
  );
}

function GeneratedFilesList({ pid, proposalName }: { pid: string; proposalName: string }) {
  const all = useAllModuleContent(pid, MODULE_IDS);
  const entries = MODULES.filter((m) => all[m.id]).map((m) => ({ m, c: all[m.id]! }));

  if (!entries.length) {
    return <Empty icon={FileText} title="No generated files yet" hint="Files will appear here as modules generate content" />;
  }
  return (
    <ul className="space-y-1 overflow-y-auto px-2">
      {entries.map(({ m, c }) => (
        <li key={m.id} className="flex items-center gap-2 rounded-md p-2 hover:bg-muted">
          <FileText className="size-4 shrink-0 text-brand" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm">{`${slug(m.title)}.md`}</div>
            <div className="text-xs text-muted-foreground">{new Date(c.generatedAt).toLocaleString()}</div>
          </div>
          <Hint label="Download">
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label={`Download ${m.title}`}
              onClick={() => downloadText(`${slug(proposalName)}_${slug(m.title)}.md`, moduleMarkdown(m.id, c))}
            >
              <Download />
            </Button>
          </Hint>
        </li>
      ))}
    </ul>
  );
}

export function SystemTasksPanel() {
  const { tasks, setLeftPanel, generate } = useWorkspace();
  return (
    <div className="flex h-full flex-col">
      <PanelHeader title="System Tasks" onClose={() => setLeftPanel(null)} />
      {tasks.length === 0 ? (
        <Empty icon={Loader2} title="No system tasks running" hint="Tasks will appear here when modules are generating content" />
      ) : (
        <ul className="space-y-1 px-2">
          {tasks.map((t) => (
            <li key={t.key} className="flex items-start gap-2 rounded-md p-2 text-sm">
              {t.status === "running" ? (
                <Loader2 className="mt-0.5 size-4 shrink-0 animate-spin text-brand-bright" />
              ) : (
                <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
              )}
              <div className="min-w-0 flex-1">
                <div className="truncate">{t.label}</div>
                <div className="text-xs text-muted-foreground">{t.status === "running" ? "Generating…" : t.error}</div>
              </div>
              {t.status === "error" && !t.key.includes(":") && (
                <Button variant="ghost" size="icon-xs" aria-label="Retry" onClick={() => generate(t.key as never)}>
                  <RefreshCw />
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
