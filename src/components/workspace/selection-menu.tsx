"use client";

import { useEffect, useState } from "react";
import { Bookmark, MessageSquarePlus } from "lucide-react";
import { useBookmarkActions } from "@/lib/bookmarks";
import type { ModuleId } from "@/lib/types";
import { useWorkspace } from "./workspace-context";

interface Pending {
  text: string;
  moduleId: ModuleId | "overview";
  sectionId?: string;
  sectionTitle?: string;
  source: "selection" | "chat";
  x: number;
  y: number;
}

/**
 * Floating actions for highlighted AI output. Any element marked `data-selectable` opts in;
 * the nearest `data-module-id` / `data-section-id` / `data-section-title` give the bookmark
 * its context. Follows the document selection, so mouse drags and touch long-press both work.
 */
export function SelectionMenu() {
  const { proposal, askAbout } = useWorkspace();
  const { add } = useBookmarkActions(proposal.id);
  const [pending, setPending] = useState<Pending | null>(null);

  useEffect(() => {
    let timer = 0;
    const read = () => {
      const sel = window.getSelection();
      const text = sel?.toString().trim() ?? "";
      if (!sel || sel.rangeCount === 0 || text.length < 3) return setPending(null);
      const el = (n: Node | null) => (n instanceof Element ? n : n?.parentElement ?? null);
      const start = el(sel.anchorNode)?.closest<HTMLElement>("[data-selectable]");
      const end = el(sel.focusNode)?.closest<HTMLElement>("[data-selectable]");
      if (!start || start !== end) return setPending(null);

      const section = el(sel.anchorNode)?.closest<HTMLElement>("[data-section-title]");
      const rect = sel.getRangeAt(0).getBoundingClientRect();
      setPending({
        text,
        moduleId: (start.closest<HTMLElement>("[data-module-id]")?.dataset.moduleId ?? "overview") as Pending["moduleId"],
        sectionId: section?.dataset.sectionId,
        sectionTitle: section?.dataset.sectionTitle,
        source: start.dataset.selectable === "chat" ? "chat" : "selection",
        x: rect.left + rect.width / 2,
        y: rect.bottom,
      });
    };
    const onChange = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(read, 120);
    };
    const hide = () => setPending(null);
    document.addEventListener("selectionchange", onChange);
    window.addEventListener("scroll", hide, true);
    window.addEventListener("resize", hide);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("selectionchange", onChange);
      window.removeEventListener("scroll", hide, true);
      window.removeEventListener("resize", hide);
    };
  }, []);

  if (!pending) return null;

  const done = () => {
    window.getSelection()?.removeAllRanges();
    setPending(null);
  };
  const left = Math.min(Math.max(pending.x, 110), window.innerWidth - 110);
  const top = Math.min(pending.y + 10, window.innerHeight - 56);

  return (
    <div
      role="toolbar"
      aria-label="Selected text actions"
      className="fixed z-50 flex -translate-x-1/2 items-center gap-0.5 rounded-lg border bg-popover p-1 text-popover-foreground shadow-lg"
      style={{ left, top }}
      // Keep the text selection alive while pressing the buttons.
      onPointerDown={(e) => e.preventDefault()}
    >
      <button
        className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium hover:bg-muted"
        onClick={() => {
          askAbout(pending.text);
          done();
        }}
      >
        <MessageSquarePlus className="size-4 text-brand" /> Ask AI
      </button>
      <span className="h-5 w-px bg-border" />
      <button
        className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium hover:bg-muted"
        onClick={() => {
          add({
            text: pending.text,
            moduleId: pending.moduleId,
            sectionId: pending.sectionId,
            sectionTitle: pending.sectionTitle ?? (pending.source === "chat" ? "Chat" : undefined),
            source: pending.source,
          });
          done();
        }}
      >
        <Bookmark className="size-4 text-brand" /> Bookmark
      </button>
    </div>
  );
}
