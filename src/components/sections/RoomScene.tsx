"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useScrollStore } from "@/lib/store";
import { Window } from "@/components/y2k";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * ROOM — the breath after Work. The 3D camera pulls back to reveal the lo-fi
 * room (in the persistent canvas). Mobile / reduced-motion get a quiet
 * "stepped away" card instead.
 */
export function RoomScene() {
  const ref = useRef<HTMLElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const setDolly = useScrollStore((s) => s.setDolly);
  const setVis = useScrollStore((s) => s.setVis);

  useGSAP(
    () => {
      const el = ref.current;
      const caption = captionRef.current;
      if (!el || !caption) return;
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(caption, { opacity: 0 });
          const st = ScrollTrigger.create({
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              const p = self.progress;
              // pull the camera back to reveal the room, widest at section center
              setDolly(3 * Math.sin(p * Math.PI));
              // show the set-piece only while this section is on screen
              const vis =
                Math.min(1, Math.max(0, (p - 0.08) / 0.2)) *
                Math.min(1, Math.max(0, (0.92 - p) / 0.2));
              setVis({ room: vis });
              const o =
                p < 0.3
                  ? Math.max(0, (p - 0.12) / 0.18)
                  : p > 0.7
                    ? Math.max(0, (0.88 - p) / 0.18)
                    : 1;
              caption.style.opacity = String(o);
            },
          });
          return () => {
            st.kill();
            setDolly(0);
            setVis({ room: 0 });
            gsap.set(caption, { opacity: 1 });
          };
        },
      );
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="room"
      className="relative flex min-h-[150vh] flex-col items-center justify-start px-6"
    >
      <div
        ref={captionRef}
        className="pointer-events-none sticky top-[12vh] z-1 text-center"
      >
        <div className="inline-block rounded-(--y2k-radius) border-2 border-y2k-ink bg-y2k-surface px-5 py-3 shadow-(--y2k-shadow)">
          <p className="font-chrome text-xs text-y2k-ink/70 sm:text-sm">
            system: idle &middot;{" "}
            <span className="blink" aria-hidden>
              _
            </span>
          </p>
          <h2 className="font-display mt-1 text-3xl text-y2k-ink sm:text-4xl">
            take five
          </h2>
        </div>
      </div>

      {/* no-3D fallback: a quiet "afk" card */}
      <div className="mt-16 w-full max-w-sm md:motion-safe:hidden">
        <Window title="afk.txt" role="region" headingLevel={3} tilt={0.5}>
          <p className="font-body text-y2k-ink">
            Stepped away from the desk. Back soon &mdash; probably making coffee.
          </p>
        </Window>
      </div>
    </section>
  );
}
