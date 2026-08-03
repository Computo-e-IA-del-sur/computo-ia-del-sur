"use client";

import { useEffect, useRef } from "react";

type SwarmParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string; // "#2DBEED" (Cian 70%) or "#C9933B" (Dorado 30%)
};

const CYAN_COLOR = "#2DBEED";
const GOLD_COLOR = "#C9933B";
const LINK_THRESHOLD = 150;
const CURSOR_RADIUS = 200;
const REPULSION_RADIUS = 40;

/**
 * SwarmNeuralNetwork Canvas Component.
 * Animación interactiva biomimética de Inteligencia de Enjambre (Swarm Intelligence).
 * Implementación en HTML5 Canvas puro optimizado a 60 FPS sin librerías externas.
 */
export default function SwarmBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: SwarmParticle[] = [];

    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
    };

    // Generar enjambre dinámico (80 a 120 partículas según ancho de pantalla)
    function initParticles() {
      const screenWidth = window.innerWidth;
      const count = Math.min(120, Math.max(80, Math.floor(screenWidth / 12)));
      particles = [];

      for (let i = 0; i < count; i++) {
        const isCyan = Math.random() < 0.7; // 70% Cian (#2DBEED), 30% Dorado (#C9933B)
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          radius: 1.0 + Math.random() * 1.5, // 1px a 2.5px
          color: isCyan ? CYAN_COLOR : GOLD_COLOR,
        });
      }
    }

    // Ajustar dimensiones del canvas con escalado de alta densidad DPI
    function handleResize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    }

    // Bucle principal de física y renderizado
    function animate() {
      ctx!.clearRect(0, 0, width, height);

      // 1. Actualización de movimiento de partículas e interacción con el cursor (Enjambre Curioso)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Posición base por vector de velocidad
        p.x += p.vx;
        p.y += p.vy;

        // Rebotar o envolver suavemente en los bordes de la pantalla
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Interacción con el cursor (Swarm Attraction / Repulsion Fluid Orbit)
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);

          if (dist < CURSOR_RADIUS && dist > 0) {
            if (dist > REPULSION_RADIUS) {
              // Atracción suave hacia el cursor
              const force = (1 - dist / CURSOR_RADIUS) * 0.05;
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
            } else {
              // Repulsión ligera para crear órbita fluida y no amontonarse
              const force = (1 - dist / REPULSION_RADIUS) * 0.08;
              p.vx -= (dx / dist) * force;
              p.vy -= (dy / dist) * force;
            }
          }
        }

        // Amortiguación suave para estabilizar la velocidad del enjambre
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Mantener velocidad mínima de desplazamiento orgánico
        const speed = Math.hypot(p.vx, p.vy);
        if (speed < 0.2) {
          p.vx += (Math.random() - 0.5) * 0.1;
          p.vy += (Math.random() - 0.5) * 0.1;
        }
      }

      // 2. Renderizado de Conexiones Neuronal / Panal (Líneas translúcidas de cercanía)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < LINK_THRESHOLD) {
            const opacity = (1 - dist / LINK_THRESHOLD) * 0.25;
            ctx!.strokeStyle = `rgba(45, 190, 237, ${opacity})`;
            ctx!.lineWidth = 0.8;
            ctx!.beginPath();
            ctx!.moveTo(p1.x, p1.y);
            ctx!.lineTo(p2.x, p2.y);
            ctx!.stroke();
          }
        }
      }

      // 3. Renderizado de Partículas (Nodos / Abejas Digitales)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.shadowColor = p.color;
        ctx!.shadowBlur = 4;
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }

      // 4. Conexiones vivas directas con el cursor del usuario
      if (mouse.active) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dist = Math.hypot(mouse.x - p.x, mouse.y - p.y);
          if (dist < LINK_THRESHOLD) {
            const opacity = (1 - dist / LINK_THRESHOLD) * 0.35;
            ctx!.strokeStyle = `rgba(201, 147, 59, ${opacity})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(mouse.x, mouse.y);
            ctx!.lineTo(p.x, p.y);
            ctx!.stroke();
          }
        }

        // Punto de atractor del cursor
        ctx!.beginPath();
        ctx!.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx!.fillStyle = GOLD_COLOR;
        ctx!.shadowColor = GOLD_COLOR;
        ctx!.shadowBlur = 8;
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }

      animId = requestAnimationFrame(animate);
    }

    // Event Listeners para seguimiento del cursor
    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }

    function handleMouseLeave() {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    }

    // Inicialización
    handleResize();
    animId = requestAnimationFrame(animate);

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    // Limpieza de event listeners y bucle de animación para evitar memory leaks
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] pointer-events-none w-full h-full"
      aria-hidden="true"
    />
  );
}
