"use client";

import { useEffect, useRef } from "react";

type Bokeh = {
  x: number;
  y: number;
  vy: number;
  r: number;
  o: number;
  hueShift: number;
};

type Speck = {
  x: number;
  y: number;
  vy: number;
  r: number;
  o: number;
};

/**
 * Bokeh azul denso en franja horizontal central + puntos finos tipo glitter en todo el frame.
 * Movimiento lento hacia abajo con velocidades distintas (parallax).
 */
export function BackgroundFallingParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(
      typeof window !== "undefined" ? window.devicePixelRatio : 1,
      2,
    );
    let w = 0;
    let h = 0;
    let raf = 0;
    const bokeh: Bokeh[] = [];
    const specks: Speck[] = [];

    function bandY() {
      return h * (0.32 + Math.random() * 0.36);
    }

    function init() {
      bokeh.length = 0;
      specks.length = 0;

      const nBokeh = Math.min(95, Math.max(42, Math.floor((w * h) / 14000)));
      for (let i = 0; i < nBokeh; i++) {
        const inBand = Math.random() < 0.78;
        bokeh.push({
          x: Math.random() * w,
          y: inBand ? bandY() : Math.random() * h,
          vy: 0.08 + Math.random() * 0.38,
          r: 6 + Math.random() * 62,
          o: 0.06 + Math.random() * 0.38,
          hueShift: Math.random(),
        });
      }

      const nSpeck = Math.min(320, Math.max(120, Math.floor((w * h) / 4500)));
      for (let i = 0; i < nSpeck; i++) {
        specks.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vy: 0.12 + Math.random() * 0.55,
          r: 0.25 + Math.random() * 1.1,
          o: 0.08 + Math.random() * 0.62,
        });
      }
    }

    function viewportH() {
      if (typeof window === "undefined") return 0;
      const vv = window.visualViewport;
      return Math.max(
        vv?.height ?? 0,
        window.innerHeight,
        document.documentElement?.clientHeight ?? 0,
      );
    }

    function resize() {
      w = window.innerWidth;
      h = viewportH();
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.ceil(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    }

    function drawBokeh(b: Bokeh) {
      const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      const c1 = `rgba(${80 + b.hueShift * 40}, ${180 + b.hueShift * 50}, 255, ${b.o})`;
      const c2 = `rgba(${35 + b.hueShift * 25}, ${90 + b.hueShift * 30}, ${160 + b.hueShift * 40}, ${b.o * 0.45})`;
      const c3 = `rgba(15, 35, 70, 0)`;
      g.addColorStop(0, c1);
      g.addColorStop(0.45, c2);
      g.addColorStop(1, c3);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    }

    function loop() {
      if (w < 1 || h < 1) {
        raf = requestAnimationFrame(loop);
        return;
      }
      ctx.clearRect(0, 0, w, h);

      for (const b of bokeh) {
        b.y += b.vy;
        b.x += Math.sin(b.y * 0.002 + b.r) * 0.15;
        if (b.y > h + b.r) {
          b.y = -b.r;
          b.x = Math.random() * w;
          if (Math.random() < 0.78) b.y = bandY() - Math.random() * h * 0.08;
        }
        drawBokeh(b);
      }

      for (const s of specks) {
        s.y += s.vy;
        if (s.y > h + 2) {
          s.y = -2;
          s.x = Math.random() * w;
        }
        const band = s.y > h * 0.3 && s.y < h * 0.68 ? 1.15 : 0.85;
        const o = Math.min(0.85, s.o * band);
        ctx.fillStyle = `rgba(220, 235, 255, ${o})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(loop);
    }

    resize();
    raf = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    window.visualViewport?.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.visualViewport?.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
