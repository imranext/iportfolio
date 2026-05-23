"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { RevealText, ScrollReveal } from "@/components/scroll-reveal";
import { Card, CardContent } from "@/components/ui/card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Skill = {
  id: string | number;
  name: string;
  percentage: number;
  tagline?: string | null;
};

export function Skills({ skills }: { skills: Skill[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-bar]").forEach((bar) => {
        const target = parseFloat(bar.dataset.target || "0");
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${target}%`,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
        const num = bar.parentElement?.parentElement?.querySelector<HTMLElement>(
          "[data-num]",
        );
        if (num) {
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 1.6,
            ease: "power3.out",
            onUpdate: () => {
              num.textContent = `${Math.round(obj.v)}%`;
            },
            scrollTrigger: {
              trigger: bar,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });
        }
      });
    }, grid);
    return () => ctx.revert();
  }, [skills]);

  if (!skills?.length) return null;

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div>
          <p className="font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Skills
          </p>
          <RevealText
            as="h2"
            className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl"
          >
            Favourite stacks
          </RevealText>
        </div>

        <div ref={gridRef} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s, i) => (
            <ScrollReveal key={s.id} y={20} delay={i * 0.05}>
              <Card className="group h-full transition hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                    <span
                      className="font-display text-2xl font-bold tracking-tight"
                      data-num
                    >
                      0%
                    </span>
                  </div>
                  {s.tagline && (
                    <p className="mt-2 text-sm text-muted-foreground">{s.tagline}</p>
                  )}
                  <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      data-bar
                      data-target={s.percentage}
                      className="h-full rounded-full bg-gradient-to-r from-accent-coral via-accent-yellow to-accent-teal"
                      style={{ width: 0 }}
                    />
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
