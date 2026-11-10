"use client";

import { useRef } from "react";
import { MotionConfig, motion, useScroll, useTransform } from "motion/react";
import { profile } from "@/content";
import SkillField from "./SkillField";

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const fieldOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const fieldY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <MotionConfig reducedMotion="user">
      <header
        ref={ref}
        className="relative flex min-h-svh flex-col justify-end overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          style={{ opacity: fieldOpacity, y: fieldY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.2 }}
        >
          <SkillField />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-deep via-deep/55 to-transparent md:bg-linear-to-r md:via-deep/70" />

        <motion.div
          className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-40 md:px-10 md:pb-24"
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.14, delayChildren: 0.15 }}
        >
          <motion.h1
            variants={rise}
            className="font-display text-[clamp(3.25rem,10vw,8.5rem)] font-bold leading-[0.9] tracking-[-0.035em]"
          >
            Ranjan
            <br />
            Kumar Patel
          </motion.h1>
          <motion.p
            variants={rise}
            className="mt-8 max-w-xl text-lg leading-relaxed text-ink/85 md:text-xl"
          >
            {profile.intro}
          </motion.p>
          <motion.div variants={rise} className="mt-9 flex flex-wrap gap-3">
            <a
              href="#skills"
              className="rounded-full bg-teal px-6 py-3 font-medium text-deep transition-colors hover:bg-ink"
            >
              See my skills
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-ink/30 px-6 py-3 font-medium transition-colors hover:border-ink"
            >
              Find me on LinkedIn
            </a>
          </motion.div>
        </motion.div>
      </header>
    </MotionConfig>
  );
}
