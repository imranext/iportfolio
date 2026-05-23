"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PortfolioItem = {
  id: string | number;
  title: string;
  slug: string;
  category: string;
  summary: string;
  cover: { url?: string | null; alt?: string | null } | null | undefined;
  liveUrl?: string | null;
  tech?: { label: string }[];
};

const CATEGORIES: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "wordpress", label: "WordPress" },
  { value: "shopify", label: "Shopify" },
  { value: "webflow", label: "Webflow" },
  { value: "uiux", label: "UI/UX" },
  { value: "other", label: "Other" },
];

export function Portfolio({ items }: { items: PortfolioItem[] }) {
  const [filter, setFilter] = useState("all");

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.category === filter)),
    [items, filter],
  );

  // Hide categories that have no items (besides "all")
  const availableCats = useMemo(() => {
    const set = new Set(items.map((i) => i.category));
    return CATEGORIES.filter((c) => c.value === "all" || set.has(c.value));
  }, [items]);

  return (
    <section id="portfolio" className="py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-start gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Portfolio
            </p>
            <h2 className="section-heading mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Case Studies
            </h2>
          </div>
          {items.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {availableCats.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setFilter(c.value)}
                  className={cn(
                    "rounded-full border border-border px-4 py-1.5 text-sm transition",
                    filter === c.value
                      ? "bg-foreground text-background"
                      : "bg-card/60 hover:bg-accent",
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {visible.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-border bg-card/30 px-6 py-16 text-center">
            <p className="text-lg font-medium">No portfolios available yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Add your first project from the admin panel — Collections → Portfolio.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  {item.cover && typeof item.cover === "object" && item.cover.url ? (
                    <Image
                      src={item.cover.url}
                      alt={item.cover.alt || item.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-purple/30 to-accent-coral/30 text-foreground/40">
                      No cover
                    </div>
                  )}
                  <Badge className="absolute left-4 top-4 capitalize">
                    {item.category}
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {item.summary}
                  </p>
                  {item.tech && item.tech.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.tech.slice(0, 4).map((t, idx) => (
                        <span
                          key={t.label + idx}
                          className="rounded-full bg-accent px-2.5 py-0.5 text-xs text-muted-foreground"
                        >
                          {t.label}
                        </span>
                      ))}
                    </div>
                  )}
                  {item.liveUrl && (
                    <div className="mt-5">
                      <Button asChild size="sm" variant="outline">
                        <a href={item.liveUrl} target="_blank" rel="noopener noreferrer">
                          Visit site <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
