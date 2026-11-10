"use client";

import { createElement, useEffect, useRef, type ReactNode } from "react";
import {
  MotionConfig,
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

/** Makes every animation on the page respect the visitor's reduced motion setting. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Thin bar at the top that fills as the visitor scrolls down. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-amber"
    />
  );
}

const word = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.8, ease } },
};

/** A heading whose words slide up one after another when it scrolls into view. */
export function RevealText({
  text,
  as = "h2",
  id,
  className,
}: {
  text: string;
  as?: "h2" | "h3" | "p";
  id?: string;
  className?: string;
}) {
  const words = text.split(" ");
  return createElement(
    as,
    { id, className, "aria-label": text },
    <motion.span
      aria-hidden="true"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: 0.05 }}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span variants={word} className="inline-block">
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.span>,
  );
}

/** Fades a block up into place when it scrolls into view. */
export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Counts up to a number the first time it is seen. */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, suffix]);

  return (
    <span ref={ref}>
      {to}
      {suffix}
    </span>
  );
}

/** A grid of text cards. Each card draws its side line and slides in, and lifts on hover. */
export function CardGrid({
  items,
  columns,
}: {
  items: { title: string; text: string }[];
  columns: 2 | 3;
}) {
  return (
    <motion.div
      className={`mt-12 grid gap-x-12 gap-y-10 ${columns === 3 ? "md:grid-cols-3" : "sm:grid-cols-2"}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ staggerChildren: 0.12 }}
    >
      {items.map((item) => (
        <motion.article
          key={item.title}
          className="relative pl-6"
          variants={{
            hidden: { opacity: 0, x: -18 },
            show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
          }}
          whileHover={{ x: 6 }}
        >
          <motion.span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-0.5 origin-top bg-teal"
            variants={{
              hidden: { scaleY: 0 },
              show: { scaleY: 1, transition: { duration: 0.9, ease, delay: 0.15 } },
            }}
          />
          <h3 className="font-display text-2xl font-semibold leading-tight">
            {item.title}
          </h3>
          <p className="mt-3 max-w-[46ch] leading-relaxed text-mute">{item.text}</p>
        </motion.article>
      ))}
    </motion.div>
  );
}
