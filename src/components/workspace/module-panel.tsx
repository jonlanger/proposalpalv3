"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  Bookmark as BookmarkIcon,
  ChevronDown,
  Copy,
  Download,
  Loader2,
  RefreshCw,
  Sparkles,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { DocChip, FileDrop } from "@/components/file-drop";
import { Hint } from "@/components/hint";
import { Markdown } from "@/components/markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MODULE_MAP, type ModuleDef } from "@/lib/modules";
import { PEOPLE_DIRECTORY } from "@/lib/seed";
import { uid, useBookmarks, useModuleContent } from "@/lib/storage";
import type { ModuleContent, ModuleId, UploadedDoc } from "@/lib/types";
import { cn } from "@/lib/utils";
import { downloadText, moduleMarkdown, slug, useWorkspace } from "./workspace-context";

export function ModulePanel({ moduleId }: { moduleId: ModuleId }) {
  const { proposal, generate, isRunning, errorFor, clear } = useWorkspace();
  const mod = MODULE_MAP[moduleId];
  const [content] = useModuleContent(proposal.id, moduleId);
  const running = isRunning(moduleId);
  const error = errorFor(moduleId);
  const needsInput = mod.kind === "polish";

  // Generate automatically the first time a module is opened, like the original app.
  useEffect(() => {
    if (!content && !running && !error && !needsInput) generate(moduleId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId]);

  return (
    <BookmarkableArea moduleId={moduleId}>
      <div className="flex items-center gap-2 border-b bg-background/80 px-5 py-3 backdrop-blur">
        <h2 className="flex-1 truncate font-semibold">{mod.title}</h2>
        {content && (
          <>
            <Hint label={`Export ${mod.title.toLowerCase()}`}>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Export module"
                onClick={() =>
                  downloadText(`${slug(proposal.proposalName)}_${slug(mod.title)}.md`, moduleMarkdown(moduleId, content))
                }
              >
                <Download />
              </Button>
            </Hint>
            <Hint label="Clear analysis">
              <Button variant="ghost" size="icon-sm" aria-label="Clear analysis" onClick={() => clear(moduleId)} disabled={running}>
                <Trash2 />
              </Button>
            </Hint>
          </>
        )}
        {!needsInput && (
          <Hint label={`Regenerate ${mod.title.toLowerCase()} content`}>
            <Button variant="outline" size="sm" onClick={() => generate(moduleId)} disabled={running}>
              <RefreshCw className={running ? "animate-spin" : ""} /> Regenerate
            </Button>
          </Hint>
        )}
      </div>

      <div className="space-y-3 p-5">
        {error && !running && (
          <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
            <div className="flex-1">
              <div className="font-medium">Generation Failed</div>
              <div className="text-muted-foreground">{error}</div>
            </div>
            <Button size="sm" variant="outline" onClick={() => generate(moduleId)}>
              Retry
            </Button>
          </div>
        )}
        {mod.dependsOn && running && !content && (
          <p className="text-sm text-muted-foreground">
            Generating storyline content… (Client Research runs first so the storyline can build on it.)
          </p>
        )}
        {mod.kind === "sections" && <SectionsView mod={mod} content={content} running={running} />}
        {mod.kind === "storyline" && <StorylineView mod={mod} content={content} running={running} />}
        {mod.kind === "team" && <TeamView content={content} running={running} />}
        {mod.kind === "polish" && <PolishView content={content} running={running} />}
      </div>
    </BookmarkableArea>
  );
}

// ---- Bookmarking --------------------------------------------------------------

function BookmarkableArea({ moduleId, children }: { moduleId: ModuleId; children: React.ReactNode }) {
  const { proposal } = useWorkspace();
  const [, setBookmarks] = useBookmarks(proposal.id);
  const [pending, setPending] = useState<{ text: string; x: number; y: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="relative h-full overflow-y-auto"
      onMouseUp={(e) => {
        const text = window.getSelection()?.toString().trim() ?? "";
        const box = ref.current!.getBoundingClientRect();
        setPending(text.length > 8 ? { text, x: e.clientX - box.left, y: e.clientY - box.top + ref.current!.scrollTop } : null);
      }}
    >
      {children}
      {pending && (
        <Button
          size="sm"
          className="absolute z-20 shadow-lg"
          style={{ left: Math.max(8, pending.x - 50), top: pending.y + 12 }}
          onMouseDown={(e) => e.preventDefault()}
          onMouseUp={(e) => e.stopPropagation()}
          onClick={() => {
            setBookmarks((b) => [{ id: uid(), text: pending.text, moduleId, createdAt: Date.now() }, ...b]);
            window.getSelection()?.removeAllRanges();
            setPending(null);
            toast.success("Bookmark added");
          }}
        >
          <BookmarkIcon /> Bookmark
        </Button>
      )}
    </div>
  );
}

// ---- Shared pieces ------------------------------------------------------------

function Collapsible({
  title,
  loading,
  defaultOpen,
  actions,
  children,
}: {
  title: string;
  loading?: boolean;
  defaultOpen?: boolean;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className={cn("rounded-lg border bg-card shadow-sm transition", loading && "bg-accent/30")}>
      <div className="flex items-center gap-2 px-4 py-3.5">
        <button className="flex flex-1 items-center gap-2 text-left" onClick={() => setOpen(!open)} aria-expanded={open}>
          <span className="font-semibold">{title}</span>
          {loading && <Loader2 className="size-4 animate-spin text-muted-foreground" />}
        </button>
        {actions}
        <button onClick={() => setOpen(!open)} aria-label={open ? "Collapse" : "Expand"} className="text-muted-foreground">
          <ChevronDown className={cn("size-4 transition", open && "rotate-180")} />
        </button>
      </div>
      {open && <div className="border-t px-4 py-4">{children}</div>}
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  return (
    <Hint label="Copy">
      <Button
        variant="ghost"
        size="icon-xs"
        aria-label="Copy"
        onClick={() => navigator.clipboard.writeText(text).then(() => toast.success("Copied"))}
      >
        <Copy />
      </Button>
    </Hint>
  );
}

// ---- Section modules ------------------------------------------------------------

function SectionsView({ mod, content, running }: { mod: ModuleDef; content: ModuleContent | null; running: boolean }) {
  const { generate, isRunning } = useWorkspace();
  return (
    <>
      {mod.sections.map((s, i) => {
        const text = content?.sections?.[s.id];
        const sectionRunning = isRunning(mod.id, s.id);
        return (
          <Collapsible
            key={s.id}
            title={s.title}
            loading={(running && !text) || sectionRunning}
            defaultOpen={i === 0}
            actions={
              text && (
                <>
                  <CopyButton text={text} />
                  <Hint label="Regenerate section">
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      aria-label={`Regenerate ${s.title}`}
                      disabled={sectionRunning || running}
                      onClick={() => generate(mod.id, { sectionId: s.id })}
                    >
                      <RefreshCw className={sectionRunning ? "animate-spin" : ""} />
                    </Button>
                  </Hint>
                </>
              )
            }
          >
            {text ? (
              <Markdown>{text}</Markdown>
            ) : (
              <p className="text-sm text-muted-foreground">{running ? "Content will load automatically" : "Not generated yet."}</p>
            )}
          </Collapsible>
        );
      })}
    </>
  );
}

// ---- Storyline ------------------------------------------------------------------

function StorylineView({ mod, content, running }: { mod: ModuleDef; content: ModuleContent | null; running: boolean }) {
  const { generate, isRunning } = useWorkspace();
  const storyline = content?.storyline;
  if (!storyline) {
    return (
      <>
        {mod.sections.map((s) => (
          <Collapsible key={s.id} title={s.title} loading={running}>
            <p className="text-sm text-muted-foreground">
              {running ? "Generating storyline content..." : "Run Client Research first, then generate storyline content"}
            </p>
          </Collapsible>
        ))}
      </>
    );
  }
  return (
    <>
      {storyline.map((section, si) => (
        <Collapsible key={section.name} title={section.name} defaultOpen={si === 0}>
          <ol className="space-y-3">
            {section.slides.map((slide, sj) => {
              const busy = isRunning(mod.id, `slide-${si}-${sj}`);
              return (
                <li key={sj} className={cn("rounded-md border bg-background p-4", busy && "opacity-60")}>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded bg-brand text-xs font-semibold text-white">
                      {sj + 1}
                    </span>
                    <h4 className="flex-1 text-sm font-semibold leading-snug">{slide.title}</h4>
                    <Hint label="Regenerate slide">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        aria-label="Regenerate slide"
                        disabled={busy}
                        onClick={() => generate(mod.id, { slide: { sectionIndex: si, slideIndex: sj } })}
                      >
                        <RefreshCw className={busy ? "animate-spin" : ""} />
                      </Button>
                    </Hint>
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-14 text-sm">
                    {slide.bullets.map((b, k) => (
                      <li key={k}>{b}</li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
        </Collapsible>
      ))}
    </>
  );
}

// ---- Team formation ------------------------------------------------------------

function TeamView({ content, running }: { content: ModuleContent | null; running: boolean }) {
  const team = content?.team;
  if (!team) return <LoadingCards running={running} count={3} />;
  return (
    <>
      {team.summary && (
        <div className="rounded-lg border bg-card p-4">
          <Markdown>{team.summary}</Markdown>
        </div>
      )}
      <div className="grid gap-3 xl:grid-cols-2">
        {team.teamMembers.map((m) => {
          const person = PEOPLE_DIRECTORY.find((p) => p.name === m.name);
          return (
            <div key={m.name} className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarImage src={person?.avatar} alt={m.name} />
                  <AvatarFallback>{m.name.split(" ").map((x) => x[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{m.name}</div>
                  <div className="truncate text-xs text-muted-foreground">
                    {m.title} · {m.office}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-brand">{m.matchScore}%</div>
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">match</div>
                </div>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-brand" style={{ width: `${m.matchScore}%` }} />
              </div>
              <Labeled label="Industry & Functional Expertise" items={m.industryExpertise} />
              <Labeled label="Individual Capabilities" items={m.individualCapabilities} />
              {m.pastProjects.length > 0 && (
                <div className="mt-3">
                  <div className="mb-1 text-xs font-medium text-muted-foreground">Past Projects</div>
                  <ul className="list-disc space-y-0.5 pl-4 text-xs">
                    {m.pastProjects.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Collapsible title="Suggested Roles" defaultOpen>
        <Bullets items={team.suggestedRoles} />
      </Collapsible>
      <Collapsible title="Potential Gaps" defaultOpen>
        <Bullets items={team.potentialGaps} />
      </Collapsible>
      {team.capabilityInsights && (
        <Collapsible title="Capability Insights">
          <Markdown>{team.capabilityInsights}</Markdown>
        </Collapsible>
      )}
    </>
  );
}

function Labeled({ label, items }: { label: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="mt-3">
      <div className="mb-1 text-xs font-medium text-muted-foreground">{label}</div>
      <div className="flex flex-wrap gap-1">
        {items.map((x) => (
          <Badge key={x} variant="secondary" className="text-[11px]">
            {x}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  if (!items.length) return <p className="text-sm text-muted-foreground">None identified.</p>;
  return (
    <ul className="space-y-2 text-sm">
      {items.map((x, i) => (
        <li key={i} className="flex gap-2">
          <span className="text-brand">•</span>
          <span className="flex-1">{x}</span>
        </li>
      ))}
    </ul>
  );
}

function LoadingCards({ running, count }: { running: boolean; count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex h-20 items-center gap-3 rounded-lg border bg-card px-4">
          {running ? <Loader2 className="size-4 animate-spin text-muted-foreground" /> : null}
          <span className="text-sm text-muted-foreground">{running ? "Queued for generation..." : "Not generated yet."}</span>
        </div>
      ))}
    </>
  );
}

// ---- Polish proposal -------------------------------------------------------------

function PolishView({ content, running }: { content: ModuleContent | null; running: boolean }) {
  const { proposal, generate } = useWorkspace();
  const [doc, setDoc] = useState<UploadedDoc | undefined>(proposal.draftProposal?.text ? proposal.draftProposal : undefined);
  const [pasted, setPasted] = useState("");
  const draft = pasted.trim() || doc?.text || "";
  const polish = content?.polish;

  const input = (
    <div className="space-y-3 rounded-lg border bg-card p-4">
      <div>
        <div className="font-semibold">Review a draft</div>
        <p className="text-sm text-muted-foreground">
          Upload a proposal (PDF, DOCX or text) or paste it below. You can also attach a file in the chat.
        </p>
      </div>
      {doc ? (
        <DocChip doc={doc} onRemove={() => setDoc(undefined)} />
      ) : (
        <FileDrop type="Past Proposal" onFiles={([d]) => setDoc(d)} />
      )}
      <Textarea rows={5} placeholder="…or paste the draft text here" value={pasted} onChange={(e) => setPasted(e.target.value)} />
      <Button disabled={!draft || running} onClick={() => generate("polish-proposal", { draft })}>
        {running ? <Loader2 className="animate-spin" /> : <Sparkles />}
        {running ? "Analyzing…" : "Analyze proposal"}
      </Button>
      {doc && !doc.text && <p className="text-xs text-destructive">No text could be read from this file. Try PDF or DOCX, or paste the text.</p>}
    </div>
  );

  if (!polish) return input;

  return (
    <>
      <div className="rounded-lg border bg-card p-4">
        <div className="mb-2 flex items-center gap-3">
          <div className="text-3xl font-bold text-brand">{polish.score}</div>
          <div className="text-sm text-muted-foreground">/ 100 overall</div>
        </div>
        <Markdown>{polish.overallAssessment}</Markdown>
      </div>
      {polish.sections.map((s, i) => (
        <Collapsible key={i} title={s.name} defaultOpen={i === 0}>
          <div className="space-y-4 text-sm">
            <div>
              <div className="mb-1 font-medium text-brand">Strengths</div>
              <Bullets items={s.strengths} />
            </div>
            <div>
              <div className="mb-1 font-medium text-destructive">Gaps / Issues</div>
              <Bullets items={s.gaps} />
            </div>
            {s.rewrites.length > 0 && (
              <div>
                <div className="mb-2 font-medium">Suggested Rewrites</div>
                <div className="space-y-2">
                  {s.rewrites.map((r, j) => (
                    <div key={j} className="grid gap-2 rounded-md border p-3 md:grid-cols-2">
                      <div>
                        <div className="text-xs font-medium text-muted-foreground">Before:</div>
                        <p className="mt-1 line-through decoration-destructive/40">{r.before}</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                          After: <CopyButton text={r.after} />
                        </div>
                        <p className="mt-1">{r.after}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Collapsible>
      ))}
      <details className="rounded-lg border bg-card">
        <summary className="cursor-pointer px-4 py-3 text-sm font-medium">Analyze another draft</summary>
        <div className="p-3 pt-0">{input}</div>
      </details>
    </>
  );
}
