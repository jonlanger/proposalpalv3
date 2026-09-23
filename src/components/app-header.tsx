"use client";

import Link from "next/link";
import { ChevronRight, House, LifeBuoy, Moon, Pencil, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { CURRENT_USER } from "@/lib/seed";

export interface Crumb {
  label: string;
  href?: string;
  icon?: "details";
}

export function AppHeader({ crumbs = [] }: { crumbs?: Crumb[] }) {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <header className="no-print sticky top-0 z-40 flex h-[50px] shrink-0 items-center gap-3 border-b bg-background px-4">
      <Link href="/" className="flex items-center gap-3">
        <span className="text-[22px] font-black leading-none tracking-tighter text-brand">BCG</span>
        <span className="h-5 w-px bg-border" />
        <span className="font-semibold">ProposalPal</span>
      </Link>
      <nav className="flex min-w-0 items-center gap-2 text-sm">
        <Hint label="Home">
          <Link href="/" className="ml-3 rounded p-1 text-brand hover:bg-muted" aria-label="Home">
            <House className="size-4" />
          </Link>
        </Hint>
        {crumbs.map((c, i) => (
          <span key={i} className="flex min-w-0 items-center gap-2">
            <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            {c.href ? (
              <Link href={c.href} className="flex items-center gap-1.5 truncate text-brand hover:underline">
                {c.icon === "details" && <Pencil className="size-3.5" />}
                {c.label}
              </Link>
            ) : (
              <span className="truncate text-brand">{c.label}</span>
            )}
          </span>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-1">
        <Hint label="Toggle theme">
          <Button
            variant="ghost"
            size="icon"
            className="text-brand"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {resolvedTheme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </Hint>
        <Hint label="Help & support">
          <Link href="/help" className="rounded-lg p-2 text-brand hover:bg-muted" aria-label="Help">
            <LifeBuoy className="size-4" />
          </Link>
        </Hint>
        <Hint label={CURRENT_USER.name}>
          <Avatar className="ml-1 size-8 border">
            <AvatarImage src={CURRENT_USER.avatar} alt={CURRENT_USER.name} />
            <AvatarFallback>{CURRENT_USER.initials}</AvatarFallback>
          </Avatar>
        </Hint>
      </div>
    </header>
  );
}
