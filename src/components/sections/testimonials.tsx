"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

import { RevealText } from "@/components/scroll-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { fallbackTestimonialAvatars } from "@/lib/unsplash";
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

  // Autoplay every 5s
  useEffect(() => {
    if (!emblaApi) return;
    const id = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => window.clearInterval(id);
  }, [emblaApi]);

  if (!items?.length) return null;

  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Testimonials
            </p>
            <RevealText
              as="h2"
              className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl"
            >
              Loved by clients
            </RevealText>
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
            {items.map((t, i) => {
              const avatarUrl =
                (t.avatar && typeof t.avatar === "object" && t.avatar.url) ||
                fallbackTestimonialAvatars[i % fallbackTestimonialAvatars.length];
              return (
                <div
                  key={t.id}
                  className="min-w-0 shrink-0 grow-0 basis-full pl-6 md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="group relative h-full overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="noise-overlay" aria-hidden />
                    <CardContent className="relative flex h-full flex-col p-6">
                      <Quote className="h-8 w-8 text-accent-yellow" />
                      <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted ring-2 ring-background">
                          <Image
                            src={avatarUrl}
                            alt={
                              (t.avatar && typeof t.avatar === "object" && t.avatar.alt) ||
                              t.name
                            }
                            fill
                            sizes="48px"
                            className="object-cover"
                            unoptimized={avatarUrl.startsWith("https://images.unsplash")}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold">{t.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {[t.role, t.company].filter(Boolean).join(", ")}
                          </p>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, idx) => (
                            <Star
                              key={idx}
                              className={cn(
                                "h-3.5 w-3.5",
                                idx < (t.rating || 5)
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
