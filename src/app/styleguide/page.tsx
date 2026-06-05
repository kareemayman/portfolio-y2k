import type { Metadata } from "next";
import Link from "next/link";
import { Button, DesktopIcon, TextField, Taskbar, Window } from "@/components/y2k";

export const metadata: Metadata = {
  title: "Styleguide · KAREEM.OS",
  description: "The KAREEM.OS component kit.",
  robots: { index: false, follow: false },
};

const PALETTE: [token: string, hex: string, use: string][] = [
  ["--y2k-bg", "#c4b5f0", "desktop"],
  ["--y2k-bg-deep", "#a98fe0", "depth"],
  ["--y2k-surface", "#ffffff", "window fill"],
  ["--y2k-surface-alt", "#f1ecff", "sunken / alt"],
  ["--y2k-lilac", "#d7c8ff", "chrome"],
  ["--y2k-ink", "#1c1530", "ink / lines"],
  ["--y2k-pink", "#ff8fc7", "accent"],
  ["--y2k-pink-hot", "#ff4fa0", "accent · hot"],
  ["--y2k-mint", "#8fe8c4", "accent"],
  ["--y2k-butter", "#ffe08a", "accent"],
  ["--y2k-sky", "#8fb8ff", "accent"],
];

export default function Styleguide() {
  return (
    <main className="relative mx-auto max-w-5xl px-5 pb-28 pt-10">
      {/* subtle scanline atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-1"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(0,0,0,.04) 0 1px, transparent 1px 3px)",
        }}
      />

      <header className="relative z-2 mb-10">
        <p className="font-chrome text-xs uppercase tracking-[0.2em] text-y2k-ink/60">
          system &rsaquo; developer tools
        </p>
        <h1 className="font-display mt-1 text-4xl text-y2k-ink sm:text-5xl">
          KAREEM<span className="text-y2k-pink-hot">.OS</span> &mdash; styleguide
        </h1>
        <p className="font-body mt-2 max-w-[60ch] text-y2k-ink">
          Every chrome primitive in one place. Approve the look here before any
          motion or 3D goes in.{" "}
          <Link
            href="/"
            className="underline decoration-y2k-pink-hot decoration-2 underline-offset-2"
          >
            back to boot
          </Link>
        </p>
      </header>

      <div className="relative z-2 grid gap-8">
        {/* Palette */}
        <Window title="palette.pal" tilt={0} role="region" controls={false}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {PALETTE.map(([token, hex, use]) => (
              <div
                key={token}
                className="overflow-hidden rounded-(--y2k-radius) border-2 border-y2k-ink shadow-(--y2k-shadow)"
              >
                <div className="h-16" style={{ background: `var(${token})` }} />
                <div className="bg-y2k-surface px-2 py-1 font-chrome text-[11px] leading-tight text-y2k-ink">
                  <div>{token.replace("--y2k-", "")}</div>
                  <div className="text-y2k-ink/60">
                    {hex} &middot; {use}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Window>

        {/* Typography */}
        <Window title="type.ttf" tilt={0} role="region" controls={false}>
          <div className="grid gap-5">
            <div>
              <p className="font-chrome text-xs uppercase tracking-[0.2em] text-y2k-ink/60">
                display &middot; Pixelify Sans
              </p>
              <p className="font-display mt-1 text-4xl text-y2k-ink">
                Boot. Build. Repeat.
              </p>
            </div>
            <div>
              <p className="font-chrome text-xs uppercase tracking-[0.2em] text-y2k-ink/60">
                chrome &middot; W95FA
              </p>
              <p className="font-chrome mt-1 text-xl text-y2k-ink">
                File&nbsp;&nbsp;Edit&nbsp;&nbsp;View&nbsp;&nbsp;Help &mdash; 0123456789
              </p>
            </div>
            <div>
              <p className="font-chrome text-xs uppercase tracking-[0.2em] text-y2k-ink/60">
                body &middot; Bricolage Grotesque
              </p>
              <p className="font-body mt-1 max-w-[60ch] text-y2k-ink">
                Body copy lives on white, in ink, at a comfortable measure &mdash;
                because pastel-on-pastel reading surfaces are a war crime and pixel
                fonts at paragraph length are exhausting.
              </p>
            </div>
          </div>
        </Window>

        {/* Buttons */}
        <Window title="buttons.exe" tilt={0} role="region" controls={false}>
          <div className="flex flex-wrap items-center gap-3">
            <Button>OK</Button>
            <Button variant="primary">Send</Button>
            <Button variant="mint">Open</Button>
            <Button disabled>Disabled</Button>
          </div>
          <p className="font-body mt-3 text-sm text-y2k-ink/70">
            Hover to lift; click to press in. Focus shows a dotted ink ring.
          </p>
        </Window>

        {/* Windows */}
        <Window title="windows.sys" tilt={0} role="region" controls={false}>
          <div className="flex flex-wrap gap-6">
            <Window title="about_me.txt" tilt={0} role="region" className="max-w-sm flex-1">
              <p className="font-body text-y2k-ink">
                Active window: bright gradient title bar, beveled controls, hard
                sticker shadow.
              </p>
            </Window>
            <Window
              title="defrag.exe"
              tilt={0}
              inactive
              role="region"
              className="max-w-sm flex-1"
            >
              <p className="font-body text-y2k-ink">
                Inactive window: muted title bar, same chrome. Used for any window
                that isn&rsquo;t focused.
              </p>
            </Window>
          </div>
        </Window>

        {/* Fields */}
        <Window title="fields.ini" tilt={0} role="region" controls={false}>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="your name" name="name" placeholder="Clippy" />
            <TextField
              label="email"
              name="email"
              type="email"
              placeholder="you@domain.com"
            />
            <div className="sm:col-span-2">
              <TextField
                label="message"
                name="message"
                multiline
                rows={4}
                placeholder="say hi ✿"
              />
            </div>
          </div>
        </Window>

        {/* Icons */}
        <Window title="icons/" tilt={0} role="region" controls={false}>
          <div className="flex flex-wrap gap-2">
            <DesktopIcon glyph="📁" label="projects" />
            <DesktopIcon glyph="💾" label="resume" />
            <DesktopIcon glyph="🗑️" label="recycle" />
            <DesktopIcon glyph="💌" label="contact" />
          </div>
          <p className="font-body mt-3 text-sm text-y2k-ink/70">
            Emoji are placeholders &mdash; pixel-art icons drop in later. Tab to an
            icon to see the selected-label treatment.
          </p>
        </Window>

        {/* Extras: tooltip + scrollbar */}
        <Window title="extras.dll" tilt={0} role="region" controls={false}>
          <div className="grid gap-5">
            <div>
              <p className="font-chrome mb-2 text-xs uppercase tracking-[0.2em] text-y2k-ink/60">
                tooltip / status
              </p>
              <span className="y2k-tooltip">tip: double-click to open ✿</span>
            </div>
            <div>
              <p className="font-chrome mb-2 text-xs uppercase tracking-[0.2em] text-y2k-ink/60">
                retro scrollbar (.y2k-scroll)
              </p>
              <div className="y2k-scroll h-32 max-w-sm overflow-y-auto rounded-(--y2k-radius) border-2 border-y2k-ink bg-y2k-surface-alt p-3 font-body text-sm text-y2k-ink">
                <p>Scroll me.</p>
                <p className="mt-3">
                  The thumb is a beveled lilac block with an ink border; it turns
                  pink on hover.
                </p>
                <p className="mt-3">Keep going&hellip;</p>
                <p className="mt-3">A little more&hellip;</p>
                <p className="mt-3">Almost there&hellip;</p>
                <p className="mt-3">✿ end of file ✿</p>
              </div>
            </div>
          </div>
        </Window>
      </div>

      {/* The real taskbar, fixed to the bottom (primary nav in context) */}
      <Taskbar />
    </main>
  );
}
