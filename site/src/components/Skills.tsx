"use client";

import { MotionConfig, motion } from "motion/react";
import { skillGroups } from "@/content";

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function Skills() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="border-t border-line">
        {skillGroups.map((group) => {
          const lead = group.id === "ai";
          return (
            <section
              key={group.id}
              aria-labelledby={`skill-${group.id}`}
              className="grid gap-x-12 gap-y-6 border-b border-line py-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:py-14"
            >
              <div>
                <h3
                  id={`skill-${group.id}`}
                  className={`font-display text-3xl font-semibold tracking-tight md:text-4xl ${
                    lead ? "text-amber" : ""
                  }`}
                >
                  {group.name}
                </h3>
                <p className="mt-3 max-w-sm leading-relaxed text-mute">
                  {group.note}
                </p>
              </div>
              <motion.ul
                className="flex flex-wrap content-start gap-2.5"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ staggerChildren: 0.05 }}
              >
                {group.items.map((skill) => (
                  <motion.li
                    key={skill}
                    variants={item}
                    className={`rounded-full border px-4 py-2 text-[0.95rem] ${
                      lead
                        ? "border-amber/50 bg-amber/10 text-ink"
                        : "border-line bg-panel/60 text-ink"
                    }`}
                  >
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </section>
          );
        })}
      </div>
    </MotionConfig>
  );
}
