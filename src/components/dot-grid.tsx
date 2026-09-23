"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/**
 * Interactive canvas dot grid (inspired by React Bits' Dot Grid; written from scratch, no GSAP).
 * Dots tint toward the active color near the pointer, get pushed by fast pointer movement,
 * ripple outward on click/tap, and spring back. The loop only runs while something is moving.
 */
interface Props {
  className?: string;
  dotSize?: number;
  gap?: number;
  /** Radius (px) within which dots tint toward the active color. */
  proximity?: number;
  /** Share of grid positions that get a dot (0–1). Below 1, positions are dropped at random. */
  density?: number;
  /** Seed for the random dropout and size variation, so a card always looks the same. */
  seed?: number;
  /** Random per-dot size variation (0 = uniform). */
  sizeJitter?: number;
  /** If set, density fades across the grid along this angle (radians), thinning toward one edge. */
  fadeAngle?: number;
  shockRadius?: number;
  shockStrength?: number;
  /** Listen for pointer events on the window instead of the parent element. */
  global?: boolean;
}

interface Dot {
  x: number;
  y: number;
  r: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
}

const COLORS = {
  light: { base: [188, 188, 196], active: [25, 122, 86] },
  dark: { base: [52, 52, 58], active: [33, 191, 97] },
} as const;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashSeed(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

export function DotGrid({
  className,
  dotSize = 2,
  gap = 16,
  proximity = 120,
  density = 1,
  seed = 1,
  sizeJitter = 0,
  fadeAngle,
  shockRadius = 180,
  shockStrength = 4,
  global = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? COLORS.dark : COLORS.light;

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999, vx: 0, vy: 0, t: 0, inside: false };

    const build = () => {
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rand = mulberry32(seed);
      const cols = Math.floor(width / gap) + 1;
      const rows = Math.floor(height / gap) + 1;
      const offX = (width - (cols - 1) * gap) / 2;
      const offY = (height - (rows - 1) * gap) / 2;
      dots = [];
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          let p = density;
          if (fadeAngle !== undefined) {
            const t = ((i / Math.max(cols - 1, 1) - 0.5) * Math.cos(fadeAngle) + (j / Math.max(rows - 1, 1) - 0.5) * Math.sin(fadeAngle)) + 0.5;
            p *= 0.1 + 0.9 * Math.min(Math.max(t, 0), 1);
          }
          const keep = rand() < p;
          const jitter = 1 + (rand() - 0.5) * 2 * sizeJitter;
          if (!keep) continue;
          dots.push({ x: offX + i * gap, y: offY + j * gap, r: (dotSize / 2) * jitter, ox: 0, oy: 0, vx: 0, vy: 0 });
        }
      }
      draw();
    };

    const [br, bg, bb] = theme.base;
    const [ar, ag, ab] = theme.active;
    const prox2 = proximity * proximity;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const d of dots) {
        const px = d.x + d.ox;
        const py = d.y + d.oy;
        const dx = px - pointer.x;
        const dy = py - pointer.y;
        const dist2 = dx * dx + dy * dy;
        let fill: string;
        if (pointer.inside && dist2 < prox2) {
          const t = 1 - Math.sqrt(dist2) / proximity;
          fill = `rgb(${Math.round(br + (ar - br) * t)},${Math.round(bg + (ag - bg) * t)},${Math.round(bb + (ab - bb) * t)})`;
        } else {
          fill = `rgb(${br},${bg},${bb})`;
        }
        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.arc(px, py, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Spring physics: displaced dots accelerate back to rest with damping.
    const step = () => {
      raf = 0;
      let moving = false;
      for (const d of dots) {
        if (d.ox === 0 && d.oy === 0 && d.vx === 0 && d.vy === 0) continue;
        d.vx = (d.vx - d.ox * 0.08) * 0.84;
        d.vy = (d.vy - d.oy * 0.08) * 0.84;
        d.ox += d.vx;
        d.oy += d.vy;
        if (Math.abs(d.ox) < 0.05 && Math.abs(d.oy) < 0.05 && Math.abs(d.vx) < 0.05 && Math.abs(d.vy) < 0.05) {
          d.ox = d.oy = d.vx = d.vy = 0;
        } else {
          moving = true;
        }
      }
      draw();
      if (moving && visible) raf = requestAnimationFrame(step);
    };
    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(step);
    };

    const toLocal = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top, rect };
    };

    const onMove = (e: PointerEvent) => {
      const { x, y, rect } = toLocal(e);
      const now = performance.now();
      const dt = Math.max(now - pointer.t, 16);
      const first = pointer.t === 0 || !pointer.inside;
      pointer.vx = first ? 0 : ((x - pointer.x) / dt) * 16;
      pointer.vy = first ? 0 : ((y - pointer.y) / dt) * 16;
      pointer.x = x;
      pointer.y = y;
      pointer.t = now;
      const wasInside = pointer.inside;
      pointer.inside = x >= -proximity && y >= -proximity && x <= rect.width + proximity && y <= rect.height + proximity;
      if (!pointer.inside) {
        if (wasInside && !raf) draw();
        return;
      }
      const speed = Math.hypot(pointer.vx, pointer.vy);
      if (!reduced && speed > 6) {
        const push = Math.min(speed, 40) * 0.12;
        for (const d of dots) {
          const dx = d.x - x;
          const dy = d.y - y;
          const dist = Math.hypot(dx, dy);
          if (dist < proximity * 0.6) {
            const f = 1 - dist / (proximity * 0.6);
            d.vx += (pointer.vx / speed) * push * f;
            d.vy += (pointer.vy / speed) * push * f;
          }
        }
      }
      if (raf !== 0) return;
      if (reduced) draw();
      else kick();
    };

    const onLeave = () => {
      pointer.inside = false;
      pointer.x = pointer.y = -9999;
      draw();
    };

    const onDown = (e: PointerEvent) => {
      const { x, y } = toLocal(e);
      if (reduced) return;
      for (const d of dots) {
        const dx = d.x - x;
        const dy = d.y - y;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < shockRadius) {
          const f = (1 - dist / shockRadius) * shockStrength;
          d.vx += (dx / dist) * f;
          d.vy += (dy / dist) * f;
        }
      }
      kick();
    };

    const target: Window | HTMLElement = global ? window : host;
    target.addEventListener("pointermove", onMove as EventListener, { passive: true });
    target.addEventListener("pointerdown", onDown as EventListener, { passive: true });
    if (global) document.documentElement.addEventListener("pointerleave", onLeave);
    else host.addEventListener("pointerleave", onLeave);

    const ro = new ResizeObserver(build);
    ro.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(host);
    build();

    return () => {
      target.removeEventListener("pointermove", onMove as EventListener);
      target.removeEventListener("pointerdown", onDown as EventListener);
      if (global) document.documentElement.removeEventListener("pointerleave", onLeave);
      else host.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [dotSize, gap, proximity, density, seed, sizeJitter, fadeAngle, shockRadius, shockStrength, global, theme]);

  return <canvas ref={canvasRef} aria-hidden className={cn("pointer-events-none absolute inset-0", className)} />;
}
