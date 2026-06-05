import { Reveal } from "@/components/scroll/Reveal";
import { HorizontalGallery } from "@/components/scroll/HorizontalGallery";
import { Window } from "@/components/y2k";

type Project = {
  name: string;
  blurb: string;
  stack: string[];
  href?: string;
};

const PROJECTS: Project[] = [
  {
    name: "Tseppas",
    blurb:
      "The big one. I made it ~70% faster, rebuilt most of the UI, and put together the cart and checkout — tax, Google-Maps shipping, the works — plus a little widget that pops a mobile wallet pass out of a QR code. Then I localized the whole store for the Saudi market and helped move it off Create React App onto Next.js 14.",
    stack: ["React", "Next.js", "SCSS", "Framer Motion", "GSAP", "Axios", "i18n"],
    href: "https://tseppas.com/",
  },
  {
    name: "Dashboard",
    blurb:
      "The admin side of things. I built the gift-card and wallet-pass pages, added geofencing so passes only work where they should, and wired up customer touchpoints that track orders, page visits and cart contents. Also ran a full audit and added multi-country support.",
    stack: ["React", "Redux", "MUI", "Axios"],
    href: "https://dashboard.meetusar.com/dashboard/",
  },
  {
    name: "Chat Services",
    blurb:
      "Real-time chat that needed help. I rebuilt the UI from scratch, then untangled the codebase and fixed the WebSocket layer so it subscribes to the right topics — i.e. messages actually show up now.",
    stack: ["React", "WebSocket"],
    href: "https://webchat.dev.meetusvr.com/chat?orgId=2",
  },
  {
    name: "MeetusVR",
    blurb:
      "A full UI redesign across every page, with scroll-based animations courtesy of AOS.",
    stack: ["React", "AOS"],
    href: "https://www.dev.meetusvr.io",
  },
  {
    name: "Yumazing",
    blurb:
      "Food delivery. Redesigned the UI, made the homepage ~150% faster, and added guest checkout, promo codes, and a healthy amount of Framer Motion.",
    stack: ["React", "Framer Motion"],
    href: "https://www.yumazing.io",
  },
  {
    name: "Las Vegan",
    blurb:
      "Plant-based dining. Gave it a UI overhaul, tightened up mobile, and added some Framer Motion polish.",
    stack: ["React", "Framer Motion"],
    href: "https://www.dev.meetusvr.com/las-vegan",
  },
];

/** WORK — projects, each opening like its own program window, in a pinned
 *  horizontal gallery (vertical column on mobile / reduced-motion). */
export function Work() {
  return (
    <section id="work" className="pt-24 pb-24 sm:pt-32 sm:pb-32">
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
                <p className="font-body text-y2k-ink">{p.blurb}</p>

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
