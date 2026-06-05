import { create } from "zustand";

type ScrollState = {
  /** Overall page scroll progress, 0 → 1 (from Lenis). */
  progress: number;
  /** Id of the section currently in view (drives nav highlight + later the 3D camera). */
  active: string;
  setProgress: (progress: number) => void;
  setActive: (active: string) => void;
};

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  active: "top",
  setProgress: (progress) => set({ progress }),
  // avoid redundant re-renders when the active section hasn't changed
  setActive: (active) => set((s) => (s.active === active ? s : { active })),
}));
