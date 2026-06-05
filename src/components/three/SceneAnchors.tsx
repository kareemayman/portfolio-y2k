"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollStore } from "@/lib/store";
import { cameraYForProgress } from "@/lib/camera";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Section ids whose centered scroll position anchors a 3D set-piece. */
const ANCHORED = ["workspace", "room"] as const;

/**
 * Measures where the set-piece sections sit in the scroll, and writes the world
 * Y the camera looks at when each is centered — so the 3D set-pieces frame
 * correctly no matter how the pinned Work gallery shifts the layout. Renders
 * nothing; recomputes on every ScrollTrigger refresh (resize, font load, etc.).
 */
export function SceneAnchors() {
  const setAnchors = useScrollStore((s) => s.setAnchors);

  useGSAP(() => {
    const measure = () => {
      const max = ScrollTrigger.maxScroll(window) || 1;
      const next: Record<string, number> = {};
      for (const id of ANCHORED) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const center = top + rect.height / 2;
        // scroll position at which the section is centered in the viewport
        const scrollAtCenter = center - window.innerHeight / 2;
        const p = Math.min(1, Math.max(0, scrollAtCenter / max));
        next[id] = cameraYForProgress(p);
      }
      setAnchors(next);
    };

    measure();
    ScrollTrigger.addEventListener("refresh", measure);
    ScrollTrigger.refresh();
    return () => ScrollTrigger.removeEventListener("refresh", measure);
  }, []);

  return null;
}
