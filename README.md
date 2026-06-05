# KAREEM.OS

My portfolio, dressed up as a kawaii Y2K operating system. You boot it up, scroll, and the OS plays itself back — windows fly in, a little CRT hums in the background, the camera dives into a workstation and pulls back out of a rainy bedroom. It's a portfolio. It just thinks it's an operating system.

## The idea

Most portfolios are a list. This one is a place. Each section is part of the system:

- **Boot** — the desktop powers on.
- **about_me.txt** — a readme window, because of course it is.
- **where it gets made** — a 3D desk with a glowing editor (the code is fake, the late nights were real).
- **projects/** — real work, each in its own program window. Scroll sideways.
- **take five** — a lo-fi room and a rainy window.
- **playground/** — the smaller stuff, built to learn.
- **contact.exe** — the dial-up's connected.

The whole thing degrades gracefully: turn off WebGL, shrink the window, or set `prefers-reduced-motion` and it's still a clean, fully navigable site. The 3D is decoration, never load-bearing.

## Built with

- **Next.js** (App Router) + **TypeScript** — real DOM text under the retro skin, so it's actually readable by search engines and screen readers.
- **Lenis** — smooth scroll.
- **GSAP** + **ScrollTrigger** — the scroll choreography (pinning, the horizontal gallery, the camera dollies).
- **React Three Fiber** + **drei** + **three** — one persistent canvas behind everything, driven by scroll.
- **zustand** — a tiny store bridging scroll progress into the 3D scene.
- **Tailwind CSS v4** — design tokens and the window/button/taskbar kit.

No 3D model files — every floppy, mug, and monitor is built from primitives. Keeps it light.

## Running it

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the build
npm run lint    # eslint
```

## A note on the cursor

It's a custom pixel hand. Earlier drafts looked like it was flipping you off. This one doesn't. Progress.

---

Built with too much care and a soft spot for old computers.
