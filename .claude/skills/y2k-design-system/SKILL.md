---
name: y2k-design-system
description: >
  The visual + component design system for this portfolio: a kawaii Y2K
  desktop-OS aesthetic (pastel lilac/pink, pixel fonts, draggable windows,
  CRT glow, sticker shadows). USE THIS SKILL whenever building, styling, or
  refining ANY part of this site's UI — components, pages, sections, windows,
  buttons, forms, icons, cursors, backgrounds, or microcopy — even if the
  request doesn't say "Y2K" or "design system". If you're about to write
  JSX/HTML/CSS/Tailwind for this project, consult this first so the output
  stays on-brand instead of drifting to generic gray Win95 or default
  AI-pastel. Governs LOOK and COMPONENTS only; defer scroll choreography to
  the GSAP skill and WebGL to the R3F/3D skill.
---

# Y2K Design System — kawaii desktop OS

The whole site is a personal retro operating system rendered in a **kawaii Y2K / vaporwave** palette — think the inside of a customized late-90s/early-2000s computer that belonged to someone with great taste: pastel lilac desktop, bubblegum-pink window chrome, pixel type, emoji/sticker accents, soft CRT glow, hard-edged shadows. It is **not** the corporate battleship-gray Windows look, and it is **not** smooth modern AI-pastel.

Aim for *intentional, period-accurate maximalism executed with precision* — every cursor, shadow, and bit of microcopy should reinforce the world.

## Scope & boundaries

- **This skill owns:** color, type, components (windows, buttons, fields, taskbar, icons), cursors, textures/atmosphere, layout feel, in-world copy, component-level micro-motion, and accessibility of the skinned UI.
- **This skill does NOT own:** scroll storytelling (→ GSAP/ScrollTrigger skill) or 3D/WebGL scenes (→ React Three Fiber skill). When a task is about *motion down the page* or *the 3D scene*, hand off — but the visual tokens here still apply to anything those produce.

## Design tokens (copy these into `:root`)

Use CSS variables for everything; never hard-code hex in components.

```css
:root {
  /* surfaces */
  --y2k-bg:          #c4b5f0;  /* periwinkle/lilac desktop */
  --y2k-bg-deep:     #a98fe0;  /* for depth / vignette edges */
  --y2k-surface:     #ffffff;  /* window fill — use for ALL reading surfaces */
  --y2k-surface-alt: #f1ecff;  /* sunken fields, alt rows */
  --y2k-lilac:       #d7c8ff;

  /* ink + lines (near-black, never pure #000 except hairlines) */
  --y2k-ink:   #1c1530;
  --y2k-line:  #1c1530;

  /* accents — dominant lilac, sharp pops of these */
  --y2k-pink:      #ff8fc7;
  --y2k-pink-hot:  #ff4fa0;
  --y2k-mint:      #8fe8c4;
  --y2k-butter:    #ffe08a;
  --y2k-sky:       #8fb8ff;

  /* chrome (diegetic gradients are OK ONLY on title bars) */
  --y2k-titlebar-active:   linear-gradient(90deg, var(--y2k-pink-hot), var(--y2k-sky));
  --y2k-titlebar-inactive: linear-gradient(90deg, var(--y2k-lilac), var(--y2k-surface-alt));

  /* shape + depth — HARD shadows, no blur */
  --y2k-radius: 6px;                    /* gently rounded, not pill */
  --y2k-shadow: 4px 4px 0 var(--y2k-ink);
  --y2k-shadow-pink: 4px 4px 0 var(--y2k-pink-hot);
  --y2k-border: 2px solid var(--y2k-ink);

  /* bevels for press feedback (authentic 9x feel, recolored) */
  --y2k-bevel-out: inset -2px -2px 0 #b9a9e6, inset 2px 2px 0 #ffffff;
  --y2k-bevel-in:  inset 2px 2px 0 #b9a9e6, inset -2px -2px 0 #ffffff;

  /* spacing scale (keep tight + consistent) */
  --y2k-1: 4px; --y2k-2: 8px; --y2k-3: 12px; --y2k-4: 16px; --y2k-6: 24px; --y2k-8: 32px;

  /* z-index — windows stack above desktop, taskbar above all */
  --z-desktop: 0; --z-icons: 10; --z-window: 100; --z-window-active: 200; --z-taskbar: 1000; --z-cursor-fx: 2000;
}
```

**Color rules:** lilac dominates the field; pink/mint/butter/sky are *accents and stickers*, not large fills. Body text is always `--y2k-ink` on `--y2k-surface` (white) — never pastel-on-pastel for anything readable.

## Typography

Three roles. Self-host via `next/font/local`; preload only the display face.

| Role | Use for | Pick (free) |
|---|---|---|
| **Display** | hero, section titles, big numbers | `Pixelify Sans`, `W95FA`, or `VT323` |
| **Chrome** | title bars, buttons, menus, labels | an `MS Sans Serif` clone (React95 ships `ms_sans_serif.woff2`) or `W95FA` |
| **Body** | paragraphs, case-study copy | a *readable* face with character: `Bricolage Grotesque`, `Schibsted Grotesk`, or mono `Departure Mono` / `Geist Mono` |

Rules:
- **Never** use Inter, Roboto, Arial, Helvetica, system-ui, or **Space Grotesk** — they read as generic/AI.
- Pixel fonts are for **display and short labels only**. Long-form reading uses the body face — pixel paragraphs are exhausting.
- For true bitmap fonts, add `image-rendering: pixelated;` and disable smoothing (`-webkit-font-smoothing: none;`) *only on those elements*, never globally.
- Tighten display tracking slightly; give body text comfortable line-height (~1.6) and a max measure of ~68ch.

## Core components

Build these once into a kit and reuse. Keep markup semantic (see Accessibility). Snippets are React+CSS; adapt to your Tailwind setup but keep the token names.

### Window
```jsx
<section className="y2k-window" role="dialog" aria-labelledby="win-about-title">
  <header className="y2k-titlebar">
    <h2 id="win-about-title" className="y2k-titlebar__title">about_me.txt</h2>
    <div className="y2k-titlebar__controls">
      <button aria-label="Minimize" className="y2k-ctrl">_</button>
      <button aria-label="Maximize" className="y2k-ctrl">▢</button>
      <button aria-label="Close" className="y2k-ctrl y2k-ctrl--close">×</button>
    </div>
  </header>
  <div className="y2k-window__body">{/* content */}</div>
</section>
```
```css
.y2k-window {
  background: var(--y2k-surface);
  border: var(--y2k-border);
  border-radius: var(--y2k-radius);
  box-shadow: var(--y2k-shadow);
  transform: rotate(-0.6deg);        /* tiny sticker tilt; vary per window ±1.5deg, reset on hover/focus */
}
.y2k-titlebar {
  display: flex; align-items: center; justify-content: space-between;
  background: var(--y2k-titlebar-active);
  color: #fff; border-bottom: var(--y2k-border);
  padding: var(--y2k-1) var(--y2k-2);
}
.y2k-titlebar__title { font: 14px/1 "ms_sans_serif", sans-serif; text-shadow: 1px 1px 0 rgba(0,0,0,.4); }
.y2k-window:not(.is-active) .y2k-titlebar { background: var(--y2k-titlebar-inactive); color: var(--y2k-ink); }
.y2k-ctrl { width: 18px; height: 18px; border: var(--y2k-border); background: var(--y2k-lilac); box-shadow: var(--y2k-bevel-out); }
.y2k-ctrl--close { background: var(--y2k-pink); }
```

### Button
```css
.y2k-btn {
  font: 14px "ms_sans_serif", sans-serif;
  color: var(--y2k-ink);
  background: var(--y2k-lilac);
  border: var(--y2k-border);
  border-radius: var(--y2k-radius);
  padding: var(--y2k-2) var(--y2k-4);
  box-shadow: var(--y2k-bevel-out);
  cursor: var(--cur-pointer, pointer);
  transition: transform .08s steps(2), box-shadow .08s;
}
.y2k-btn:hover  { transform: translate(-1px,-1px); }
.y2k-btn:active { transform: translate(1px,1px); box-shadow: var(--y2k-bevel-in); }  /* presses IN */
.y2k-btn--primary { background: var(--y2k-pink); }
.y2k-btn:focus-visible { outline: 2px dotted var(--y2k-ink); outline-offset: 2px; }
```

### Text field
```css
.y2k-field {
  background: var(--y2k-surface);
  border: var(--y2k-border);
  box-shadow: var(--y2k-bevel-in);          /* sunken */
  padding: var(--y2k-2); font: 14px "Departure Mono", monospace;
}
```

### Taskbar + Start
A sticky bottom bar is the **primary navigation**. Start-style button opens a menu of sections; show a live clock on the right.
```css
.y2k-taskbar {
  position: fixed; inset: auto 0 0 0; z-index: var(--z-taskbar);
  display: flex; align-items: center; gap: var(--y2k-2);
  background: var(--y2k-lilac); border-top: var(--y2k-border);
  box-shadow: var(--y2k-bevel-out); padding: var(--y2k-1) var(--y2k-2);
}
.y2k-start { font-weight: 700; background: var(--y2k-mint); /* + .y2k-btn styles */ }
.y2k-clock { margin-left: auto; font: 13px "Departure Mono", monospace; border: var(--y2k-border); box-shadow: var(--y2k-bevel-in); padding: 2px 8px; }
```

### Icon (desktop / folder)
Pixel-art icon + label, double-click/Enter to open the matching window.
```jsx
<button className="y2k-icon" aria-label="Open Projects folder">
  <img src="/icons/folder.png" alt="" width="48" height="48" style={{imageRendering:'pixelated'}} />
  <span>projects</span>
</button>
```
```css
.y2k-icon { display:grid; gap:var(--y2k-1); justify-items:center; color:var(--y2k-ink); }
.y2k-icon span { font:12px "ms_sans_serif"; background:rgba(255,255,255,.0); }
.y2k-icon:focus-visible span, .y2k-icon[aria-selected="true"] span { background: var(--y2k-pink); outline: 1px dotted var(--y2k-ink); }
```

### Tooltip / status text
Small pixel tooltips on hover; keep them playful but readable on `--y2k-surface`.

## Cursors

Replace the system cursor with pixel cursors per state. Drop 32×32 PNGs in `assets/cursors/` (the one binary asset this skill needs) and wire them:
```css
:root { --cur-pointer: url("/cursors/hand.png") 8 4, pointer; }
html, body { cursor: url("/cursors/arrow.png") 2 2, auto; }
a, button, .y2k-icon { cursor: var(--cur-pointer); }
input, textarea { cursor: url("/cursors/beam.png") 8 8, text; }
.is-dragging  { cursor: url("/cursors/grabbing.png") 8 8, grabbing; }
.is-loading   { cursor: url("/cursors/hourglass.png") 8 8, wait; }
```
Optional delight: a sparkle/star trail that follows the cursor (`--z-cursor-fx`), disabled under reduced-motion and on touch.

## Texture & atmosphere (this is what sells "CRT", not flatness)

Layer subtle, *non-interactive* overlays (`pointer-events:none`) above the desktop, below content.
```css
/* scanlines */
.fx-scanlines::after {
  content:""; position:fixed; inset:0; z-index:1; pointer-events:none;
  background: repeating-linear-gradient(0deg, rgba(0,0,0,.05) 0 1px, transparent 1px 3px);
}
/* film grain (inline SVG noise) */
.fx-grain::before {
  content:""; position:fixed; inset:0; z-index:1; pointer-events:none; opacity:.06; mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
/* CRT vignette on the whole viewport */
.fx-vignette { background: radial-gradient(120% 120% at 50% 50%, transparent 60%, var(--y2k-bg-deep) 100%); }
```
Also use: **dithering / halftone dot** fills (tiled radial-gradient) for empty areas, hard sticker shadows everywhere, and scattered foreground stickers (pixel hearts, stars, sparkles, emoji faces from the reference). Use marquee/blink **sparingly** for period flavor — one or two spots, never on body text.

## Layout feel

- The desktop is full-bleed `--y2k-bg` with grain + vignette. Icons sit on a loose grid (top-left), windows float and overlap with hard shadows and tiny rotations.
- **Asymmetry, overlap, grid-breaking** > centered single column. Let stickers bleed off edges. Vary window sizes and tilts.
- Keep generous breathing room around reading surfaces even amid the maximalism — density in chrome, calm in content.

## Component motion (micro only)

Components own small, snappy motion; **do not** put page-scroll logic here.
- Window open: scale + fade from the source icon (GSAP **Flip** if available, else `motion/react` layout). Close: reverse.
- Hover: lift `translate(-1px,-1px)`; press: inset bevel + `translate(1px,1px)`. Use `steps()` easing occasionally for a digital feel.
- Idle delight: gentle icon wiggle, blinking caret, a "now loading" bar that reflects **real** progress (never a fake timer).
- For React component animation use `motion/react`. Gate everything behind `@media (prefers-reduced-motion: no-preference)`; the reduced-motion path is instant + fully usable.

## Voice & microcopy (huge personality lever — keep it charming, not cringe)

Write all UI text in-world, as if it's the OS talking.
- Files/sections: `about_me.txt`, `projects/`, `playground/`, `contact.exe`, `resume.pdf`.
- Buttons: `OK`, `Cancel`, `Send`, `Open`, `Empty Recycle Bin`.
- States: empty → `no files found :(`; loading → short, sweet (the reference literally uses "Find your soul" / "loading…"); success → `message sent! ✿`.
- Taskbar shows a live clock. A boot screen reads like a real startup. **Restraint:** a few well-placed lines beat constant jokes.

## Accessibility (must survive the skin)

The OS aesthetic is decoration over a real, accessible document.
- Use semantic HTML underneath: one `<h1>`, logical `<h2>/<h3>`, `<nav>`, `<main>`, landmarks. The visual chrome must not break the heading outline or reading order.
- Windows are dialogs: `role="dialog"` + `aria-labelledby` the title; `Esc` closes the active one; focus moves in on open and returns on close.
- Visible focus everywhere (the dotted `--y2k-ink` ring). Sensible Tab order. Icons/controls have `aria-label`/alt.
- **Contrast AA on all reading surfaces** — that's why body copy is ink-on-white. Don't rely on pastel-on-pastel; test it.
- Provide a "skip the intro" affordance and honor `prefers-reduced-motion` and `prefers-reduced-transparency`.

## Anti-slop rules (hard constraints — with the why)

**Do**
- Commit fully to kawaii-Y2K-OS; make every detail (cursor, shadow, copy) match — coherence is what reads as "designed."
- Flat pastel blocks + dithering + **hard** sticker shadows; asymmetry and overlap.
- Tie loaders to real state; write copy in-world.

**Don't (these instantly make it look generic / AI)**
- ❌ Smooth full-page gradients (esp. purple→blue). Pastel here is intentional *because* it's flat + dithered + CRT — not a gradient wash. Gradients live **only** on title bars.
- ❌ Glassmorphism, soft blurry drop-shadows (use hard `0`-blur shadows), neumorphism.
- ❌ Inter / Roboto / Arial / system-ui / **Space Grotesk**.
- ❌ Default unstyled shadcn/Material/Bootstrap look bleeding through.
- ❌ Perfectly centered single-column everything; stock "AI gradient blob" backgrounds.
- ❌ Fake loading bars; leftover lorem ipsum in shipped UI.
- ❌ Pastel-on-pastel body text; pixel fonts for long paragraphs.

## Done-checklist (run before calling any component finished)

- [ ] Uses token variables (no raw hex), hard shadows, ink border.
- [ ] On-brand type roles (no banned fonts); body is ink-on-white and readable.
- [ ] Has hover + active (press-in) states and a visible focus ring.
- [ ] Semantic markup + aria; keyboard-operable; `Esc` closes windows.
- [ ] Motion is snappy, component-scoped, and reduced-motion-safe.
- [ ] Microcopy is in-world; no placeholders.
- [ ] Reads as intentional kawaii-Y2K — none of the Don'ts present.
```
