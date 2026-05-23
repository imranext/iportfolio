"use client";

import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Skill = {
  id: string | number;
  name: string;
  percentage: number;
  tagline?: string | null;
};

export function Skills({ skills }: { skills: Skill[] }) {
  if (!skills?.length) return null;
  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div>
          <p className="font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Skills
          </p>
          <h2 className="section-heading mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">
            My Favourite Stacks
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                    <span className="font-display text-2xl font-bold tracking-tight">
                      {s.percentage}%
                    </span>
                  </div>
                  {s.tagline && (
                    <p className="mt-2 text-sm text-muted-foreground">{s.tagline}</p>
                  )}
                  <Progress
                    value={s.percentage}
                    className="mt-5"
                    indicatorClassName="bg-gradient-to-r from-accent-coral to-accent-yellow"
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
