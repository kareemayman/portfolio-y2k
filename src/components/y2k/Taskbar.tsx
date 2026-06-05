"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { Button } from "./Button";

type Section = { label: string; href: string };

const DEFAULT_SECTIONS: Section[] = [
  { label: "about_me.txt", href: "#about" },
  { label: "projects/", href: "#work" },
  { label: "playground/", href: "#playground" },
  { label: "contact.exe", href: "#contact" },
];

/**
 * Sticky bottom taskbar — the site's primary nav. Start button opens a menu
 * of sections; a live clock sits on the right.
 */
export function Taskbar({
  sections = DEFAULT_SECTIONS,
}: {
  sections?: Section[];
}) {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Live clock — set on mount to avoid SSR/CSR hydration mismatch.
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      );
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  // Close the Start menu on Escape or outside click.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  return (
    <nav className="y2k-taskbar" aria-label="Primary">
      <div className="relative" ref={ref}>
        <Button
          className="y2k-start"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden>❤</span> Start
        </Button>
        {open && (
          <ul className="y2k-startmenu" role="menu" aria-label="Sections">
            {sections.map((s) => (
              <li key={s.href} role="none">
                <a
                  role="menuitem"
                  className="y2k-startmenu__item"
                  href={s.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    const el = document.querySelector(s.href);
                    if (el) lenis?.scrollTo(el as HTMLElement, { offset: -8 });
                  }}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <time className="y2k-clock" suppressHydrationWarning>
        {time || "--:--"}
      </time>
    </nav>
  );
}
