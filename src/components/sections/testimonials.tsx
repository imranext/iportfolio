"use client";

import Image from "next/image";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Testimonial = {
  id: string | number;
  name: string;
  role?: string | null;
  company?: string | null;
  quote: string;
  rating?: number | null;
  avatar?: { url?: string | null; alt?: string | null } | null;
};

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!items?.length) return null;

  return (
    <section id="testimonials" className="py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-start gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Testimonials
            </p>
            <h2 className="section-heading mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">
              What Clients Say
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              aria-label="Previous"
              onClick={scrollPrev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 backdrop-blur transition hover:bg-accent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              aria-label="Next"
              onClick={scrollNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 backdrop-blur transition hover:bg-accent"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="-ml-6 flex">
            {items.map((t) => (
              <div
                key={t.id}
                className="min-w-0 shrink-0 grow-0 basis-full pl-6 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full">
                  <CardContent className="flex h-full flex-col p-6">
                    <Quote className="h-8 w-8 text-accent-yellow" />
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                      {t.quote}
                    </p>
                    <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                        {t.avatar && typeof t.avatar === "object" && t.avatar.url ? (
                          <Image
                            src={t.avatar.url}
                            alt={t.avatar.alt || t.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center font-display text-lg font-bold text-muted-foreground">
                            {t.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {[t.role, t.company].filter(Boolean).join(", ")}
                        </p>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-3.5 w-3.5",
                              i < (t.rating || 5)
                                ? "fill-accent-yellow text-accent-yellow"
                                : "text-muted",
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
