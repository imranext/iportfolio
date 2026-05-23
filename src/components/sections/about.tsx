import Image from "next/image";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";

type AboutProps = {
  heading?: string | null;
  description?: string | null;
  highlights?: { label: string }[] | null;
  portraitUrl?: string;
  cvUrl?: string;
};

export function About({ heading, description, highlights, portraitUrl, cvUrl }: AboutProps) {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
            {portraitUrl ? (
              <Image
                src={portraitUrl}
                alt="Portrait"
                fill
                sizes="(min-width: 1024px) 400px, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-purple/30 to-accent-teal/30 text-muted-foreground">
                Add a portrait in admin → Globals → About
              </div>
            )}
          </div>

          <div>
            <h2 className="section-heading font-display text-4xl font-bold tracking-tight md:text-5xl">
              {heading || "About"}
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>

            {highlights && highlights.length > 0 && (
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {highlights.map((h) => (
                  <li
                    key={h.label}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 px-4 py-3 backdrop-blur"
                  >
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent-teal/15 text-accent-teal">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium">{h.label}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild variant="accent">
                <a href="#portfolio">View my recent tasks</a>
              </Button>
              {cvUrl && (
                <Button asChild variant="outline">
                  <a href={cvUrl} target="_blank" rel="noopener noreferrer">
                    Download CV
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
