"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { forAI } from "@/components/proposal-setup";
import { MODULE_MAP } from "@/lib/modules";
import { readModuleContent, writeModuleContent } from "@/lib/storage";
import type { ModuleContent, ModuleId, Proposal } from "@/lib/types";

export type LeftPanel = "sources" | "files" | "tasks" | null;
export type Selection = ModuleId | "overview";

export interface Task {
  key: string;
  label: string;
  status: "running" | "error";
  error?: string;
  startedAt: number;
}

interface GenerateOptions {
  sectionId?: string;
  slide?: { sectionIndex: number; slideIndex: number };
  draft?: string;
}

interface WorkspaceState {
  proposal: Proposal;
  selected: Selection;
  select: (s: Selection) => void;
  leftPanel: LeftPanel;
  setLeftPanel: (p: LeftPanel) => void;
  showBookmarks: boolean;
  setShowBookmarks: (b: boolean) => void;
  /** Active chat thread id; null starts a new thread on the next message. */
  threadId: string | null;
  setThreadId: (id: string | null) => void;
  tasks: Task[];
  isRunning: (mid: ModuleId, sectionId?: string) => boolean;
  errorFor: (mid: ModuleId) => string | undefined;
  generate: (mid: ModuleId, opts?: GenerateOptions) => Promise<void>;
  clear: (mid: ModuleId) => void;
}

const Ctx = createContext<WorkspaceState | null>(null);

export function useWorkspace() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useWorkspace must be used inside WorkspaceProvider");
  return v;
}

const taskKey = (mid: ModuleId, sub?: string) => (sub ? `${mid}:${sub}` : mid);

export function WorkspaceProvider({
  proposal,
  children,
}: {
  proposal: Proposal;
  children: React.ReactNode;
}) {
  const [selected, setSelected] = useState<Selection>("overview");
  const [leftPanel, setLeftPanel] = useState<LeftPanel>("sources");
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const inFlight = useRef(new Map<string, Promise<void>>());
  const proposalRef = useRef(proposal);
  useEffect(() => {
    proposalRef.current = proposal;
  }, [proposal]);

  const setTask = (t: Task | { key: string; remove: true }) =>
    setTasks((all) => {
      const rest = all.filter((x) => x.key !== t.key);
      return "remove" in t ? rest : [...rest, t];
    });

  const generate = useMemo(() => {
    const gen = async (
      mid: ModuleId,
      opts: GenerateOptions = {},
    ): Promise<void> => {
      const mod = MODULE_MAP[mid];
      const pid = proposalRef.current.id;
      const sub =
        opts.sectionId ??
        (opts.slide
          ? `slide-${opts.slide.sectionIndex}-${opts.slide.slideIndex}`
          : undefined);
      const key = taskKey(mid, sub);
      const existing = inFlight.current.get(key);
      if (existing) return existing;

      const run = (async () => {
        // Storyline builds on client research: make sure it exists first.
        if (!sub && mod.dependsOn && !readModuleContent(pid, mod.dependsOn)) {
          await gen(mod.dependsOn);
          if (!readModuleContent(pid, mod.dependsOn)) return;
        }

        const label = sub
          ? `${mod.title}: ${mod.sections.find((s) => s.id === sub)?.title ?? "slide"}`
          : mod.title;
        setTask({ key, label, status: "running", startedAt: Date.now() });

        const current = readModuleContent(pid, mid);
        const body: Record<string, unknown> = {
          proposal: forAI(proposalRef.current),
        };
        if (opts.sectionId) body.sectionId = opts.sectionId;
        if (opts.draft) body.draft = opts.draft;
        if (opts.slide && current?.storyline) {
          const section = current.storyline[opts.slide.sectionIndex];
          body.slide = {
            section: section.name,
            title: section.slides[opts.slide.slideIndex]?.title ?? "",
          };
        }
        if (mod.dependsOn)
          body.clientResearch = moduleMarkdown(
            mod.dependsOn,
            readModuleContent(pid, mod.dependsOn),
          );

        try {
          const res = await fetch(`/api/modules/${mid}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          const data = await res.json().catch(() => ({}));
          if (!res.ok)
            throw new Error(
              data.message || `Generation failed (${res.status})`,
            );

          const latest = readModuleContent(pid, mid);
          let next: ModuleContent;
          if (opts.sectionId) {
            next = {
              ...latest,
              sections: { ...latest?.sections, ...data.sections },
              generatedAt: Date.now(),
            };
          } else if (opts.slide && latest?.storyline) {
            const storyline = latest.storyline.map((s, i) =>
              i === opts.slide!.sectionIndex
                ? {
                    ...s,
                    slides: s.slides.map((sl, j) =>
                      j === opts.slide!.slideIndex ? data.slide : sl,
                    ),
                  }
                : s,
            );
            next = { ...latest, storyline, generatedAt: Date.now() };
          } else {
            next = {
              sections:
                data.sections && !Array.isArray(data.sections)
                  ? data.sections
                  : undefined,
              storyline: Array.isArray(data.sections)
                ? data.sections
                : undefined,
              team: data.team,
              polish: data.polish,
              generatedAt: Date.now(),
            };
          }
          writeModuleContent(pid, mid, next);
          setTask({ key, remove: true });
        } catch (err) {
          const message = (err as Error).message;
          setTask({
            key,
            label,
            status: "error",
            error: message,
            startedAt: Date.now(),
          });
          toast.error(`${label}: ${message}`);
        }
      })();

      inFlight.current.set(key, run);
      try {
        await run;
      } finally {
        inFlight.current.delete(key);
      }
    };
    return gen;
  }, []);

  const clear = useCallback((mid: ModuleId) => {
    writeModuleContent(proposalRef.current.id, mid, null);
    setTask({ key: mid, remove: true });
  }, []);

  const value = useMemo<WorkspaceState>(
    () => ({
      proposal,
      selected,
      select: setSelected,
      leftPanel,
      setLeftPanel,
      showBookmarks,
      setShowBookmarks,
      threadId,
      setThreadId,
      tasks,
      isRunning: (mid, sectionId) =>
        tasks.some(
          (t) => t.status === "running" && t.key === taskKey(mid, sectionId),
        ),
      errorFor: (mid) =>
        tasks.find((t) => t.key === mid && t.status === "error")?.error,
      generate,
      clear,
    }),
    [
      proposal,
      selected,
      leftPanel,
      showBookmarks,
      threadId,
      tasks,
      generate,
      clear,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Renders a module's stored content as Markdown (used for export and as chat context). */
export function moduleMarkdown(mid: ModuleId, c: ModuleContent | null): string {
  if (!c) return "";
  const mod = MODULE_MAP[mid];
  const out: string[] = [`## ${mod.title}`];
  if (c.sections) {
    for (const s of mod.sections)
      if (c.sections[s.id]) out.push(`### ${s.title}\n\n${c.sections[s.id]}`);
  }
  if (c.storyline) {
    for (const s of c.storyline) {
      out.push(`### ${s.name}`);
      s.slides.forEach((sl, i) =>
        out.push(
          `**Slide ${i + 1}: ${sl.title}**\n\n${sl.bullets.map((b) => `- ${b}`).join("\n")}`,
        ),
      );
    }
  }
  if (c.team) {
    const t = c.team;
    out.push(t.summary);
    out.push(
      "### Recommended team\n\n" +
        t.teamMembers
          .map(
            (m) =>
              `- **${m.name}**, ${m.title} (${m.office}) – match ${m.matchScore}%`,
          )
          .join("\n"),
    );
    if (t.suggestedRoles.length)
      out.push(
        `### Suggested roles\n\n${t.suggestedRoles.map((r) => `- ${r}`).join("\n")}`,
      );
    if (t.potentialGaps.length)
      out.push(
        `### Potential gaps\n\n${t.potentialGaps.map((r) => `- ${r}`).join("\n")}`,
      );
    if (t.capabilityInsights)
      out.push(`### Capability insights\n\n${t.capabilityInsights}`);
  }
  if (c.polish) {
    const pa = c.polish;
    out.push(`**Score:** ${pa.score}/100\n\n${pa.overallAssessment}`);
    for (const s of pa.sections) {
      out.push(
        `### ${s.name}\n\n**Strengths**\n${s.strengths.map((x) => `- ${x}`).join("\n")}\n\n**Gaps / Issues**\n${s.gaps
          .map((x) => `- ${x}`)
          .join(
            "\n",
          )}\n\n**Suggested rewrites**\n${s.rewrites.map((r) => `- Before: ${r.before}\n  After: ${r.after}`).join("\n")}`,
      );
    }
  }
  return out.join("\n\n");
}

export function downloadText(
  filename: string,
  text: string,
  type = "text/markdown",
) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const slug = (s: string) =>
  s.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
