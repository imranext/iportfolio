"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";

import { AnimatedCounter } from "@/components/animated-counter";
import { Magnetic } from "@/components/magnetic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fallbackHeroPortrait } from "@/lib/unsplash";

type HeroProps = {
  available?: boolean | null;
  greeting?: string | null;
  name: string;
  rotatingRoles: { label: string }[];
  trustText?: string | null;
  ratingText?: string | null;
  stats: { value: string; label: string }[];
  primaryCta?: { label?: string | null; href?: string | null } | null;
  portraitUrl?: string;
};

export function Hero({
  available,
  greeting,
  name,
  rotatingRoles,
  trustText,
  ratingText,
  stats,
  primaryCta,
  portraitUrl,
}: HeroProps) {
  const heroImage = portraitUrl || fallbackHeroPortrait;

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      {/* Animated mesh gradient + dotted grid + noise = premium feel */}
      <div className="mesh-bg" aria-hidden />
      <div className="bg-dotted absolute inset-0 -z-10" aria-hidden />
      <div className="noise-overlay -z-10" aria-hidden />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            {available && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-6 inline-flex items-center gap-2"
              >
                <Badge className="border-accent-teal/30 bg-accent-teal/10 text-accent-teal">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-teal opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-teal" />
                  </span>
                  AVAILABLE FOR FREELANCE
                </Badge>
              </motion.div>
            )}

            {greeting && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="font-display text-sm uppercase tracking-[0.3em] text-muted-foreground"
              >
                {greeting}
              </motion.p>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mt-2 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl md:text-8xl"
            >
              {name.toUpperCase()}
              <span className="text-accent-coral">.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              {rotatingRoles.map((r, i) => (
                <span
                  key={r.label + i}
                  className="rounded-full border border-border bg-card/70 px-4 py-1.5 text-sm font-medium backdrop-blur"
                >
                  <Sparkles className="mr-1.5 inline h-3.5 w-3.5 text-accent-yellow" />
                  {r.label}
                </span>
              ))}
            </motion.div>

            {(ratingText || trustText) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-0.5 text-accent-yellow">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                {ratingText && <span>{ratingText}</span>}
                {trustText && (
                  <>
                    <span aria-hidden className="text-border">·</span>
                    <span>{trustText}</span>
                  </>
                )}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              {primaryCta?.href && (
                <Magnetic strength={0.25}>
                  <Button asChild size="lg" variant="accent">
                    <a href={primaryCta.href}>
                      {primaryCta.label || "View my work"}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </Magnetic>
              )}
              <Magnetic strength={0.2}>
                <Button asChild size="lg" variant="outline">
                  <a href="#contact">Get in touch</a>
                </Button>
              </Magnetic>
            </motion.div>

            {stats.length > 0 && (
              <motion.dl
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.5 }}
                className="mt-14 grid grid-cols-3 gap-4 max-w-md"
              >
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-4 backdrop-blur transition hover:border-foreground/20"
                  >
                    <dt className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                      <AnimatedCounter value={s.value} />
                    </dt>
                    <dd className="mt-1 text-xs text-muted-foreground">
                      {s.label}
                    </dd>
                    <div className="absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-accent-coral via-accent-yellow to-accent-teal opacity-0 transition group-hover:opacity-100" />
                  </div>
                ))}
              </motion.dl>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative mx-auto aspect-[4/5] w-full max-w-md"
          >
            {/* Soft halo behind portrait */}
            <div className="absolute -inset-6 -z-10 rounded-full bg-gradient-to-br from-accent-coral/40 via-accent-yellow/30 to-accent-purple/30 blur-3xl" />

            {/* Rotating dashed ring */}
            <div className="pointer-events-none absolute inset-0 -z-[5] rounded-[3rem] border border-dashed border-foreground/10 [animation:spin_60s_linear_infinite]" />

            <div className="relative h-full w-full overflow-hidden rounded-[3rem] border border-border bg-card shadow-2xl">
              <Image
                src={heroImage}
                alt={name}
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
                priority
                unoptimized={heroImage.startsWith("https://images.unsplash")}
              />
              <div className="noise-overlay" aria-hidden />
            </div>

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="pointer-events-none absolute -left-6 top-12 hidden rounded-2xl border border-border bg-card/90 p-3 shadow-xl backdrop-blur md:block"
            >
              <div className="flex items-center gap-2 text-xs font-medium">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-accent-yellow/20 text-accent-yellow">
                  <Star className="h-4 w-4 fill-current" />
                </span>
                Top Rated
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="pointer-events-none absolute -right-4 bottom-12 hidden rounded-2xl border border-border bg-card/90 p-3 shadow-xl backdrop-blur md:block"
            >
              <div className="flex items-center gap-2 text-xs font-medium">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-accent-teal/20 text-accent-teal">
                  ⚡
                </span>
                Fast Delivery
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 rounded-2xl border border-border bg-card/90 p-3 shadow-xl backdrop-blur lg:block"
            >
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Available
              </p>
              <p className="mt-1 font-display text-sm font-semibold">
                For new projects
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        <span>Scroll</span>
        <span className="h-8 w-px animate-pulse bg-gradient-to-b from-foreground/40 to-transparent" />
      </div>
    </section>
  );
}
