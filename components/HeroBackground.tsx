"use client";

import dynamic from "next/dynamic";

// Code-split the canvas particle network into its own chunk and skip SSR
// for it entirely (it only touches canvas/window APIs client-side, and
// deferring its JS keeps it off the critical path for first paint).
const InteractiveBackground = dynamic(
  () => import("./InteractiveBackground"),
  { ssr: false }
);

export default function HeroBackground() {
  return <InteractiveBackground />;
}
