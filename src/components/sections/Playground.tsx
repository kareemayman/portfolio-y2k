import { Reveal } from "@/components/scroll/Reveal";
import { Window } from "@/components/y2k";

type Toy = {
  name: string;
  blurb: string;
  stack: string[];
  href: string;
};

const TOYS: Toy[] = [
  {
    name: "SkillSwap",
    blurb:
      "A skill-trading app (web + mobile) with AI-generated learning milestones, scheduling, chat and reviews.",
    stack: ["React Native", "Firebase", "Gemini"],
    href: "https://github.com/kareemayman/skillswap",
  },
  {
    name: "Taskify",
    blurb: "A full-stack task manager built for team collaboration.",
    stack: ["React", "Redux", "Express", "JWT"],
    href: "https://github.com/kareemayman/taskify",
  },
  {
    name: "News & Blogs",
    blurb: "Read the news and write/edit your own blog posts.",
    stack: ["React", "SCSS", "REST"],
    href: "https://github.com/kareemayman/news-blogs",
  },
  {
    name: "Calculator",
    blurb: "A responsive calculator with swappable themes.",
    stack: ["React", "TypeScript", "SCSS"],
    href: "https://github.com/kareemayman/calculator",
  },
];

/** PLAYGROUND — a "downloads" folder of smaller side projects. */
export function Playground() {
  return (
    <section id="playground" className="relative px-6 py-24 sm:py-32">
      <span
        aria-hidden
        className="font-display pointer-events-none absolute right-[6%] top-[20%] hidden rotate-12 text-5xl text-y2k-pink [text-shadow:3px_3px_0_var(--y2k-ink)] lg:block"
      >
        ♡
      </span>

      <div className="mx-auto max-w-4xl">
        <Reveal>
          <Window title="playground/" role="region" tilt={-0.4}>
            <p className="font-body text-y2k-ink">
              Smaller stuff &mdash; side projects and things I built to learn.
              Lower stakes, more fun.
            </p>

            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {TOYS.map((toy) => (
                <li
                  key={toy.name}
                  className="border-2 border-y2k-ink bg-y2k-surface-alt p-3 shadow-(--y2k-bevel-in)"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg text-y2k-ink">
                      {toy.name}
                    </h3>
                    <a
                      href={toy.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-chrome text-xs text-y2k-ink underline decoration-y2k-pink-hot decoration-2 underline-offset-2"
                    >
                      repo &rarr;
                    </a>
                  </div>
                  <p className="font-body mt-1 text-sm text-y2k-ink">
                    {toy.blurb}
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {toy.stack.map((tech) => (
                      <li
                        key={tech}
                        className="border border-y2k-ink bg-y2k-surface px-1.5 py-0.5 font-chrome text-[10px] text-y2k-ink"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Window>
        </Reveal>
      </div>
    </section>
  );
}
