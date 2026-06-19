import { Reveal } from "@/components/scroll/Reveal";
import { HorizontalGallery } from "@/components/scroll/HorizontalGallery";
import { Window, Screenshot } from "@/components/y2k";

/** rotating pastel fills so each stat tile reads as its own sticker badge */
const STAT_BG = ["bg-y2k-butter", "bg-y2k-mint", "bg-y2k-sky"];

type Stat = { num: string; label: string };

type Project = {
  name: string;
  /** screenshot file at /public/screens/<slug>.png */
  slug: string;
  /** host shown in the faux address bar */
  host: string;
  blurb: string;
  stats?: Stat[];
  stack: string[];
  /** omit for confidential / internal work — hides the "view site" link */
  href?: string;
};

const PROJECTS: Project[] = [
  {
    name: "Tseppas",
    slug: "tseppas",
    host: "tseppas.com",
    blurb:
      "The big one. I made it ~70% faster, rebuilt most of the UI, and put together the cart and checkout — tax, Google-Maps shipping, the works — plus a little widget that pops a mobile wallet pass out of a QR code. Then I localized the whole store for the Saudi market and helped move it off Create React App onto Next.js 14.",
    stats: [
      { num: "~70%", label: "faster" },
      { num: "Next 14", label: "CRA migration" },
      { num: "AR / EN", label: "Saudi localized" },
    ],
    stack: ["React", "Next.js", "SCSS", "Framer Motion", "GSAP", "Axios", "i18n"],
    href: "https://tseppas.com/",
  },
  {
    name: "Dashboard",
    slug: "dashboard",
    host: "🔒 confidential",
    blurb:
      "The admin side of things. I built the gift-card and wallet-pass pages, added geofencing so passes only work where they should, and wired up customer touchpoints that track orders, page visits and cart contents. Also ran a full audit and added multi-country support.",
    stack: ["React", "Redux", "MUI", "Axios"],
  },
  {
    name: "Chat Services",
    slug: "chat",
    host: "🔒 confidential",
    blurb:
      "Real-time chat that needed help. I rebuilt the UI from scratch, then untangled the codebase and fixed the WebSocket layer so it subscribes to the right topics — i.e. messages actually show up now.",
    stack: ["React", "WebSocket"],
  },
  {
    name: "MeetusVR",
    slug: "meetusvr",
    host: "meetusvr.io",
    blurb:
      "A full UI redesign across every page, with scroll-based animations courtesy of AOS.",
    stack: ["React", "AOS"],
    href: "https://www.meetusvr.io",
  },
  {
    name: "Yumazing",
    slug: "yumazing",
    host: "yumazing.io",
    blurb:
      "Food delivery. Redesigned the UI, made the homepage ~150% faster, and added guest checkout, promo codes, and a healthy amount of Framer Motion.",
    stats: [
      { num: "~150%", label: "faster homepage" },
      { num: "Guest", label: "checkout added" },
    ],
    stack: ["React", "Framer Motion"],
    href: "https://www.yumazing.io",
  },
  {
    name: "Las Vegan",
    slug: "lasvegan",
    host: "dev.meetusvr.com/las-vegan",
    blurb:
      "Plant-based dining. Gave it a UI overhaul, tightened up mobile, and added some Framer Motion polish.",
    stack: ["React", "Framer Motion"],
    href: "https://www.dev.meetusvr.com/las-vegan",
  },
];

/** WORK — projects, each opening like its own program window (with a live-site
 *  screen), in a pinned horizontal gallery (vertical column on mobile / RM). */
export function Work() {
  return (
    <section id="work" className="relative pt-24 pb-24 sm:pt-32 sm:pb-32">
      {/* gutter sticker */}
      <span
        aria-hidden
        className="font-display pointer-events-none absolute right-[6%] top-[12%] hidden rotate-10 text-4xl text-y2k-sky [text-shadow:3px_3px_0_var(--y2k-ink)] lg:block"
      >
        ✦
      </span>

      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="font-display text-3xl text-y2k-ink sm:text-4xl">
            projects<span className="text-y2k-pink-hot">/</span>
          </h2>
          <p className="font-body mt-2 max-w-[60ch] text-y2k-ink/80">
            A few things I&rsquo;ve shipped at Meetus &mdash; scroll sideways, or
            just read along.
          </p>
        </Reveal>
      </div>

      <div className="mt-10">
        <HorizontalGallery>
          {PROJECTS.map((p, i) => (
            <div key={p.name} className="hgal__card">
              <Window
                title={p.name}
                role="region"
                headingLevel={3}
                tilt={i % 2 === 0 ? -0.5 : 0.5}
              >
                <Screenshot
                  src={`/screens/${p.slug}.png`}
                  alt={`Screenshot of the ${p.name} site`}
                  host={p.host}
                  variant={p.slug === "chat" ? "phone" : "desktop"}
                />

                <p className="font-body mt-4 text-y2k-ink">{p.blurb}</p>

                {p.stats && (
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {p.stats.map((s, si) => (
                      <div
                        key={s.label}
                        className={`flex flex-col border-2 border-y2k-ink px-3 py-2 shadow-(--y2k-shadow) ${STAT_BG[si % STAT_BG.length]}`}
                      >
                        <span className="font-display text-2xl leading-none text-y2k-ink">
                          {s.num}
                        </span>
                        <span className="font-chrome mt-1 text-[10px] uppercase tracking-[0.12em] text-y2k-ink/70">
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((tech) => (
                    <li
                      key={tech}
                      className="border-2 border-y2k-ink bg-y2k-surface-alt px-2 py-0.5 font-chrome text-xs text-y2k-ink"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                {p.href && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-chrome mt-4 inline-block text-sm text-y2k-ink underline decoration-y2k-pink-hot decoration-2 underline-offset-2"
                  >
                    view site &rarr;
                  </a>
                )}
              </Window>
            </div>
          ))}
        </HorizontalGallery>
      </div>
    </section>
  );
}
