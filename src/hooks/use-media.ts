"use client";

import { useSyncExternalStore } from "react";

/** True while the media query matches. False during SSR. */
export function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Below Tailwind's `lg` breakpoint the workspace shows one pane at a time. */
export const useIsMobile = () => useMedia("(max-width: 1023px)");
