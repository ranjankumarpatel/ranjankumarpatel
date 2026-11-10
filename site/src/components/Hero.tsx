"use client";

import { motion } from "motion/react";
import { profile } from "@/content";

const ease = [0.16, 1, 0.3, 1] as const;

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

const letter = {
  hidden: { y: "110%", rotate: 8 },
  show: { y: 0, rotate: 0, transition: { duration: 0.9, ease } },
};

const nameLines = ["Ranjan", "Kumar Patel"];

export default function Hero() {
  return (
    <header className="relative flex min-h-svh flex-col justify-end overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-deep via-deep/55 to-transparent md:bg-linear-to-r md:via-deep/70" />

      <motion.div
        className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-40 md:px-10 md:pb-24"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.16, delayChildren: 0.2 }}
      >
        <motion.h1
          aria-label={profile.name}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035 } } }}
          className="font-display text-[clamp(3.25rem,10vw,8.5rem)] font-bold leading-[0.9] tracking-[-0.035em]"
        >
          {nameLines.map((line) => (
            <span
              key={line}
              aria-hidden="true"
              className="-mb-[0.14em] block overflow-hidden pb-[0.14em]"
            >
              {[...line].map((ch, i) => (
                <motion.span
                  key={`${ch}-${i}`}
                  variants={letter}
                  className="inline-block origin-bottom-left whitespace-pre"
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>
        <motion.p
          variants={rise}
          className="mt-8 max-w-xl text-lg leading-relaxed text-ink/85 md:text-xl"
        >
          {profile.intro}
        </motion.p>
        <motion.div variants={rise} className="mt-9 flex flex-wrap gap-3">
          <motion.a
            href="#skills"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="rounded-full bg-teal px-6 py-3 font-medium text-deep transition-colors hover:bg-ink"
          >
            See my skills
          </motion.a>
          <motion.a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="rounded-full border border-ink/30 px-6 py-3 font-medium transition-colors hover:border-ink"
          >
            Find me on LinkedIn
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute bottom-6 right-6 hidden h-12 w-px origin-top bg-ink/50 md:right-10 md:block"
        animate={{ scaleY: [0, 1, 1], opacity: [0, 1, 0], y: [0, 0, 14] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </header>
  );
}
