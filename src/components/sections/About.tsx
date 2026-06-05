import { Reveal } from "@/components/scroll/Reveal";
import { Window } from "@/components/y2k";

const SYSTEM_INFO: [key: string, value: string][] = [
  ["USER", "Kareem Ayman"],
  ["LOCATION", "Cairo, EG"],
  ["ROLE", "Frontend Developer @ Meetus"],
  ["ONLINE SINCE", "2023"],
  ["STACK", "React · Next.js · TypeScript"],
  ["STATUS", "shipping ✦"],
];

/** ABOUT — a readme/system-info window that introduces the person behind the OS. */
export function About() {
  return (
    <section id="about" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Window title="about_me.txt" role="region" tilt={-0.4}>
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
              <div className="font-body max-w-[60ch] space-y-4 text-y2k-ink">
                <p>
                  I&rsquo;m a frontend developer based in Cairo. I started out
                  doing competitive programming as a teenager &mdash; far too
                  many late nights arguing with an online judge &mdash; then took
                  the long way round through a CS degree and a stretch of
                  teaching myself the web before it turned into the job.
                </p>
                <p>
                  These days I&rsquo;m at Meetus, where most of my time goes to
                  making things load faster and feel better to use. Away from the
                  editor it&rsquo;s music, movies, and the occasional chart
                  &mdash; probably why I ended up on the visual side of
                  engineering.
                </p>
              </div>

              <dl className="min-w-56 border-2 border-y2k-ink bg-y2k-surface-alt p-3 shadow-(--y2k-bevel-in)">
                <p className="font-chrome mb-2 text-xs uppercase tracking-[0.15em] text-y2k-ink/60">
                  system info
                </p>
                {SYSTEM_INFO.map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between gap-4 border-t border-dotted border-y2k-ink/30 py-1 font-chrome text-xs text-y2k-ink first:border-t-0"
                  >
                    <dt className="text-y2k-ink/60">{key}</dt>
                    <dd className="text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Window>
        </Reveal>
      </div>
    </section>
  );
}
