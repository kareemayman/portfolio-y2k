import { create } from "zustand";

/** World-Y positions for the scroll-anchored 3D set-pieces (computed at runtime
 *  from each section's measured scroll position so they frame correctly even
 *  with the pinned Work gallery in between). */
type Anchors = { workspace: number; room: number };

/** Per-set-piece visibility (0→1), driven by each section's own scroll progress
 *  so a set-piece only shows while its section is on screen. */
type Vis = { workspace: number; room: number };

type ScrollState = {
  /** Overall page scroll progress, 0 → 1 (from Lenis). */
  progress: number;
  /** Id of the section currently in view (drives nav highlight + the 3D camera). */
  active: string;
  /** Camera dolly offset on Z (set-piece sections push in / pull back). */
  dolly: number;
  anchors: Anchors;
  vis: Vis;
  setProgress: (progress: number) => void;
  setActive: (active: string) => void;
  setDolly: (dolly: number) => void;
  setAnchors: (anchors: Partial<Anchors>) => void;
  setVis: (vis: Partial<Vis>) => void;
};

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  active: "top",
  dolly: 0,
  anchors: { workspace: -1.5, room: -6 },
  vis: { workspace: 0, room: 0 },
  setProgress: (progress) => set({ progress }),
  // avoid redundant re-renders when the active section hasn't changed
  setActive: (active) => set((s) => (s.active === active ? s : { active })),
  setDolly: (dolly) => set((s) => (s.dolly === dolly ? s : { dolly })),
  setAnchors: (anchors) => set((s) => ({ anchors: { ...s.anchors, ...anchors } })),
  setVis: (vis) => set((s) => ({ vis: { ...s.vis, ...vis } })),
}));
