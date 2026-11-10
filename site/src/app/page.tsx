import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import {
  CardGrid,
  CountUp,
  FadeUp,
  MotionProvider,
  RevealText,
  ScrollProgress,
} from "@/components/Motion";
import SkillField from "@/components/SkillField";
import Skills from "@/components/Skills";
import { building, leading, profile, writing } from "@/content";

const nav = [
  { href: "#about", label: "About" },
  { href: "#leading", label: "What I lead" },
  { href: "#skills", label: "Skills" },
  { href: "#building", label: "What I am building" },
  { href: "#contact", label: "Contact" },
];

const heading =
  "font-display text-4xl font-semibold tracking-tight md:text-5xl";
const link =
  "underline decoration-teal decoration-2 underline-offset-8 transition-[color,text-underline-offset] hover:text-teal hover:underline-offset-4";

export default function Home() {
  return (
    <MotionProvider>
      <ScrollProgress />
      <SkillField />

      <div className="relative z-10">
        <nav
          aria-label="Sections"
          className="absolute inset-x-0 top-0 z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10"
        >
          <a href="#top" className="font-display text-lg font-semibold">
            Ranjan
          </a>
          <ul className="hidden gap-8 text-[0.95rem] text-ink/80 md:flex">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition-colors hover:text-teal">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div id="top">
          <Hero />
        </div>

        <Marquee />

        <main className="mx-auto max-w-6xl px-6 md:px-10">
          <section
            id="about"
            aria-labelledby="about-title"
            className="grid gap-12 py-24 md:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] md:py-32"
          >
            <div>
              <RevealText id="about-title" text="About me" className={heading} />
              <div className="mt-8 max-w-[62ch] space-y-5 text-lg leading-relaxed text-ink/85">
                {profile.about.map((p, i) => (
                  <FadeUp key={p} delay={i * 0.1}>
                    <p>{p}</p>
                  </FadeUp>
                ))}
              </div>
            </div>
            <FadeUp delay={0.2} className="self-end">
              <dl className="space-y-7 border-l border-line pl-6">
                {profile.facts.map((f) => {
                  const number = /^(\d+)(.*)$/.exec(f.value);
                  return (
                    <div key={f.label}>
                      <dt className="text-sm text-mute">{f.label}</dt>
                      <dd className="mt-1 font-display text-xl font-medium leading-snug">
                        {number ? (
                          <CountUp to={Number(number[1])} suffix={number[2]} />
                        ) : (
                          f.value
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </FadeUp>
          </section>

          <section
            id="leading"
            aria-labelledby="leading-title"
            className="pb-24 md:pb-32"
          >
            <RevealText id="leading-title" text="What I lead" className={heading} />
            <CardGrid items={leading} columns={2} />
          </section>

          <section id="skills" aria-labelledby="skills-title" className="py-16">
            <RevealText
              id="skills-title"
              text="What I work with"
              className={heading}
            />
            <FadeUp delay={0.1}>
              <p className="mb-12 mt-5 max-w-[60ch] text-lg leading-relaxed text-ink/85">
                These are the things I use in real projects. I have grouped them
                the way I think about them. As you scroll, the map behind the
                page turns to the group you are reading.
              </p>
            </FadeUp>
            <Skills />
          </section>

          <section
            id="building"
            aria-labelledby="building-title"
            className="py-24 md:py-32"
          >
            <RevealText
              id="building-title"
              text="What I am building"
              className={heading}
            />
            <CardGrid items={building} columns={3} />
          </section>
        </main>

        <footer
          id="contact"
          className="border-t border-line bg-panel/50 backdrop-blur-sm"
        >
          <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
            <RevealText
              text={writing}
              className="max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
            />
            <FadeUp delay={0.3}>
              <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-lg">
                <li>
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className={link}
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className={link}
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={profile.links.company}
                    target="_blank"
                    rel="noreferrer"
                    className={link}
                  >
                    Think Talent
                  </a>
                </li>
              </ul>
            </FadeUp>
          </div>
        </footer>
      </div>
    </MotionProvider>
  );
}
