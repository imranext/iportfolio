"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";

import { ScrollReveal, RevealText } from "@/components/scroll-reveal";
import { Magnetic } from "@/components/magnetic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fallbackPortfolio } from "@/lib/unsplash";
import { cn } from "@/lib/utils";

type PortfolioItem = {
  id: string | number;
  title: string;
  slug: string;
  category: string;
  summary: string;
  cover?: { url?: string | null; alt?: string | null } | null;
  coverUrl?: string;
  liveUrl?: string | null;
  tech?: { label: string }[] | string[];
};

const CATEGORIES: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "wordpress", label: "WordPress" },
  { value: "shopify", label: "Shopify" },
  { value: "webflow", label: "Webflow" },
  { value: "uiux", label: "UI/UX" },
  { value: "other", label: "Other" },
];

function normalizeCover(item: PortfolioItem): string | null {
  if (item.coverUrl) return item.coverUrl;
  const c = item.cover;
  if (c && typeof c === "object" && c.url) return c.url;
  return null;
}

function normalizeTech(item: PortfolioItem): string[] {
  if (!item.tech) return [];
  return (item.tech as Array<{ label: string } | string>).map((t) =>
    typeof t === "string" ? t : t.label,
  );
}

export function Portfolio({ items: incoming }: { items: PortfolioItem[] }) {
  const [filter, setFilter] = useState("all");

  // If no portfolio items in CMS yet, gracefully use Unsplash placeholders so the
  // section never looks empty.
  const items = useMemo<PortfolioItem[]>(() => {
    if (incoming && incoming.length > 0) return incoming;
    return fallbackPortfolio.map((p, i) => ({
      id: `placeholder-${i}`,
      title: p.title,
      slug: p.slug,
      category: p.category,
      summary: p.summary,
      coverUrl: p.coverUrl,
      tech: p.tech,
      liveUrl: p.liveUrl,
    }));
  }, [incoming]);

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.category === filter)),
    [items, filter],
  );

  const availableCats = useMemo(() => {
    const set = new Set(items.map((i) => i.category));
    return CATEGORIES.filter((c) => c.value === "all" || set.has(c.value));
  }, [items]);

  const isPlaceholder = !incoming || incoming.length === 0;

  return (
    <section id="portfolio" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Selected work
            </p>
            <RevealText
              as="h2"
              className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl"
            >
              Case studies
            </RevealText>
          </div>

          <div className="flex flex-wrap gap-2">
            {availableCats.map((c) => (
              <button
                key={c.value}
                onClick={() => setFilter(c.value)}
                className={cn(
                  "rounded-full border border-border px-4 py-1.5 text-sm transition",
                  filter === c.value
                    ? "bg-foreground text-background"
                    : "bg-card/60 backdrop-blur hover:bg-accent",
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {isPlaceholder && (
          <ScrollReveal y={12} delay={0.1}>
            <p className="mt-6 inline-block rounded-full border border-dashed border-border bg-card/40 px-4 py-1.5 text-xs text-muted-foreground">
              ✨ Showing demo projects with Unsplash imagery — replace from the admin panel.
            </p>
          </ScrollReveal>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => {
              const cover = normalizeCover(item);
              const tech = normalizeTech(item);
              return (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  whileHover={{ y: -6 }}
                  className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:shadow-2xl"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                    {cover ? (
                      <Image
                        src={cover}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-110"
                        unoptimized={cover.startsWith("https://images.unsplash")}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-purple/30 to-accent-coral/30 text-foreground/40">
                        No cover
                      </div>
                    )}
                    <div className="noise-overlay" aria-hidden />
                    <Badge className="absolute left-4 top-4 capitalize backdrop-blur">
                      {item.category}
                    </Badge>

                    {/* Hover overlay with View link */}
                    <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/70 via-black/0 to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                      {item.liveUrl && (
                        <Magnetic strength={0.2}>
                          <Button asChild size="sm" variant="accent">
                            <a
                              href={item.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Visit site
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                        </Magnetic>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {item.summary}
                    </p>
                    {tech.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {tech.slice(0, 4).map((t, idx) => (
                          <span
                            key={t + idx}
                            className="rounded-full bg-accent px-2.5 py-0.5 text-xs text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
