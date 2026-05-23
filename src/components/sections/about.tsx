"use client";

import Image from "next/image";
import { Check } from "lucide-react";

import { Magnetic } from "@/components/magnetic";
import { ScrollReveal, RevealText } from "@/components/scroll-reveal";
import { Button } from "@/components/ui/button";
import { fallbackAboutPortrait } from "@/lib/unsplash";

type AboutProps = {
  heading?: string | null;
  description?: string | null;
  highlights?: { label: string }[] | null;
  portraitUrl?: string;
  cvUrl?: string;
};

export function About({ heading, description, highlights, portraitUrl, cvUrl }: AboutProps) {
  const img = portraitUrl || fallbackAboutPortrait;

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.4fr]">
          <ScrollReveal y={40} className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
            <Image
              src={img}
              alt="Portrait"
              fill
              sizes="(min-width: 1024px) 400px, 100vw"
              className="object-cover"
              unoptimized={img.startsWith("https://images.unsplash")}
            />
            <div className="noise-overlay" aria-hidden />
            <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-2xl border border-border/40 bg-background/70 px-4 py-3 backdrop-blur-md">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                Based in
              </p>
              <p className="mt-0.5 font-display text-sm font-semibold">
                Tangail, Bangladesh
              </p>
            </div>
          </ScrollReveal>

          <div>
            <RevealText
              as="h2"
              className="font-display text-4xl font-bold tracking-tight md:text-5xl"
            >
              {heading || "About me"}
            </RevealText>

            <ScrollReveal y={20} delay={0.1}>
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
            </ScrollReveal>

            {highlights && highlights.length > 0 && (
              <ScrollReveal stagger className="mt-8 grid gap-3 sm:grid-cols-2">
                {highlights.map((h) => (
                  <div
                    key={h.label}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 px-4 py-3 backdrop-blur"
                  >
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent-teal/15 text-accent-teal">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium">{h.label}</span>
                  </div>
                ))}
              </ScrollReveal>
            )}

            <ScrollReveal y={16} delay={0.2} className="mt-10 flex flex-wrap gap-3">
              <Magnetic strength={0.25}>
                <Button asChild variant="accent">
                  <a href="#portfolio">View my recent work</a>
                </Button>
              </Magnetic>
              {cvUrl && (
                <Magnetic strength={0.2}>
                  <Button asChild variant="outline">
                    <a href={cvUrl} target="_blank" rel="noopener noreferrer">
                      Download CV
                    </a>
                  </Button>
                </Magnetic>
              )}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
