"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip on touch

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let dotX = window.innerWidth / 2;
    let dotY = window.innerHeight / 2;
    let ringX = dotX;
    let ringY = dotY;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
      gsap.to(dot, { x: dotX, y: dotY, duration: 0.15, ease: "power3.out" });
    };

    const onEnter = (e: Event) => {
      const t = e.currentTarget as HTMLElement;
      const isLink = t.tagName === "A" || t.tagName === "BUTTON" || t.dataset.cursor === "hover";
      if (isLink) {
        gsap.to(ring, { scale: 1.7, duration: 0.3, ease: "power2.out" });
      }
    };

    const onLeave = () => {
      gsap.to(ring, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    let frame: number;
    const tick = () => {
      ringX += (dotX - ringX) * 0.18;
      ringY += (dotY - ringY) * 0.18;
      gsap.set(ring, { x: ringX, y: ringY });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    document.addEventListener("mousemove", onMove);
    const interactive = document.querySelectorAll<HTMLElement>(
      'a, button, [data-cursor="hover"]',
    );
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("mousemove", onMove);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 w-9 rounded-full border border-foreground/40 mix-blend-difference md:block"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 rounded-full bg-foreground mix-blend-difference md:block"
      />
    </>
  );
}
