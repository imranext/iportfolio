"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Service = {
  id: string | number;
  title: string;
  description: string;
  icon?: string | null;
  accentColor?: string | null;
};

const accentMap: Record<string, { bg: string; text: string; ring: string }> = {
  purple: {
    bg: "bg-accent-purple/15",
    text: "text-accent-purple",
    ring: "group-hover:shadow-[0_0_0_4px_rgba(108,108,229,0.18)]",
  },
  coral: {
    bg: "bg-accent-coral/15",
    text: "text-accent-coral",
    ring: "group-hover:shadow-[0_0_0_4px_rgba(255,76,96,0.18)]",
  },
  yellow: {
    bg: "bg-accent-yellow/15",
    text: "text-accent-yellow",
    ring: "group-hover:shadow-[0_0_0_4px_rgba(255,209,92,0.22)]",
  },
  teal: {
    bg: "bg-accent-teal/15",
    text: "text-accent-teal",
    ring: "group-hover:shadow-[0_0_0_4px_rgba(68,215,182,0.18)]",
  },
};

function getIcon(name?: string | null): LucideIcon {
  if (!name) return Icons.Sparkles;
  const Comp = (Icons as unknown as Record<string, LucideIcon>)[name];
  return Comp || Icons.Sparkles;
}

export function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-start gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">
              What I&apos;m offering
            </p>
            <h2 className="section-heading mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Services
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            End-to-end design and development for businesses that want to stand out and convert.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const tone = accentMap[s.accentColor || "purple"] || accentMap.purple;
            const Icon = getIcon(s.icon);
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card className="group h-full transition hover:-translate-y-1 hover:shadow-xl">
                  <CardHeader>
                    <div
                      className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${tone.bg} ${tone.text} ${tone.ring} transition`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      0{i + 1}
                    </span>
                    <CardTitle>{s.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3">
                      {s.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
