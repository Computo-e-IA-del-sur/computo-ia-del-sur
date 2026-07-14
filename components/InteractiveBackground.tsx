"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type Streak = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  life: number;
  maxLife: number;
};

const NODE_SPACING = 34_000; // px^2 per node — controls density regardless of screen size
const MAX_NODES = 90;
const LINK_DISTANCE = 140;
const CURSOR_RADIUS = 160;
const CURSOR_LINK_DISTANCE = 180;
const LINE_COLOR = "251, 146, 60"; // orange-400 rgb
const NODE_COLOR = "253, 186, 116"; // orange-300 rgb
const MAX_STREAKS = 2;
const STREAK_MIN_GAP = 140; // frames between spawns, minimum
const STREAK_MAX_GAP = 320; // frames between spawns, maximum

/**
 * A quiet, ambient "AI network" canvas: a handful of drifting nodes linked
 * by fading edges, with a soft pull toward the cursor (and live connecting
 * lines drawn straight to the pointer, so it reads as "you're part of the
 * network"), plus the occasional fast "data stream" streak crossing the
 * frame. Pure Canvas2D (no WebGL/three.js — unnecessary weight for a
 * marketing hero) so it costs almost nothing to ship. Pauses itself
 * whenever it can't be seen and respects prefers-reduced-motion by
 * rendering a single static frame.
 */
export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let streaks: Streak[] = [];
    let frame = 0;
    let nextStreakAt = STREAK_MIN_GAP + Math.random() * (STREAK_MAX_GAP - STREAK_MIN_GAP);
    let rafId = 0;
    let running = false;
    const pointer = { x: -9999, y: -9999 };

    function spawnStreak() {
      // Enter from a random edge, travel diagonally across at high speed.
      const fromLeft = Math.random() > 0.5;
      const speed = 9 + Math.random() * 6;
      const angle = (Math.random() * 30 - 15) * (Math.PI / 180); // mostly horizontal, slight tilt
      const dir = fromLeft ? 1 : -1;
      streaks.push({
        x: fromLeft ? -40 : width + 40,
        y: Math.random() * height * 0.8,
        vx: Math.cos(angle) * speed * dir,
        vy: Math.sin(angle) * speed + speed * 0.15,
        len: 90 + Math.random() * 60,
        life: 0,
        maxLife: 200,
      });
    }

    function seedNodes() {
      const count = Math.min(
        MAX_NODES,
        Math.max(24, Math.floor((width * height) / NODE_SPACING))
      );
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }));
    }

    function resize() {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect?.width ?? window.innerWidth;
      height = rect?.height ?? window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedNodes();
    }

    function step() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      frame++;

      // occasionally spawn a fast "data stream" streak
      if (frame >= nextStreakAt && streaks.length < MAX_STREAKS) {
        spawnStreak();
        nextStreakAt = frame + STREAK_MIN_GAP + Math.random() * (STREAK_MAX_GAP - STREAK_MIN_GAP);
      }

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        const dx = pointer.x - node.x;
        const dy = pointer.y - node.y;
        const dist = Math.hypot(dx, dy);
        if (dist < CURSOR_RADIUS) {
          const pull = (1 - dist / CURSOR_RADIUS) * 0.02;
          node.vx += dx * pull * 0.02;
          node.vy += dy * pull * 0.02;
        }
        // gentle speed damping so cursor interaction never runs away
        node.vx *= 0.995;
        node.vy *= 0.995;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > LINK_DISTANCE) continue;
          const opacity = (1 - dist / LINK_DISTANCE) * 0.35;
          ctx.strokeStyle = `rgba(${LINE_COLOR}, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${NODE_COLOR}, 0.8)`;
        ctx.fill();
      }

      // live connections from the pointer itself — makes the cursor read
      // as a node joining the network, not just a passive force
      if (pointer.x > -1000) {
        for (const node of nodes) {
          const dist = Math.hypot(pointer.x - node.x, pointer.y - node.y);
          if (dist > CURSOR_LINK_DISTANCE) continue;
          const opacity = (1 - dist / CURSOR_LINK_DISTANCE) * 0.5;
          ctx.strokeStyle = `rgba(${LINE_COLOR}, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(node.x, node.y);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${NODE_COLOR}, 0.9)`;
        ctx.fill();
      }

      // fast "data stream" light trails
      for (let i = streaks.length - 1; i >= 0; i--) {
        const s = streaks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life++;

        const tailX = s.x - s.vx * (s.len / Math.hypot(s.vx, s.vy));
        const tailY = s.y - s.vy * (s.len / Math.hypot(s.vx, s.vy));
        const fade = 1 - s.life / s.maxLife;
        const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        gradient.addColorStop(0, `rgba(${LINE_COLOR}, 0)`);
        gradient.addColorStop(1, `rgba(255, 237, 213, ${Math.max(fade, 0) * 0.9})`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        const offCanvas =
          s.x < -100 || s.x > width + 100 || s.y < -100 || s.y > height + 100;
        if (offCanvas || s.life > s.maxLife) streaks.splice(i, 1);
      }
    }

    function loop() {
      if (!running) return;
      step();
      rafId = requestAnimationFrame(loop);
    }

    function start() {
      if (running) return;
      running = true;
      if (reduceMotion) {
        step(); // one static frame — no continuous animation
      } else {
        rafId = requestAnimationFrame(loop);
      }
    }

    function stop() {
      running = false;
      cancelAnimationFrame(rafId);
    }

    function handlePointerMove(e: PointerEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    }

    function handlePointerLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }

    resize();
    start();

    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    visibilityObserver.observe(canvas);

    function handleVisibilityChange() {
      if (document.hidden) stop();
      else start();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
