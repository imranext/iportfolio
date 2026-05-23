import { Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { Card, CardContent } from "@/components/ui/card";

type Social = { platform: string; url: string };

type ContactProps = {
  heading?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  formEnabled?: boolean | null;
  socials?: Social[] | null;
};

const platformLabels: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  twitter: "X / Twitter",
  instagram: "Instagram",
  dribbble: "Dribbble",
  behance: "Behance",
  upwork: "Upwork",
  fiverr: "Fiverr",
  youtube: "YouTube",
};

export function Contact({
  heading,
  email,
  phone,
  address,
  formEnabled,
  socials,
}: ContactProps) {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="rounded-3xl border border-border bg-card/60 p-8 md:p-14 backdrop-blur">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Contact
              </p>
              <h2 className="section-heading mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">
                {heading || "Let's work together"}
              </h2>

              <ul className="mt-10 space-y-4">
                {email && (
                  <li className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-coral/15 text-accent-coral">
                      <Mail className="h-5 w-5" />
                    </span>
                    <a href={`mailto:${email}`} className="font-medium hover:underline">
                      {email}
                    </a>
                  </li>
                )}
                {phone && (
                  <li className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-yellow/15 text-accent-yellow">
                      <Phone className="h-5 w-5" />
                    </span>
                    <a href={`tel:${phone.replace(/\s+/g, "")}`} className="font-medium hover:underline">
                      {phone}
                    </a>
                  </li>
                )}
                {address && (
                  <li className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-teal/15 text-accent-teal">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <span className="font-medium">{address}</span>
                  </li>
                )}
              </ul>

              {socials && socials.length > 0 && (
                <div className="mt-10">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Find me on
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {socials.map((s, i) => (
                      <li key={s.platform + i}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-accent"
                        >
                          {platformLabels[s.platform] || s.platform}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {formEnabled && (
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h3 className="font-display text-xl font-semibold">Send a message</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    I&apos;ll reply within 24 hours.
                  </p>
                  <div className="mt-6">
                    <ContactForm />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
