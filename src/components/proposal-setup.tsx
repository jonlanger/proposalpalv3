"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, Loader2, Pencil, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { DocChip, FileDrop } from "@/components/file-drop";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FUNCTIONAL_PRACTICE_AREAS, INDUSTRY_PRACTICE_AREAS } from "@/lib/modules";
import { CURRENT_USER, PEOPLE_DIRECTORY } from "@/lib/seed";
import { saveProposal, uid } from "@/lib/storage";
import type { FileCategory, Person, Proposal, TeamRole } from "@/lib/types";
import { cn } from "@/lib/utils";

export function emptyProposal(): Proposal {
  const now = Date.now();
  return {
    id: `proposal-${uid().slice(0, 8)}`,
    opportunityId: "",
    clientName: "",
    proposalName: "",
    proposalContext: "",
    industryPracticeAreas: [],
    functionalPracticeAreas: [],
    proposalDate: "",
    proposalDescription: "",
    competitiveLandscape: "",
    topicExpert: "",
    uploadedFiles: [],
    teamMembers: [CURRENT_USER],
    createdAt: now,
    updatedAt: now,
  };
}

const requiredOk = (p: Proposal) => !!(p.opportunityId.trim() && p.clientName.trim() && p.proposalName.trim());

/** Serializable subset of a proposal sent to the API (drops timestamps). */
export function forAI(p: Proposal): Partial<Proposal> {
  const rest: Partial<Proposal> = { ...p };
  delete rest.createdAt;
  delete rest.updatedAt;
  return rest;
}

interface Props {
  initial: Proposal;
  isNew: boolean;
  /** Persists changes for an existing proposal. */
  onChange?: (p: Proposal) => void;
}

export function ProposalSetup({ initial, isNew, onChange }: Props) {
  const router = useRouter();
  const [p, setP] = useState(initial);
  const [editingRequired, setEditingRequired] = useState(isNew);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const [generating, setGenerating] = useState(false);

  /** Updates local state; existing proposals persist immediately unless the required-info form is mid-edit. */
  const update = (patch: Partial<Proposal>, persist = !editingRequired) => {
    const next = { ...p, ...patch, updatedAt: Date.now() };
    setP(next);
    if (!isNew && persist) onChange?.(next);
    return next;
  };

  async function generateDetails() {
    if (!requiredOk(p)) {
      toast.error("Fill in Opportunity ID, Client Name and Proposal Name first.");
      return;
    }
    setGenerating(true);
    try {
      const res = await fetch("/api/proposal-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposal: forAI(p) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Generation failed");
      const d = data.details;
      update({
        proposalDescription: p.proposalDescription || d.proposalDescription,
        competitiveLandscape: p.competitiveLandscape || d.competitiveLandscape,
        topicExpert: p.topicExpert || d.topicExpert,
        industryPracticeAreas: p.industryPracticeAreas.length ? p.industryPracticeAreas : d.industryPracticeAreas,
        functionalPracticeAreas: p.functionalPracticeAreas.length ? p.functionalPracticeAreas : d.functionalPracticeAreas,
      });
      toast.success("Proposal details generated. Review and edit as needed.");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setGenerating(false);
    }
  }

  function goToWorkspace() {
    if (!requiredOk(p)) return;
    try {
      saveProposal(p);
    } catch (err) {
      toast.error((err as Error).message);
      return;
    }
    router.push(`/proposal/${p.id}/dashboard`);
  }

  function saveRequired() {
    if (!requiredOk(p)) {
      toast.error("Opportunity ID, Client Name and Proposal Name are required.");
      return;
    }
    onChange?.(p);
    setEditingRequired(false);
  }

  return (
    <div className="flex-1 bg-surface">
      <div className="mx-auto max-w-[1400px] px-3 py-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-semibold">{isNew ? "New Proposal" : "Proposal Details"}</h1>
          <Button size="lg" className="h-9 px-6 max-sm:w-full" disabled={!requiredOk(p) || (!isNew && editingRequired)} onClick={goToWorkspace}>
            Go to Proposal Workspace
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Required information */}
          <Panel
            title="Required Information"
            subtitle="Essential details to start your proposal"
            action={
              !isNew &&
              (editingRequired ? (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setP({ ...p, opportunityId: initial.opportunityId, clientName: initial.clientName, proposalName: initial.proposalName, rfp: initial.rfp, draftProposal: initial.draftProposal, proposalContext: initial.proposalContext });
                      setEditingRequired(false);
                    }}
                  >
                    <X /> Cancel
                  </Button>
                  <Button size="sm" onClick={saveRequired}>
                    <Check /> Save
                  </Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setEditingRequired(true)}>
                  <Pencil /> Edit
                </Button>
              ))
            }
          >
            {editingRequired ? (
              <div className="space-y-4">
                <Field label="Opportunity ID" required>
                  <Input value={p.opportunityId} placeholder="Enter Opportunity ID" onChange={(e) => update({ opportunityId: e.target.value })} />
                </Field>
                <Field label="Client Name" required>
                  <Input value={p.clientName} placeholder="Enter client name" onChange={(e) => update({ clientName: e.target.value })} />
                </Field>
                <Field label="Proposal Name" required>
                  <Input value={p.proposalName} placeholder="Enter proposal name" onChange={(e) => update({ proposalName: e.target.value })} />
                </Field>

                <div className="pt-3">
                  <p className="text-sm font-semibold">
                    Upload an RFP, Draft Proposal, and/or write a Proposal Summary to get started (choose one or more)
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    This content helps to tailor research, guardrails, and GenAI outputs
                  </p>
                </div>
                <Field label="RFP" hint="Upload the Request for Proposal document">
                  {p.rfp ? (
                    <DocChip doc={p.rfp} onRemove={() => update({ rfp: undefined })} />
                  ) : (
                    <FileDrop type="Client Context" onFiles={([d]) => update({ rfp: d })} />
                  )}
                </Field>
                <Field label="Draft Proposal" hint="Upload any existing proposal drafts or related documents">
                  {p.draftProposal ? (
                    <DocChip doc={p.draftProposal} onRemove={() => update({ draftProposal: undefined })} />
                  ) : (
                    <FileDrop type="Past Proposal" onFiles={([d]) => update({ draftProposal: d })} />
                  )}
                </Field>
                <Field label="Proposal Context" hint="Summarize the opportunity: scope, stakeholders, timeline, priorities">
                  <Textarea
                    rows={6}
                    value={p.proposalContext}
                    placeholder="e.g. The client has issued an RFP for…"
                    onChange={(e) => update({ proposalContext: e.target.value })}
                  />
                </Field>
              </div>
            ) : (
              <dl className="space-y-5">
                <Row label="Opportunity ID" value={p.opportunityId} />
                <Row label="Client Name" value={p.clientName} />
                <Row label="Proposal Name" value={p.proposalName} />
                <Block label="RFP">{p.rfp ? <DocChip doc={p.rfp} /> : "—"}</Block>
                <Block label="Draft Proposal">{p.draftProposal ? <DocChip doc={p.draftProposal} /> : "—"}</Block>
                <Block label="Proposal Context">{p.proposalContext || "—"}</Block>
              </dl>
            )}
          </Panel>

          <div className="min-w-0 space-y-5">
            {/* Proposal details */}
            <Panel
              title="Proposal Details"
              subtitle="Client information, additional context, and details"
              action={
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled={generating || !requiredOk(p)} onClick={generateDetails}>
                    {generating ? <Loader2 className="animate-spin" /> : <Sparkles />} Generate
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setDetailsOpen(true)}>
                    <Pencil /> Edit
                  </Button>
                </div>
              }
            >
              <dl className="space-y-5">
                <Row label="Industry Practice Areas" value={<Chips codes={p.industryPracticeAreas} />} />
                <Row label="Functional Practice Areas" value={<Chips codes={p.functionalPracticeAreas} />} />
                <Row label="Proposal Due Date" value={p.proposalDate} />
                <Block label="Proposal Description">{p.proposalDescription || "—"}</Block>
                <Block label="Competitive Landscape">{p.competitiveLandscape || "—"}</Block>
                <Row label="Topic Expert" value={p.topicExpert} wide />
                <div className="border-t pt-4">
                  <Block label="Additional Files">
                    {p.uploadedFiles.length ? (
                      <ol className="space-y-2">
                        {p.uploadedFiles.map((f, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <span className="w-4 text-muted-foreground">{i + 1}.</span>
                            <span className="min-w-0 flex-1 truncate">{f.name}</span>
                            <Badge variant="secondary">{f.type}</Badge>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      "—"
                    )}
                  </Block>
                </div>
              </dl>
            </Panel>

            {/* Team */}
            <Panel
              title="Team Members"
              subtitle="Add team members to the proposal"
              action={
                <Button variant="outline" size="sm" onClick={() => setTeamOpen(true)}>
                  <Pencil /> Edit
                </Button>
              }
            >
              <ul className="divide-y">
                {p.teamMembers.map((m) => (
                  <li key={m.id} className="flex items-center gap-3 py-2.5">
                    <Avatar className="size-8">
                      <AvatarImage src={m.avatar} alt={m.name} />
                      <AvatarFallback>{m.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{m.name}</div>
                      <div className="truncate text-xs text-muted-foreground">{m.email}</div>
                    </div>
                    <Badge variant="outline">{m.role}</Badge>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
      </div>

      <DetailsDialog open={detailsOpen} onOpenChange={setDetailsOpen} proposal={p} onSave={(patch) => update(patch, true)} />
      <TeamDialog open={teamOpen} onOpenChange={setTeamOpen} members={p.teamMembers} onSave={(teamMembers) => update({ teamMembers }, true)} />
    </div>
  );
}

function Panel({ title, subtitle, action, children }: { title: string; subtitle: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="min-w-0 rounded-lg border bg-card p-4 shadow-sm sm:p-5">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {hint && <p className="text-sm text-muted-foreground">{hint}</p>}
      {children}
    </div>
  );
}

function Row({ label, value, wide }: { label: string; value?: React.ReactNode; wide?: boolean }) {
  return (
    <div className={cn("flex gap-6 text-sm", wide ? "items-start" : "items-center justify-between")}>
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd className={cn("min-w-0 break-words", wide ? "flex-1 text-left" : "text-right")}>{value || "—"}</dd>
    </div>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="text-sm">
      <dt className="mb-2 text-muted-foreground">{label}</dt>
      <dd className="whitespace-pre-line leading-relaxed">{children}</dd>
    </div>
  );
}

function Chips({ codes }: { codes: string[] }) {
  if (!codes.length) return <>—</>;
  return (
    <span className="flex flex-wrap justify-end gap-1.5">
      {codes.map((c) => (
        <Badge key={c} variant="secondary" className="font-semibold">
          {c}
        </Badge>
      ))}
    </span>
  );
}

function AreaPicker({ options, value, onChange }: { options: { value: string; label: string }[]; value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => {
        const on = value.includes(o.value);
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(on ? value.filter((v) => v !== o.value) : [...value, o.value])}
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs transition",
              on ? "border-brand bg-brand text-white" : "hover:border-brand",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

const CATEGORIES: FileCategory[] = ["Client Context", "Past Proposal", "BCG IP", "Other"];

function DetailsDialog({
  open,
  onOpenChange,
  proposal,
  onSave,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  proposal: Proposal;
  onSave: (patch: Partial<Proposal>) => void;
}) {
  const [d, setD] = useState(proposal);
  const [category, setCategory] = useState<FileCategory>("Client Context");
  const [prevOpen, setPrevOpen] = useState(open);
  // Reset the form from the latest proposal each time the dialog opens.
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setD(proposal);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Proposal Details</DialogTitle>
          <DialogDescription>Client information, additional context, and details</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Field label="Industry Practice Areas">
            <AreaPicker options={INDUSTRY_PRACTICE_AREAS} value={d.industryPracticeAreas} onChange={(v) => setD({ ...d, industryPracticeAreas: v })} />
          </Field>
          <Field label="Functional Practice Areas">
            <AreaPicker options={FUNCTIONAL_PRACTICE_AREAS} value={d.functionalPracticeAreas} onChange={(v) => setD({ ...d, functionalPracticeAreas: v })} />
          </Field>
          <Field label="Proposal Due Date">
            <Input type="date" value={d.proposalDate} onChange={(e) => setD({ ...d, proposalDate: e.target.value })} className="w-48" />
          </Field>
          <Field label="Proposal Description">
            <Textarea rows={4} value={d.proposalDescription} onChange={(e) => setD({ ...d, proposalDescription: e.target.value })} />
          </Field>
          <Field label="Competitive Landscape">
            <Textarea rows={4} value={d.competitiveLandscape} onChange={(e) => setD({ ...d, competitiveLandscape: e.target.value })} />
          </Field>
          <Field label="Topic Expert">
            <Input value={d.topicExpert} onChange={(e) => setD({ ...d, topicExpert: e.target.value })} />
          </Field>
          <Field label="Additional Files" hint="PDF, DOC, PPTX, or other formats">
            <div className="space-y-2">
              {d.uploadedFiles.map((f, i) => (
                <DocChip key={i} doc={f} onRemove={() => setD({ ...d, uploadedFiles: d.uploadedFiles.filter((_, j) => j !== i) })} />
              ))}
              <div className="flex gap-2">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as FileCategory)}
                  className="h-9 rounded-lg border bg-background px-2 text-sm"
                  aria-label="File type"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <FileDrop
                  compact
                  multiple
                  type={category}
                  className="flex-1"
                  onFiles={(docs) => setD((cur) => ({ ...cur, uploadedFiles: [...cur.uploadedFiles, ...docs] }))}
                />
              </div>
            </div>
          </Field>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              const { industryPracticeAreas, functionalPracticeAreas, proposalDate, proposalDescription, competitiveLandscape, topicExpert, uploadedFiles } = d;
              onSave({ industryPracticeAreas, functionalPracticeAreas, proposalDate, proposalDescription, competitiveLandscape, topicExpert, uploadedFiles });
              onOpenChange(false);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const ROLES: TeamRole[] = ["Owner", "Editor", "Viewer"];

function TeamDialog({
  open,
  onOpenChange,
  members,
  onSave,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  members: Person[];
  onSave: (m: Person[]) => void;
}) {
  const [team, setTeam] = useState(members);
  const [q, setQ] = useState("");
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setTeam(members);
  }

  const people = PEOPLE_DIRECTORY.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Team Members</DialogTitle>
          <DialogDescription>Add member to proposal team</DialogDescription>
        </DialogHeader>
        <Input placeholder="Search people…" value={q} onChange={(e) => setQ(e.target.value)} />
        <ul className="max-h-80 divide-y overflow-y-auto">
          {people.map((person) => {
            const member = team.find((m) => m.id === person.id);
            return (
              <li key={person.id} className="flex items-center gap-3 py-2">
                <input
                  type="checkbox"
                  className="size-4 accent-[var(--brand)]"
                  checked={!!member}
                  disabled={member?.role === "Owner" && team.filter((m) => m.role === "Owner").length === 1}
                  onChange={(e) =>
                    setTeam(e.target.checked ? [...team, { ...person, role: "Viewer" }] : team.filter((m) => m.id !== person.id))
                  }
                  aria-label={`Include ${person.name}`}
                />
                <Avatar className="size-8">
                  <AvatarImage src={person.avatar} alt={person.name} />
                  <AvatarFallback>{person.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{person.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{person.title}</div>
                </div>
                {member && (
                  <select
                    value={member.role}
                    onChange={(e) => setTeam(team.map((m) => (m.id === person.id ? { ...m, role: e.target.value as TeamRole } : m)))}
                    className="h-7 rounded-md border bg-background px-1.5 text-xs"
                    aria-label={`${person.name} role`}
                  >
                    {ROLES.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                )}
              </li>
            );
          })}
        </ul>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSave(team);
              onOpenChange(false);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
