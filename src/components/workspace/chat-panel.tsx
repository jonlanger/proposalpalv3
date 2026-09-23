"use client";

import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Bookmark as BookmarkIcon,
  Bot,
  ChevronDown,
  DollarSign,
  FileText,
  Info,
  Loader2,
  Monitor,
  Paperclip,
  Quote,
  Search,
  Send,
  Square,
  ThumbsUp,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useBookmarkActions } from "@/lib/bookmarks";
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
  const { proposal, selected, select, isRunning, threadId, setThreadId, generate, chatQuote, setChatQuote } = useWorkspace();
  const { add: addBookmark } = useBookmarkActions(proposal.id);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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
    if (chatQuote) textareaRef.current?.focus();
  }, [chatQuote]);

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
    const typed = input.trim();
    if ((!typed && !attachment && !chatQuote) || streaming !== null) return;
    // "Ask AI" on highlighted text arrives as a quote above the question.
    const text = chatQuote
      ? `${chatQuote.split("\n").map((l) => `> ${l}`).join("\n")}\n\n${typed || "Tell me more about this, and how it could strengthen the proposal."}`
      : typed;
    setChatQuote(null);
    const id = threadId ?? uid();
    if (!threadId) setThreadId(id);

    const userMsg: ChatMessage = {
      id: uid(),
      role: "user",
      content: attachment ? `${text || "Please review the attached file."}\n\n📎 ${attachment.name}` : text,
      createdAt: Date.now(),
    };
    const history = [...messages, userMsg];
    saveMessages(id, history, (typed || chatQuote || "").slice(0, 60) || attachment?.name);
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
    // Give up if nothing arrives for a while, rather than showing the stop button forever.
    let stalled = false;
    let idle = 0;
    const resetIdle = () => {
      window.clearTimeout(idle);
      idle = window.setTimeout(() => {
        stalled = true;
        controller.abort();
      }, 90_000);
    };
    resetIdle();
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
        resetIdle();
      }
      if (!reply.trim()) reply = "⚠️ **No response received.** The AI returned an empty answer. Please try again.";
    } catch (err) {
      if (stalled) {
        reply = `${reply}\n\n⚠️ **The AI stopped responding.** Please try again in a moment.`.trim();
      } else if ((err as Error).name !== "AbortError") {
        reply = `⚠️ **Error:** ${(err as Error).message}`;
      }
    } finally {
      window.clearTimeout(idle);
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
    <div className="flex h-full min-h-0 flex-col bg-background" data-module-id={selected}>
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
        {messages.map((m) =>
          m.role === "assistant" ? (
            <Bubble
              key={m.id}
              role="assistant"
              onBookmark={() => addBookmark({ text: m.content, moduleId: selected, sectionTitle: "Chat reply", source: "chat" })}
            >
              <Markdown>{m.content}</Markdown>
            </Bubble>
          ) : (
            <Bubble key={m.id} role="user">
              <Markdown className="text-white [&_blockquote]:border-white/50 [&_blockquote]:text-white/80">{m.content}</Markdown>
            </Bubble>
          ),
        )}
        {streaming !== null && (
          <Bubble role="assistant">
            {streaming ? (
              <Markdown>{streaming}</Markdown>
            ) : (
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" /> Thinking…
              </span>
            )}
          </Bubble>
        )}
      </div>

      {/* Composer */}
      <div className="p-3">
        <div className="rounded-xl border bg-card p-2 focus-within:border-brand-bright">
          {chatQuote && (
            <div className="mb-2 flex items-start gap-2 rounded-md border-l-2 border-brand-bright bg-muted px-2 py-1.5 text-xs">
              <Quote className="mt-0.5 size-3.5 shrink-0 text-brand-bright" />
              <span className="line-clamp-3 flex-1">{chatQuote}</span>
              <button onClick={() => setChatQuote(null)} aria-label="Remove quote">
                <X className="size-3.5" />
              </button>
            </div>
          )}
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
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={2}
            placeholder={
              chatQuote
                ? "Ask about the highlighted text…"
                : selected === "polish-proposal"
                  ? "Attach a draft proposal or ask me anything..."
                  : "Ask me anything..."
            }
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
              <Button size="icon" onClick={send} disabled={!input.trim() && !attachment && !chatQuote} aria-label="Send">
                <Send />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ role, children, onBookmark }: { role: "user" | "assistant"; children: React.ReactNode; onBookmark?: () => void }) {
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
      <div className="group/bubble min-w-0 max-w-[85%]">
        <div className="rounded-xl bg-muted px-3.5 py-3" data-selectable="chat">
          {children}
        </div>
        {onBookmark && (
          <button
            onClick={onBookmark}
            className="mt-1 flex items-center gap-1 rounded px-1.5 py-0.5 text-xs text-muted-foreground opacity-0 transition hover:text-brand-bright group-hover/bubble:opacity-100 [@media(hover:none)]:opacity-100"
          >
            <BookmarkIcon className="size-3.5" /> Bookmark reply
          </button>
        )}
      </div>
    </div>
  );
}
