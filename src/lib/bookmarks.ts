"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { MODULE_MAP } from "./modules";
import { keys, read, uid, useBookmarks } from "./storage";
import type { Bookmark, ModuleId } from "./types";

export const usesInStoryline = (b: Bookmark) => b.includeInStoryline !== false;

export function moduleLabel(id: Bookmark["moduleId"]) {
  return id === "overview" ? "Overview" : MODULE_MAP[id].title;
}

/** Bookmarks selected to feed the storyline, in the shape the API expects. */
export function storylineBookmarks(pid: string) {
  return read<Bookmark[]>(keys.bookmarks(pid), [])
    .filter(usesInStoryline)
    .map((b) => ({ id: b.id, module: moduleLabel(b.moduleId), section: b.sectionTitle, text: b.text.slice(0, 1200) }));
}

export function useBookmarkActions(pid: string) {
  const [bookmarks, setBookmarks] = useBookmarks(pid);

  const add = useCallback(
    (b: Omit<Bookmark, "id" | "createdAt">) => {
      setBookmarks((all) => [{ ...b, id: uid(), includeInStoryline: true, createdAt: Date.now() }, ...all]);
      toast.success("Added to bookmarks", { description: "Bookmarks feed the Storyline & Proposal module." });
    },
    [setBookmarks],
  );

  const sectionBookmark = useCallback(
    (moduleId: ModuleId, sectionId: string) =>
      bookmarks.find((b) => b.source === "section" && b.moduleId === moduleId && b.sectionId === sectionId),
    [bookmarks],
  );

  /** Adds or removes the bookmark for a whole section. */
  const toggleSection = useCallback(
    (moduleId: ModuleId, sectionId: string, sectionTitle: string, text: string) => {
      const existing = sectionBookmark(moduleId, sectionId);
      if (existing) {
        setBookmarks((all) => all.filter((b) => b.id !== existing.id));
        toast("Removed from bookmarks");
      } else {
        add({ text, moduleId, sectionId, sectionTitle, source: "section" });
      }
    },
    [add, sectionBookmark, setBookmarks],
  );

  const remove = useCallback((id: string) => setBookmarks((all) => all.filter((b) => b.id !== id)), [setBookmarks]);

  const setIncluded = useCallback(
    (id: string, on: boolean) => setBookmarks((all) => all.map((b) => (b.id === id ? { ...b, includeInStoryline: on } : b))),
    [setBookmarks],
  );

  return { bookmarks, add, toggleSection, sectionBookmark, remove, setIncluded };
}
