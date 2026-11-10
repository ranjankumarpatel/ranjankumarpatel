import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import { building, leading, profile, writing } from "@/content";

const nav = [
  { href: "#about", label: "About" },
  { href: "#leading", label: "What I lead" },
  { href: "#skills", label: "Skills" },
  { href: "#building", label: "What I am building" },
  { href: "#contact", label: "Contact" },
];

export default function Home() {
  return (
    <>
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

      <main className="mx-auto max-w-6xl px-6 md:px-10">
        <section
          id="about"
          aria-labelledby="about-title"
          className="grid gap-12 py-24 md:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] md:py-32"
        >
          <div>
            <h2
              id="about-title"
              className="font-display text-4xl font-semibold tracking-tight md:text-5xl"
            >
              About me
            </h2>
            <div className="mt-8 max-w-[62ch] space-y-5 text-lg leading-relaxed text-ink/85">
              {profile.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <dl className="space-y-7 self-end border-l border-line pl-6">
            {profile.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-sm text-mute">{f.label}</dt>
                <dd className="mt-1 font-display text-xl font-medium leading-snug">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          id="leading"
          aria-labelledby="leading-title"
          className="pb-24 md:pb-32"
        >
          <h2
            id="leading-title"
            className="font-display text-4xl font-semibold tracking-tight md:text-5xl"
          >
            What I lead
          </h2>
          <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {leading.map((l) => (
              <article key={l.title} className="border-l-2 border-teal pl-6">
                <h3 className="font-display text-2xl font-semibold leading-tight">
                  {l.title}
                </h3>
                <p className="mt-3 max-w-[46ch] leading-relaxed text-mute">
                  {l.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" aria-labelledby="skills-title" className="py-16">
          <h2
            id="skills-title"
            className="font-display text-4xl font-semibold tracking-tight md:text-5xl"
          >
            What I work with
          </h2>
          <p className="mb-12 mt-5 max-w-[60ch] text-lg leading-relaxed text-ink/85">
            These are the things I use in real projects. I have grouped them the
            way I think about them.
          </p>
          <Skills />
        </section>

        <section
          id="building"
          aria-labelledby="building-title"
          className="py-24 md:py-32"
        >
          <h2
            id="building-title"
            className="font-display text-4xl font-semibold tracking-tight md:text-5xl"
          >
            What I am building
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {building.map((b) => (
              <article key={b.title}>
                <h3 className="font-display text-2xl font-semibold leading-tight">
                  {b.title}
                </h3>
                <p className="mt-3 leading-relaxed text-mute">{b.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer id="contact" className="border-t border-line bg-panel/40">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            {writing}
          </h2>
          <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-lg">
            <li>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-teal decoration-2 underline-offset-8 transition-colors hover:text-teal"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-teal decoration-2 underline-offset-8 transition-colors hover:text-teal"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={profile.links.company}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-teal decoration-2 underline-offset-8 transition-colors hover:text-teal"
              >
                Think Talent
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
