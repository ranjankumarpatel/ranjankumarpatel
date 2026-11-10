"use client";

import { motion } from "motion/react";
import { skillGroups } from "@/content";
import { focusSkillGroup } from "./SkillField";

const ease = [0.16, 1, 0.3, 1] as const;

const chip = {
  hidden: { opacity: 0, y: 14, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 320, damping: 22 },
  },
};

export default function Skills() {
  return (
    <motion.div
      className="border-t border-line"
      // When the visitor leaves the skills list the map goes back to drifting.
      onViewportLeave={() => focusSkillGroup(null)}
    >
      {skillGroups.map((group) => {
        const lead = group.id === "ai";
        return (
          <motion.section
            key={group.id}
            aria-labelledby={`skill-${group.id}`}
            className="relative grid gap-x-12 gap-y-6 py-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:py-14"
            // The row crossing the middle of the screen turns the 3D map to its group.
            viewport={{ margin: "-45% 0px -45% 0px" }}
            onViewportEnter={() => focusSkillGroup(group.id)}
            onMouseEnter={() => focusSkillGroup(group.id)}
          >
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease }}
            >
              <h3
                id={`skill-${group.id}`}
                className={`font-display text-3xl font-semibold tracking-tight md:text-4xl ${
                  lead ? "text-amber" : ""
                }`}
              >
                {group.name}
              </h3>
              <p className="mt-3 max-w-sm leading-relaxed text-mute">{group.note}</p>
            </motion.div>
            <motion.ul
              className="flex flex-wrap content-start gap-2.5"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ staggerChildren: 0.045 }}
            >
              {group.items.map((skill) => (
                <motion.li
                  key={skill}
                  variants={chip}
                  whileHover={{ y: -4, scale: 1.06 }}
                  className={`cursor-default rounded-full border px-4 py-2 text-[0.95rem] backdrop-blur-sm ${
                    lead
                      ? "border-amber/50 bg-amber/10 text-ink"
                      : "border-line bg-panel/70 text-ink"
                  }`}
                >
                  {skill}
                </motion.li>
              ))}
            </motion.ul>
            <motion.span
              aria-hidden="true"
              className={`absolute inset-x-0 bottom-0 h-px origin-left ${lead ? "bg-amber/50" : "bg-line"}`}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 1 }}
              transition={{ duration: 1.1, ease }}
            />
          </motion.section>
        );
      })}
    </motion.div>
  );
}
