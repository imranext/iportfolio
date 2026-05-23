"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger reveal each direct child of the wrapper */
  stagger?: boolean;
  delay?: number;
  y?: number;
  once?: boolean;
};

export function ScrollReveal({
  children,
  className,
  stagger = false,
  delay = 0,
  y = 28,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = stagger
      ? Array.from(root.children) as HTMLElement[]
      : [root as HTMLElement];

    gsap.set(targets, { opacity: 0, y });

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: stagger ? 0.08 : 0,
      delay,
      scrollTrigger: {
        trigger: root,
        start: "top 85%",
        toggleActions: once ? "play none none none" : "play none none reverse",
      },
    });

    return () => {
      tween.kill();
    };
  }, [stagger, delay, y, once]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

/** Word-by-word reveal of a heading on scroll */
export function RevealText({
  children,
  className,
  as: Tag = "h2",
}: {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>(".reveal-word");

    gsap.set(words, { yPercent: 100, opacity: 0 });

    const tween = gsap.to(words, {
      yPercent: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power4.out",
      stagger: 0.05,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.kill();
    };
  }, [children]);

  const words = children.split(" ");

  return (
    <Tag
      ref={ref as React.Ref<HTMLHeadingElement>}
      className={cn("section-heading inline-block", className)}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom pr-[0.25em]"
        >
          <span className="reveal-word inline-block">{w}</span>
        </span>
      ))}
    </Tag>
  );
}
