"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  value: string; // e.g. "8+", "850+", "100%"
  className?: string;
  duration?: number;
};

/**
 * GSAP-driven counter that scrolls into view, animates from 0 → numeric portion of `value`,
 * and re-appends any suffix ("+", "%", "k", etc.).
 */
export function AnimatedCounter({ value, className, duration = 2 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) {
      el.textContent = value;
      return;
    }
    const target = parseFloat(match[1]);
    const suffix = match[2] || "";

    const obj = { v: 0 };
    el.textContent = `0${suffix}`;

    const tween = gsap.to(obj, {
      v: target,
      duration,
      ease: "power3.out",
      onUpdate: () => {
        const display = Number.isInteger(target)
          ? Math.round(obj.v).toString()
          : obj.v.toFixed(1);
        el.textContent = `${display}${suffix}`;
      },
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.kill();
    };
  }, [value, duration]);

  return <span ref={ref} className={className} aria-label={value} />;
}
