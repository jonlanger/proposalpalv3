"use client";

import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Bot,
  ChevronDown,
  DollarSign,
  FileText,
  Info,
  Loader2,
  Monitor,
  Paperclip,
  Search,
  Send,
  Square,
  ThumbsUp,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { extractDoc } from "@/components/file-drop";
import { Hint } from "@/components/hint";
import { Markdown } from "@/components/markdown";
import { forAI } from "@/components/proposal-setup";
import { Button } from "@/components/ui/button";
import { MODULE_MAP, MODULES, OVERVIEW_INTRO } from "@/lib/modules";
import { readModuleContent, uid, useChats } from "@/lib/storage";
import type { ChatMessage, ChatThread, ModuleId, UploadedDoc } from "@/lib/types";
import { cn } from "@/lib/utils";
import { moduleMarkdown, useWorkspace } from "./workspace-context";

const ICONS: Record<ModuleId, typeof Search> = {
  "client-research": Search,
  "client-engagement": Users,
  "team-formation": UserPlus,
  "topic-research": FileText,
  storyline: BookOpen,
  commercial: DollarSign,
  "polish-proposal": ThumbsUp,
  "practice-pitch": Monitor,
};

export function ChatPanel() {
  const { proposal, selected, select, isRunning, threadId, setThreadId, generate } = useWorkspace();
  const [threads, setThreads] = useChats(proposal.id);
  const [gridOpen, setGridOpen] = useState(true);
  const [input, setInput] = useState("");
  const [attachment, setAttachment] = useState<UploadedDoc | null>(null);
  const [attaching, setAttaching] = useState(false);
  const [streaming, setStreaming] = useState<string | null>(null);
  const abort = useRef<AbortController | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const thread = threads.find((t) => t.id === threadId);
  const messages = thread?.messages ?? [];
  const mod = selected === "overview" ? null : MODULE_MAP[selected];

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages.length, streaming, selected]);

  function saveMessages(id: string, msgs: ChatMessage[], title?: string) {
    setThreads((all) => {
      const existing = all.find((t) => t.id === id);
      const next: ChatThread = existing
        ? { ...existing, messages: msgs, updatedAt: Date.now() }
        : { id, title: title ?? "New chat", moduleId: selected, messages: msgs, updatedAt: Date.now() };
      return [next, ...all.filter((t) => t.id !== id)];
    });
  }

  async function send() {
    const text = input.trim();
    if ((!text && !attachment) || streaming !== null) return;
    const id = threadId ?? uid();
    if (!threadId) setThreadId(id);

    const userMsg: ChatMessage = {
      id: uid(),
      role: "user",
      content: attachment ? `${text || "Please review the attached file."}\n\n📎 ${attachment.name}` : text,
      createdAt: Date.now(),
    };
    const history = [...messages, userMsg];
    saveMessages(id, history, text.slice(0, 60) || attachment?.name);
    setInput("");
    const file = attachment;
    setAttachment(null);

    // In Polish Proposal, an attached draft runs the structured review.
    if (selected === "polish-proposal" && file?.text) {
      await generate("polish-proposal", { draft: file.text });
      const result = readModuleContent(proposal.id, "polish-proposal")?.polish;
      saveMessages(id, [
        ...history,
        {
          id: uid(),
          role: "assistant",
          content: result
            ? `# Proposal Analysis Complete\n\n**Score:** ${result.score}/100\n\n${result.overallAssessment}\n\nSee the section-by-section feedback in the Polish Proposal content panel.`
            : "I couldn't analyze that file. Please try again.",
          createdAt: Date.now(),
        },
      ]);
      return;
    }

    const controller = new AbortController();
    abort.current = controller;
    setStreaming("");
    let reply = "";
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          proposal: forAI(proposal),
          moduleId: selected,
          moduleContent: mod ? moduleMarkdown(mod.id, readModuleContent(proposal.id, mod.id)) : undefined,
          messages: history.map((m) => ({ role: m.role, content: m.content })),
          attachment: file?.text ? { name: file.name, text: file.text } : undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Request failed (${res.status})`);
      }
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setStreaming(reply);
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        reply = `⚠️ **Error:** ${(err as Error).message}`;
      }
    } finally {
      setStreaming(null);
      abort.current = null;
      if (reply) saveMessages(id, [...history, { id: uid(), role: "assistant", content: reply, createdAt: Date.now() }]);
    }
  }

  async function attach(files: FileList | null) {
    const f = files?.[0];
    if (!f) return;
    setAttaching(true);
    const doc = await extractDoc(f, "Other");
    setAttaching(false);
    if (!doc.text) {
      toast.error("No text could be read from that file. Try PDF, DOCX or plain text.");
      return;
    }
    setAttachment(doc);
  }

  const welcomeTitle = mod ? mod.title : `Welcome to ${proposal.proposalName}`;
  const welcomeBody = mod
    ? mod.intro
    : `Let's build a compelling proposal for **${proposal.clientName.replace(/\.$/, "")}**.\n\n${OVERVIEW_INTRO}`;

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      {/* Module grid */}
      <div className="border-b px-4 pb-3 pt-3">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold">{mod ? mod.title : "Overview"}</h2>
          <Hint label="Select a module to generate content and focus the chat">
            <Info className="size-4 text-muted-foreground" />
          </Hint>
          <Hint label="Toggle module cards visibility">
            <Button variant="ghost" size="icon-xs" className="ml-auto" onClick={() => setGridOpen(!gridOpen)} aria-label="Toggle module cards">
              <ChevronDown className={cn("transition", gridOpen && "rotate-180")} />
            </Button>
          </Hint>
        </div>
        {gridOpen && (
          <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {MODULES.map((m) => {
              const Icon = ICONS[m.id];
              const active = selected === m.id;
              const running = isRunning(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => select(active ? "overview" : m.id)}
                  className={cn(
                    "flex h-[50px] items-center gap-2 rounded-md border px-2.5 text-left text-xs leading-tight transition hover:border-brand-bright",
                    active ? "border-brand-bright bg-accent text-brand-bright" : "bg-card",
                  )}
                >
                  {running ? <Loader2 className="size-4 shrink-0 animate-spin" /> : <Icon className="size-4 shrink-0" />}
                  <span className="line-clamp-2">{m.shortTitle}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Messages */}
      <div ref={scroller} className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4">
        <Bubble role="assistant">
          <h3 className="mb-2 text-xl font-semibold leading-tight">{welcomeTitle}</h3>
          <Markdown>{welcomeBody}</Markdown>
        </Bubble>
        {messages.map((m) => (
          <Bubble key={m.id} role={m.role}>
            {m.role === "assistant" ? <Markdown>{m.content}</Markdown> : <p className="whitespace-pre-wrap text-sm">{m.content}</p>}
          </Bubble>
        ))}
        {streaming !== null && (
          <Bubble role="assistant">
            {streaming ? <Markdown>{streaming}</Markdown> : <Loader2 className="size-4 animate-spin text-muted-foreground" />}
          </Bubble>
        )}
      </div>

      {/* Composer */}
      <div className="p-3">
        <div className="rounded-xl border bg-card p-2 focus-within:border-brand-bright">
          {attachment && (
            <div className="mb-2 flex items-center gap-2 rounded-md bg-muted px-2 py-1 text-xs">
              <Paperclip className="size-3.5" />
              <span className="flex-1 truncate">{attachment.name}</span>
              <button onClick={() => setAttachment(null)} aria-label="Remove attachment">
                <X className="size-3.5" />
              </button>
            </div>
          )}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={2}
            placeholder={selected === "polish-proposal" ? "Attach a draft proposal or ask me anything..." : "Ask me anything..."}
            className="w-full resize-none bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground"
          />
          <div className="flex items-center justify-between">
            <Hint label="Attach a file" side="top">
              <Button variant="ghost" size="icon-sm" onClick={() => fileInput.current?.click()} disabled={attaching} aria-label="Attach file">
                {attaching ? <Loader2 className="animate-spin" /> : <Paperclip />}
              </Button>
            </Hint>
            <input
              ref={fileInput}
              type="file"
              accept=".pdf,.docx,.txt,.md,.csv"
              className="hidden"
              onChange={(e) => {
                attach(e.target.files);
                e.target.value = "";
              }}
            />
            {streaming !== null ? (
              <Button size="icon" variant="secondary" onClick={() => abort.current?.abort()} aria-label="Stop generating">
                <Square className="fill-current" />
              </Button>
            ) : (
              <Button size="icon" onClick={send} disabled={!input.trim() && !attachment} aria-label="Send">
                <Send />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-xl bg-brand px-3.5 py-2.5 text-white">{children}</div>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand text-white">
        <Bot className="size-4" />
      </span>
      <div className="min-w-0 max-w-[85%] rounded-xl bg-muted px-3.5 py-3">{children}</div>
    </div>
  );
}
