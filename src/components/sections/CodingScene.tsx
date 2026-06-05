"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useScrollStore } from "@/lib/store";
import { Window } from "@/components/y2k";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* widths (%) for the static fallback "code" lines */
const FALLBACK_LINES = [
  ["w-10 bg-y2k-pink", "w-24 bg-y2k-sky"],
  ["w-16 bg-y2k-mint", "w-12 bg-y2k-butter", "w-8 bg-y2k-pink"],
  ["w-20 bg-y2k-sky"],
  ["w-12 bg-y2k-butter", "w-28 bg-y2k-mint"],
  ["w-14 bg-y2k-pink", "w-10 bg-y2k-sky"],
];

/**
 * WORKSPACE — a transparent beat that lets the 3D workstation (in the persistent
 * canvas) take the stage; the camera dollies in toward the editor as you scroll.
 * Mobile / reduced-motion (no canvas) get a static editor mock instead.
 */
export function CodingScene() {
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
          // hidden until you scroll into the section (revealed as the camera zooms in)
          gsap.set(caption, { opacity: 0 });
          const st = ScrollTrigger.create({
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              const p = self.progress;
              // push the camera in toward the screen, deepest at section center
              setDolly(-2.6 * Math.sin(p * Math.PI));
              // show the set-piece only while this section is on screen
              const vis =
                Math.min(1, Math.max(0, (p - 0.08) / 0.2)) *
                Math.min(1, Math.max(0, (0.92 - p) / 0.2));
              setVis({ workspace: vis });
              // fade the caption in around the centre, out before the next section
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
            setVis({ workspace: 0 });
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
      id="workspace"
      className="relative flex min-h-[150vh] flex-col items-center justify-start px-6"
    >
      <div
        ref={captionRef}
        className="pointer-events-none sticky top-[12vh] z-1 text-center"
      >
        <div className="inline-block rounded-(--y2k-radius) border-2 border-y2k-ink bg-y2k-surface px-5 py-3 shadow-(--y2k-shadow)">
          <p className="font-chrome text-xs text-y2k-ink/70 sm:text-sm">
            kareem@os:~$ npm run build
          </p>
          <h2 className="font-display mt-1 text-3xl text-y2k-ink sm:text-4xl">
            where it gets made
          </h2>
        </div>
      </div>

      {/* no-3D fallback: a static editor window */}
      <div className="mt-16 w-full max-w-md md:motion-safe:hidden">
        <Window title="editor.exe" role="region" headingLevel={3} tilt={-0.5}>
          <div className="space-y-2 bg-y2k-ink p-3">
            {FALLBACK_LINES.map((line, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="font-chrome w-4 text-right text-[10px] text-white/30">
                  {i + 1}
                </span>
                {line.map((seg, j) => (
                  <span
                    key={j}
                    className={`h-2.5 rounded-sm ${seg}`}
                    style={{ marginLeft: j === 0 && i % 2 ? 12 : 0 }}
                  />
                ))}
              </div>
            ))}
          </div>
        </Window>
      </div>
    </section>
  );
}
