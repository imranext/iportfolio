import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Portfolio } from "@/components/sections/portfolio";
import { Services } from "@/components/sections/services";
import { Skills } from "@/components/sections/skills";
import { Testimonials } from "@/components/sections/testimonials";
import { mediaUrl } from "@/lib/media";
import { getPayloadClient } from "@/lib/payload";

export const revalidate = 60; // ISR: re-fetch CMS data every 60s

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error("[home] data fetch failed:", err);
    return fallback;
  }
}

export default async function HomePage() {
  const payload = await getPayloadClient().catch(() => null);

  if (!payload) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 text-center">
        <div className="max-w-md">
          <h1 className="font-display text-3xl font-bold">Payload not connected</h1>
          <p className="mt-3 text-muted-foreground">
            Set <code>DATABASE_URI</code> and <code>PAYLOAD_SECRET</code> in <code>.env</code>,
            then restart <code>pnpm dev</code>.
          </p>
        </div>
      </main>
    );
  }

  const [hero, about, contactData, settings, services, portfolio, experience, education, skills, testimonials] =
    await Promise.all([
      safe(() => payload.findGlobal({ slug: "hero" }), null as never),
      safe(() => payload.findGlobal({ slug: "about" }), null as never),
      safe(() => payload.findGlobal({ slug: "contact" }), null as never),
      safe(() => payload.findGlobal({ slug: "site-settings" }), null as never),
      safe(
        () => payload.find({ collection: "services", limit: 8, sort: "order" }),
        { docs: [] } as never,
      ),
      safe(
        () => payload.find({ collection: "portfolio", limit: 12, sort: "order", depth: 1 }),
        { docs: [] } as never,
      ),
      safe(
        () => payload.find({ collection: "experience", limit: 20, sort: "-startDate" }),
        { docs: [] } as never,
      ),
      safe(
        () => payload.find({ collection: "education", limit: 20, sort: "-startDate" }),
        { docs: [] } as never,
      ),
      safe(
        () => payload.find({ collection: "skills", limit: 20, sort: "order" }),
        { docs: [] } as never,
      ),
      safe(
        () => payload.find({ collection: "testimonials", limit: 12, sort: "order", depth: 1 }),
        { docs: [] } as never,
      ),
    ]);

  const heroData = (hero ?? {}) as {
    available?: boolean;
    greeting?: string;
    name?: string;
    rotatingRoles?: { label: string }[];
    trustText?: string;
    ratingText?: string;
    stats?: { value: string; label: string }[];
    marquee?: { label: string }[];
    primaryCta?: { label?: string; href?: string };
  };

  const aboutData = (about ?? {}) as {
    heading?: string;
    description?: string;
    portrait?: { url?: string };
    highlights?: { label: string }[];
  };

  const contact = (contactData ?? {}) as {
    heading?: string;
    email?: string;
    phone?: string;
    address?: string;
    formEnabled?: boolean;
    socials?: { platform: string; url: string }[];
  };

  const settingsData = (settings ?? {}) as {
    siteName?: string;
    cv?: { url?: string };
    footer?: { copyright?: string };
  };

  const siteName = settingsData.siteName || "ImranX";
  const cvUrl = mediaUrl(settingsData.cv as never) || undefined;

  const docs = <T,>(result: unknown): T[] => {
    if (!result || typeof result !== "object" || !("docs" in result)) return [];
    return ((result as { docs: T[] }).docs || []) as T[];
  };

  // Use the homepage's existing demo testimonials if the CMS is empty so the
  // section is never blank for new admins.
  const testimonialDocs = docs<{
    id: string | number;
    name: string;
    role?: string | null;
    company?: string | null;
    quote: string;
    rating?: number | null;
  }>(testimonials);
  const testimonialItems =
    testimonialDocs.length > 0
      ? testimonialDocs
      : (await import("@/lib/unsplash")).fallbackTestimonials;

  return (
    <>
      <Header siteName={siteName} cvUrl={cvUrl} />
      <main>
        <Hero
          available={heroData.available}
          greeting={heroData.greeting}
          name={heroData.name || "Imran"}
          rotatingRoles={heroData.rotatingRoles || []}
          trustText={heroData.trustText}
          ratingText={heroData.ratingText}
          stats={heroData.stats || []}
          primaryCta={heroData.primaryCta}
          portraitUrl={mediaUrl(aboutData.portrait as never) || undefined}
        />

        <Marquee items={(heroData.marquee || []).map((m) => m.label)} />

        <About
          heading={aboutData.heading}
          description={aboutData.description}
          highlights={aboutData.highlights}
          portraitUrl={mediaUrl(aboutData.portrait as never) || undefined}
          cvUrl={cvUrl}
        />

        <Services services={docs(services)} />

        <Portfolio items={docs(portfolio)} />

        <Experience
          experience={docs(experience)}
          education={docs(education)}
        />

        <Skills skills={docs(skills)} />

        <Testimonials items={testimonialItems} />

        <Contact
          heading={contact.heading}
          email={contact.email}
          phone={contact.phone}
          address={contact.address}
          formEnabled={contact.formEnabled ?? true}
          socials={contact.socials}
        />
      </main>
      <Footer
        siteName={siteName}
        copyright={settingsData.footer?.copyright}
        showUnsplashAttribution={
          docs(portfolio).length === 0 || testimonialDocs.length === 0
        }
      />
    </>
  );
}
