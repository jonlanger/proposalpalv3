import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Hint } from "@/components/hint";
import type { Person } from "@/lib/types";

export function TeamAvatars({ people, max = 5 }: { people: Person[]; max?: number }) {
  const extra = people.length - max;
  return (
    <div className="flex items-center -space-x-2">
      {people.slice(0, max).map((p) => (
        <Hint key={p.id} label={`${p.name} · ${p.role}`}>
          <Avatar className="size-8 border-2 border-background transition-transform hover:-translate-y-1">
            <AvatarImage src={p.avatar} alt={p.name} />
            <AvatarFallback>{p.initials}</AvatarFallback>
          </Avatar>
        </Hint>
      ))}
      {extra > 0 && (
        <span className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
          +{extra}
        </span>
      )}
    </div>
  );
}
