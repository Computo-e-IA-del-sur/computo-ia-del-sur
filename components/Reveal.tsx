"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Element tag to render — defaults to div, use for semantic wrapping. */
  as?: "div" | "li";
};

/**
 * Scroll-triggered "fade in up" — animates once when the element enters
 * the viewport, then leaves it alone (no re-triggering on scroll-back,
 * which reads as jittery on a marketing page). Skips the motion entirely
 * under prefers-reduced-motion instead of just shortening it.
 */
export default function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  if (reduceMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </Component>
  );
}
