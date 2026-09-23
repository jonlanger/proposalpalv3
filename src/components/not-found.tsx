import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
        <h1 className="text-xl font-semibold">Proposal not found</h1>
        <p className="text-sm text-muted-foreground">It may have been deleted, or it was created in a different browser.</p>
        <Button nativeButton={false} render={<Link href="/" />}>Back to proposals</Button>
      </div>
    </div>
  );
}
