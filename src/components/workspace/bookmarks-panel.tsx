"use client";

import { Bookmark as BookmarkIcon, Copy, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MODULE_MAP } from "@/lib/modules";
import { useBookmarks } from "@/lib/storage";
import { useWorkspace } from "./workspace-context";

export function BookmarksPanel() {
  const { proposal, setShowBookmarks, select } = useWorkspace();
  const [bookmarks, setBookmarks] = useBookmarks(proposal.id);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <BookmarkIcon className="size-4 text-brand" />
        <h2 className="flex-1 font-semibold">Bookmarks</h2>
        <Button variant="ghost" size="icon-xs" onClick={() => setShowBookmarks(false)} aria-label="Close bookmarks">
          <X />
        </Button>
      </div>
      {bookmarks.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-1 p-6 text-center">
          <div className="text-sm font-medium">No bookmarks yet</div>
          <div className="text-xs text-muted-foreground">Highlight text to add bookmarks</div>
        </div>
      ) : (
        <ul className="flex-1 space-y-2 overflow-y-auto p-3">
          {bookmarks.map((b) => (
            <li key={b.id} className="group rounded-lg border bg-card p-3">
              <p className="line-clamp-6 whitespace-pre-line text-sm">{b.text}</p>
              <div className="mt-2 flex items-center gap-1">
                <button
                  className="flex-1 truncate text-left text-xs text-brand hover:underline"
                  onClick={() => select(b.moduleId)}
                >
                  {b.moduleId === "overview" ? "Overview" : MODULE_MAP[b.moduleId].title}
                </button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Copy bookmark"
                  onClick={() => navigator.clipboard.writeText(b.text).then(() => toast.success("Copied"))}
                >
                  <Copy />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Delete bookmark"
                  onClick={() => setBookmarks((all) => all.filter((x) => x.id !== b.id))}
                >
                  <Trash2 />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
