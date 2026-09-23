"use client";

import { useRef, useState } from "react";
import { FileText, Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FileCategory, UploadedDoc } from "@/lib/types";

const ACCEPT = ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.md,.csv";

/** Uploads a file to /api/extract and returns it with its extracted text. */
export async function extractDoc(file: File, type: FileCategory): Promise<UploadedDoc> {
  const form = new FormData();
  form.append("file", file);
  try {
    const res = await fetch("/api/extract", { method: "POST", body: form });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");
    if (data.supported === false) {
      toast.info(`${file.name}: text can't be read from this file type, so only its name is used as context.`);
    } else if (data.truncated) {
      toast.info(`${file.name} is long; only the first part is used as AI context.`);
    }
    return { name: file.name, type, text: data.text || undefined };
  } catch (err) {
    toast.error(`${file.name}: ${(err as Error).message}`);
    return { name: file.name, type };
  }
}

interface Props {
  type: FileCategory;
  multiple?: boolean;
  onFiles: (docs: UploadedDoc[]) => void;
  className?: string;
  compact?: boolean;
}

export function FileDrop({ type, multiple, onFiles, className, compact }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handle(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    const list = multiple ? Array.from(files) : [files[0]];
    const docs = await Promise.all(list.map((f) => extractDoc(f, type)));
    setBusy(false);
    onFiles(docs);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => input.current?.click()}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && input.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        handle(e.dataTransfer.files);
      }}
      className={cn(
        "flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed text-sm text-muted-foreground transition hover:border-brand hover:text-foreground",
        compact ? "h-9" : "h-10",
        over && "border-brand bg-accent/40",
        className,
      )}
    >
      {busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
      {busy ? "Reading file…" : over ? "Drop file(s) here" : "Click to upload or drag and drop"}
      <input
        ref={input}
        type="file"
        accept={ACCEPT}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          handle(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}

export function DocChip({ doc, onRemove }: { doc: UploadedDoc; onRemove?: () => void }) {
  return (
    <div className="flex items-center gap-2 rounded-md border bg-muted/40 px-2.5 py-1.5 text-sm">
      <FileText className="size-4 shrink-0 text-brand" />
      <span className="min-w-0 flex-1 truncate">{doc.name}</span>
      {doc.text && <span className="shrink-0 text-xs text-muted-foreground">{Math.round(doc.text.length / 1000)}k chars</span>}
      {onRemove && (
        <Button variant="ghost" size="icon-xs" onClick={onRemove} aria-label={`Remove ${doc.name}`}>
          <X />
        </Button>
      )}
    </div>
  );
}
