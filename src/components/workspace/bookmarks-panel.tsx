"use client";

import { Bookmark as BookmarkIcon, BookOpen, Copy, MessageSquarePlus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Hint } from "@/components/hint";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { moduleLabel, useBookmarkActions, usesInStoryline } from "@/lib/bookmarks";
import { MODULES } from "@/lib/modules";
import type { Bookmark } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useWorkspace } from "./workspace-context";

const ORDER = ["overview", ...MODULES.map((m) => m.id)] as const;

export function BookmarksPanel() {
  const { proposal, setShowBookmarks, select, askAbout, generate, isRunning } = useWorkspace();
  const { bookmarks, remove, setIncluded } = useBookmarkActions(proposal.id);
  const used = bookmarks.filter(usesInStoryline).length;

  const groups = ORDER.map((id) => ({ id, items: bookmarks.filter((b) => b.moduleId === id) })).filter((g) => g.items.length);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <BookmarkIcon className="size-4 text-brand" />
        <h2 className="flex-1 font-semibold">Bookmarks</h2>
        {bookmarks.length > 0 && <span className="text-xs text-muted-foreground">{bookmarks.length}</span>}
        <Button variant="ghost" size="icon-xs" onClick={() => setShowBookmarks(false)} aria-label="Close bookmarks" className="max-lg:hidden">
          <X />
        </Button>
      </div>

      {bookmarks.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
          <span className="flex size-10 items-center justify-center rounded-full bg-muted">
            <BookmarkIcon className="size-5 text-muted-foreground" />
          </span>
          <div className="text-sm font-medium">No bookmarks yet</div>
          <p className="max-w-60 text-xs text-muted-foreground">
            Highlight text in any AI output, or use the bookmark icon on a module section. Bookmarks feed the Storyline &amp;
            Proposal module.
          </p>
        </div>
      ) : (
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-3">
          {groups.map((g) => (
            <section key={g.id}>
              <button
                className="mb-1.5 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-brand"
                onClick={() => select(g.id)}
              >
                {moduleLabel(g.id)}
              </button>
              <ul className="space-y-2">
                {g.items.map((b) => (
                  <BookmarkCard
                    key={b.id}
                    bookmark={b}
                    onAsk={() => askAbout(b.text)}
                    onRemove={() => remove(b.id)}
                    onToggle={(on) => setIncluded(b.id, on)}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      {bookmarks.length > 0 && (
        <div className="border-t p-3">
          <Button
            className="w-full"
            disabled={used === 0 || isRunning("storyline")}
            onClick={() => {
              select("storyline");
              generate("storyline");
            }}
          >
            <BookOpen /> Build storyline from {used} bookmark{used === 1 ? "" : "s"}
          </Button>
        </div>
      )}
    </div>
  );
}

function BookmarkCard({
  bookmark: b,
  onAsk,
  onRemove,
  onToggle,
}: {
  bookmark: Bookmark;
  onAsk: () => void;
  onRemove: () => void;
  onToggle: (on: boolean) => void;
}) {
  const on = usesInStoryline(b);
  return (
    <li className={cn("rounded-lg border bg-card p-3 transition", !on && "opacity-60")}>
      {b.sectionTitle && (
        <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-brand">
          {b.source === "section" && <BookmarkIcon className="size-3 fill-current" />}
          {b.sectionTitle}
        </div>
      )}
      <div className="line-clamp-6 text-sm [&_.prose-pp]:text-sm [&_h3]:text-sm">
        <Markdown>{b.text}</Markdown>
      </div>
      <div className="mt-2 flex items-center gap-1">
        <label className="mr-auto flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground">
          <input
            type="checkbox"
            className="size-3.5 accent-[var(--brand)]"
            checked={on}
            onChange={(e) => onToggle(e.target.checked)}
          />
          Use in storyline
        </label>
        <Hint label="Ask AI about this">
          <Button variant="ghost" size="icon-xs" aria-label="Ask AI about this bookmark" onClick={onAsk}>
            <MessageSquarePlus />
          </Button>
        </Hint>
        <Hint label="Copy">
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Copy bookmark"
            onClick={() => navigator.clipboard.writeText(b.text).then(() => toast.success("Copied"))}
          >
            <Copy />
          </Button>
        </Hint>
        <Hint label="Delete">
          <Button variant="ghost" size="icon-xs" aria-label="Delete bookmark" onClick={onRemove}>
            <Trash2 />
          </Button>
        </Hint>
      </div>
    </li>
  );
}
