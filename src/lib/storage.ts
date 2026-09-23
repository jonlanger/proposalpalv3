"use client";

import { useCallback, useSyncExternalStore } from "react";
import { DEMO_PROPOSALS, demoContent } from "@/data/demos";
import { MODULE_IDS } from "./modules";
import type { Bookmark, ChatThread, DataSource, ModuleContent, ModuleId, Proposal } from "./types";

const PREFIX = "pp:";
const CHANGE_EVENT = "pp-storage";

export const keys = {
  proposals: `${PREFIX}proposals`,
  module: (pid: string, mid: ModuleId) => `${PREFIX}module:${pid}:${mid}`,
  chats: (pid: string) => `${PREFIX}chats:${pid}`,
  bookmarks: (pid: string) => `${PREFIX}bookmarks:${pid}`,
  sources: (pid: string) => `${PREFIX}sources:${pid}`,
  /** Set once a demo proposal's pre-filled module content has been written. */
  seeded: (pid: string) => `${PREFIX}seeded:${pid}`,
  /** Which set of demo proposals this browser has been given. */
  demoVersion: `${PREFIX}demoVersion`,
};

const DEMO_VERSION = 2;

// Parsed values are cached by raw string so useSyncExternalStore gets stable snapshots.
const cache = new Map<string, { raw: string | null; value: unknown }>();

function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const raw = readRaw(key);
  const hit = cache.get(key);
  if (hit && hit.raw === raw) return (hit.value ?? fallback) as T;
  let value: unknown = null;
  if (raw != null) {
    try {
      value = JSON.parse(raw);
    } catch {
      value = null;
    }
  }
  cache.set(key, { raw, value });
  return (value ?? fallback) as T;
}

export function write<T>(key: string, value: T | null) {
  try {
    if (value == null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("localStorage write failed", err);
    throw new Error("Browser storage is full. Remove some uploaded files or old proposals.");
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: key }));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Reactive localStorage value. Returns `fallback` during SSR and when unset. */
export function useStored<T>(key: string, fallback: T): [T, (next: T | ((prev: T) => T)) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => read(key, fallback),
    () => fallback,
  );
  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      const prev = read(key, fallback);
      write(key, typeof next === "function" ? (next as (p: T) => T)(prev) : next);
    },
    // fallback is expected to be a stable constant
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );
  return [value, set];
}

/** True once mounted on the client, so pages can avoid rendering SSR fallbacks as real data. */
export function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

// ---- Proposals -------------------------------------------------------------

const EMPTY: never[] = [];
/** Until the user changes anything, the list contains the demo proposals. */
const SEEDED: Proposal[] = DEMO_PROPOSALS;

/**
 * Adds demo proposals introduced after this browser first saved its list, without touching
 * the user's own proposals. Deleted demos are not re-added once this version has run.
 */
export function migrateDemos() {
  if (typeof window === "undefined") return;
  if (read<number>(keys.demoVersion, 0) >= DEMO_VERSION) return;
  if (readRaw(keys.proposals) != null) {
    const all = read<Proposal[]>(keys.proposals, SEEDED);
    const missing = DEMO_PROPOSALS.filter((d) => !all.some((p) => p.id === d.id));
    if (missing.length) write(keys.proposals, [...all, ...missing]);
  }
  write(keys.demoVersion, DEMO_VERSION);
}

/** Writes a demo proposal's pre-filled module content, keeping anything already generated. */
export function seedDemoContent(pid: string) {
  const content = demoContent(pid);
  if (!content || read(keys.seeded(pid), false)) return;
  for (const mid of MODULE_IDS) {
    const c = content[mid];
    if (c && readRaw(keys.module(pid, mid)) == null) write(keys.module(pid, mid), { ...c, generatedAt: Date.now() });
  }
  write(keys.seeded(pid), true);
}

export const isDemoProposal = (pid: string) => DEMO_PROPOSALS.some((p) => p.id === pid);

export function useProposals() {
  return useStored<Proposal[]>(keys.proposals, SEEDED);
}

export function useProposal(id: string) {
  const [proposals, setProposals] = useProposals();
  const proposal = proposals.find((p) => p.id === id);
  const update = useCallback(
    (patch: Partial<Proposal>) =>
      setProposals((all) => all.map((p) => (p.id === id ? { ...p, ...patch, updatedAt: Date.now() } : p))),
    [id, setProposals],
  );
  return [proposal, update] as const;
}

export function saveProposal(p: Proposal) {
  const all = read<Proposal[]>(keys.proposals, SEEDED);
  const exists = all.some((x) => x.id === p.id);
  write(keys.proposals, exists ? all.map((x) => (x.id === p.id ? p : x)) : [p, ...all]);
}

export function deleteProposal(id: string) {
  const all = read<Proposal[]>(keys.proposals, SEEDED);
  write(keys.proposals, all.filter((p) => p.id !== id));
  const toRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(PREFIX) && k.includes(`:${id}`)) toRemove.push(k);
  }
  toRemove.forEach((k) => localStorage.removeItem(k));
}

// ---- Per-proposal workspace data ------------------------------------------

export function useModuleContent(pid: string, mid: ModuleId) {
  return useStored<ModuleContent | null>(keys.module(pid, mid), null);
}

export function readModuleContent(pid: string, mid: ModuleId) {
  return read<ModuleContent | null>(keys.module(pid, mid), null);
}

export function writeModuleContent(pid: string, mid: ModuleId, content: ModuleContent | null) {
  write(keys.module(pid, mid), content);
}

const allCache = new Map<string, { sig: string; value: Partial<Record<ModuleId, ModuleContent>> }>();
const NO_CONTENT: Partial<Record<ModuleId, ModuleContent>> = {};

/** Snapshot of every module's stored content for a proposal, keyed by module id. */
export function useAllModuleContent(pid: string, ids: readonly ModuleId[]) {
  return useSyncExternalStore(
    subscribe,
    () => {
      const sig = ids.map((id) => readRaw(keys.module(pid, id)) ?? "").join("\u0000");
      const hit = allCache.get(pid);
      if (hit && hit.sig === sig) return hit.value;
      const value: Partial<Record<ModuleId, ModuleContent>> = {};
      for (const id of ids) {
        const c = read<ModuleContent | null>(keys.module(pid, id), null);
        if (c) value[id] = c;
      }
      allCache.set(pid, { sig, value });
      return value;
    },
    () => NO_CONTENT,
  );
}

export function useChats(pid: string) {
  return useStored<ChatThread[]>(keys.chats(pid), EMPTY);
}

export function useBookmarks(pid: string) {
  return useStored<Bookmark[]>(keys.bookmarks(pid), EMPTY);
}

export interface SourcesState {
  available: DataSource[];
  added: DataSource[];
}

const EMPTY_SOURCES: SourcesState = { available: [], added: [] };

export function useSources(pid: string) {
  return useStored<SourcesState>(keys.sources(pid), EMPTY_SOURCES);
}

export const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
