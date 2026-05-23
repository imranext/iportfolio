"use client";

import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { RevealText, ScrollReveal } from "@/components/scroll-reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Service = {
  id: string | number;
  title: string;
  description: string;
  icon?: string | null;
  accentColor?: string | null;
};

const accentMap: Record<string, { bg: string; text: string; gradient: string }> = {
  purple: {
    bg: "bg-accent-purple/15",
    text: "text-accent-purple",
    gradient: "from-accent-purple/30 via-accent-purple/0 to-transparent",
  },
  coral: {
    bg: "bg-accent-coral/15",
    text: "text-accent-coral",
    gradient: "from-accent-coral/30 via-accent-coral/0 to-transparent",
  },
  yellow: {
    bg: "bg-accent-yellow/15",
    text: "text-accent-yellow",
    gradient: "from-accent-yellow/30 via-accent-yellow/0 to-transparent",
  },
  teal: {
    bg: "bg-accent-teal/15",
    text: "text-accent-teal",
    gradient: "from-accent-teal/30 via-accent-teal/0 to-transparent",
  },
};

function getIcon(name?: string | null): LucideIcon {
  if (!name) return Icons.Sparkles;
  const Comp = (Icons as unknown as Record<string, LucideIcon>)[name];
  return Comp || Icons.Sparkles;
}

export function Services({ services }: { services: Service[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Hover-driven 3D tilt with GSAP for each card
    const cards = grid.querySelectorAll<HTMLElement>("[data-tilt]");
    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotationY: x * 6,
          rotationX: -y * 6,
          transformPerspective: 1000,
          duration: 0.5,
          ease: "power3.out",
        });
      };
      const onLeave = () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.5)",
        });
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((c) => c());
  }, [services.length]);

  if (!services?.length) return null;

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-start gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">
              What I&apos;m offering
            </p>
            <RevealText
              as="h2"
              className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl"
            >
              Services that ship
            </RevealText>
          </div>
          <ScrollReveal y={16} delay={0.1} className="max-w-md">
            <p className="text-muted-foreground">
              End-to-end design and development for businesses that want to stand
              out, convert, and feel premium.
            </p>
          </ScrollReveal>
        </div>

        <div
          ref={gridRef}
          className="mt-14 grid gap-5 md:grid-cols-6 md:auto-rows-[minmax(220px,auto)]"
        >
          {services.map((s, i) => {
            const tone = accentMap[s.accentColor || "purple"] || accentMap.purple;
            const Icon = getIcon(s.icon);
            // Bento layout: vary cell spans for visual rhythm
            const span =
              i === 0
                ? "md:col-span-3 md:row-span-2"
                : i === 1
                  ? "md:col-span-3"
                  : i === 2
                    ? "md:col-span-2"
                    : i === 3
                      ? "md:col-span-2"
                      : "md:col-span-2";

            return (
              <ScrollReveal key={s.id} y={28} delay={i * 0.05} className={span}>
                <div
                  data-tilt
                  className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-foreground/20"
                >
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tone.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  />
                  <div className="noise-overlay" aria-hidden />

                  <div className="relative flex h-full flex-col p-6 md:p-8">
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${tone.bg} ${tone.text}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      0{i + 1}
                    </span>

                    <h3 className="mt-1 font-display text-xl font-semibold leading-tight md:text-2xl">
                      {s.title}
                    </h3>

                    <p className="mt-3 line-clamp-4 text-sm text-muted-foreground">
                      {s.description}
                    </p>

                    <div className="mt-auto pt-6 text-sm font-medium">
                      <span className="inline-flex items-center gap-1.5 transition group-hover:gap-3">
                        Learn more
                        <Icons.ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
