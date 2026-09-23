import { cn } from "@/lib/utils";

/** ProposalPal mark: a 2×2 dot grid with one accented dot, echoing the dot-grid backgrounds. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={cn("size-4", className)}>
      <circle cx="4" cy="4" r="2.25" className="fill-brand" />
      <circle cx="12" cy="4" r="2.25" className="fill-muted-foreground/40" />
      <circle cx="4" cy="12" r="2.25" className="fill-muted-foreground/40" />
      <circle cx="12" cy="12" r="2.25" className="fill-muted-foreground/40" />
    </svg>
  );
}
