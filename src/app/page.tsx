/*
 * KAREEM.OS — Phase 1 placeholder.
 * A static "boot" panel that proves the design tokens + three font roles
 * (Pixelify display / W95FA chrome / Bricolage body) render on-brand.
 * The full boot sequence, desktop, and scroll story land in later phases.
 */
export default function Home() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden p-6">
      {/* atmosphere: scanlines + CRT vignette (non-interactive) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-1"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(0,0,0,.05) 0 1px, transparent 1px 3px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-1"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 50%, transparent 60%, var(--y2k-bg-deep) 100%)",
        }}
      />

      {/* sticker accents bleeding past the panel */}
      <span
        aria-hidden
        className="font-display pointer-events-none absolute left-[10%] top-[16%] -rotate-12 text-5xl text-y2k-pink-hot [text-shadow:3px_3px_0_var(--y2k-ink)]"
      >
        ✦
      </span>
      <span
        aria-hidden
        className="font-display pointer-events-none absolute right-[12%] bottom-[18%] rotate-12 text-4xl text-y2k-mint [text-shadow:3px_3px_0_var(--y2k-ink)]"
      >
        ❤
      </span>

      {/* boot window */}
      <section className="relative z-2 w-full max-w-xl rotate-[-0.6deg] rounded-(--y2k-radius) border-2 border-y2k-ink bg-y2k-surface shadow-(--y2k-shadow)">
        <header
          className="flex items-center justify-between rounded-t-(--y2k-radius) border-b-2 border-y2k-ink px-2 py-1"
          style={{ background: "var(--y2k-titlebar-active)" }}
        >
          <span className="font-chrome text-sm text-white [text-shadow:1px_1px_0_rgba(0,0,0,.4)]">
            KAREEM.OS
          </span>
          <span className="flex gap-1" aria-hidden>
            <span className="grid h-[18px] w-[18px] place-items-center border-2 border-y2k-ink bg-y2k-lilac font-chrome text-xs text-y2k-ink shadow-(--y2k-bevel-out)">
              _
            </span>
            <span className="grid h-[18px] w-[18px] place-items-center border-2 border-y2k-ink bg-y2k-lilac font-chrome text-[10px] text-y2k-ink shadow-(--y2k-bevel-out)">
              ▢
            </span>
            <span className="grid h-[18px] w-[18px] place-items-center border-2 border-y2k-ink bg-y2k-pink font-chrome text-xs text-y2k-ink shadow-(--y2k-bevel-out)">
              ×
            </span>
          </span>
        </header>

        <div className="px-6 py-8 sm:px-8">
          <p className="font-chrome text-xs uppercase tracking-[0.2em] text-y2k-ink/70">
            booting&hellip;
          </p>

          <h1 className="mt-2">
            <span className="font-display block text-5xl leading-none text-y2k-ink sm:text-6xl">
              KAREEM<span className="text-y2k-pink-hot">.OS</span>
            </span>
            <span className="font-chrome mt-3 block text-sm text-y2k-ink">
              Kareem Ayman &middot; Frontend Developer
            </span>
          </h1>

          <p className="font-body mt-5 max-w-[60ch] text-y2k-ink">
            I spend my days making buttons feel nice to press. Some of them even
            work.
          </p>

          <p className="font-chrome mt-6 flex items-center gap-2 text-sm text-y2k-ink">
            scroll to start
            <span className="blink" aria-hidden>
              ▾
            </span>
          </p>
        </div>

        <footer className="flex items-center justify-between rounded-b-(--y2k-radius) border-t-2 border-y2k-ink bg-y2k-surface-alt px-3 py-1 font-chrome text-xs text-y2k-ink">
          <span>v0.1 &middot; phase 1</span>
          <span>&copy; 2026 Kareem Ayman</span>
        </footer>
      </section>
    </main>
  );
}
