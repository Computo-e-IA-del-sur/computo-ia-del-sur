"use client";

import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";

type SpotlightCardProps = {
  href: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
};

/**
 * A card that IS the link (per CRO best practice: the whole surface should
 * be clickable, not just a small "view" button). On hover it tracks the
 * cursor with a soft radial spotlight and a light 3D tilt — cheap CSS
 * custom properties updated imperatively via a ref, so mousemove never
 * triggers a React re-render.
 */
export default function SpotlightCard({
  href,
  external = false,
  className = "",
  children,
  ariaLabel,
}: SpotlightCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;

    el.style.setProperty("--spot-x", `${x}px`);
    el.style.setProperty("--spot-y", `${y}px`);
    el.style.setProperty("--tilt-x", `${(-py * 6).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${(px * 6).toFixed(2)}deg`);
  }

  function handleMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <a
      ref={ref}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform:
          "perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
      }}
      className={`group relative block transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(249,115,22,0.22), transparent 70%)",
        }}
      />
      {children}
    </a>
  );
}
