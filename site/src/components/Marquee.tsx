import { skillGroups } from "@/content";

/** A band of every skill name that keeps sliding sideways. Decorative, so hidden from screen readers. */
export default function Marquee() {
  const names = skillGroups.flatMap((g) => g.items);
  const half = Math.ceil(names.length / 2);
  const rows = [names.slice(0, half), names.slice(half)];

  return (
    <div
      aria-hidden="true"
      className="marquee flex flex-col gap-3 overflow-hidden border-y border-line bg-deep/60 py-5 backdrop-blur-sm"
    >
      {rows.map((row, r) => (
        <div
          key={row[0]}
          className={`marquee-track flex w-max gap-10 font-display text-2xl font-semibold text-ink/70 md:text-3xl ${
            r === 1 ? "marquee-reverse" : ""
          }`}
        >
          {[...row, ...row].map((name, i) => (
            <span key={`${name}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
              {name}
              <span className={`h-2 w-2 rounded-full ${i % 3 === 0 ? "bg-amber" : "bg-teal"}`} />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
