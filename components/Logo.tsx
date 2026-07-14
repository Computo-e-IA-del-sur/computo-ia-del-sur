"use client";

import { useId } from "react";

type LogoProps = {
  /** Hides the wordmark and renders only the mark — for tight spaces (favicons, mobile). */
  markOnly?: boolean;
  className?: string;
};

/**
 * Abstract neural-triad mark: three connected nodes (a network) with a
 * satellite node orbiting the core — reads as both "AI network" and a
 * compass pointing south. Deliberately mark-only (no bounding box/badge)
 * to avoid the generic "app icon" look.
 */
export default function Logo({ markOnly = false, className = "" }: LogoProps) {
  const gradientId = useId();

  return (
    <a
      href="#"
      className={`group flex items-center gap-3 ${className}`}
      aria-label="Computo e IA del Sur — inicio"
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-[transform,filter] duration-500 ease-out group-hover:rotate-[8deg] group-hover:drop-shadow-[0_0_8px_rgba(251,146,60,0.65)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${gradientId}-mark`} x1="4" y1="6" x2="34" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>

        {/* orbit ring around the core node */}
        <ellipse
          cx="20"
          cy="9.5"
          rx="7.5"
          ry="3.6"
          stroke={`url(#${gradientId}-mark)`}
          strokeWidth="0.8"
          strokeOpacity="0.45"
          transform="rotate(-18 20 9.5)"
        />

        {/* edges */}
        <line x1="20" y1="8.5" x2="8.5" y2="27.5" stroke={`url(#${gradientId}-mark)`} strokeWidth="1.1" strokeOpacity="0.55" strokeLinecap="round" />
        <line x1="20" y1="8.5" x2="29.5" y2="29.5" stroke={`url(#${gradientId}-mark)`} strokeWidth="1.1" strokeOpacity="0.55" strokeLinecap="round" />
        <line x1="8.5" y1="27.5" x2="29.5" y2="29.5" stroke={`url(#${gradientId}-mark)`} strokeWidth="1.1" strokeOpacity="0.3" strokeLinecap="round" />
        <line x1="20" y1="8.5" x2="31.5" y2="10.5" stroke={`url(#${gradientId}-mark)`} strokeWidth="0.9" strokeOpacity="0.5" strokeLinecap="round" strokeDasharray="1.6 2" />

        {/* nodes */}
        <circle cx="8.5" cy="27.5" r="2.1" fill={`url(#${gradientId}-mark)`} fillOpacity="0.85" />
        <circle cx="29.5" cy="29.5" r="2.1" fill={`url(#${gradientId}-mark)`} fillOpacity="0.85" />
        <circle cx="31.5" cy="10.5" r="1.3" fill={`url(#${gradientId}-mark)`} fillOpacity="0.6" />
        <circle cx="20" cy="8.5" r="3.1" fill={`url(#${gradientId}-mark)`} />
      </svg>

      {!markOnly && (
        <span className="leading-tight">
          <span className="block font-semibold text-white text-[15px] tracking-tight">
            Computo e IA
          </span>
          <span className="block text-[10.5px] font-medium tracking-[0.2em] uppercase text-orange-400/90 transition-colors duration-500 group-hover:text-orange-300">
            del Sur
          </span>
        </span>
      )}
    </a>
  );
}
