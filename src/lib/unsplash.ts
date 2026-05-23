/**
 * Curated free Unsplash photo URLs used as graceful fallbacks when the CMS is empty.
 * All images are from photographers who released them under the Unsplash License,
 * which permits commercial use without attribution. We attribute anyway in the UI footer.
 *
 * Format helper:
 *   img(id, w?) → https://images.unsplash.com/photo-<id>?w=<w>&auto=format&fit=crop&q=80
 */
const BASE = "https://images.unsplash.com/photo-";

const img = (id: string, w = 1600) =>
  `${BASE}${id}?w=${w}&auto=format&fit=crop&q=80`;

export const fallbackHeroPortrait = img("1573497019940-1c28c88b4f3e", 900); // confident professional portrait
export const fallbackAboutPortrait = img("1531746020798-e6953c6e8e04", 900); // working at desk
export const fallbackOgImage = img("1517077304055-6e89abbf09b0", 1600);

export const fallbackPortfolio = [
  {
    title: "Acme Storefront",
    slug: "acme-storefront",
    category: "shopify",
    summary:
      "Custom Shopify theme with conversion-tuned PDP, performance budget under 1.5s LCP and a slick checkout extension.",
    coverUrl: img("1607082348824-0a96f2a4b9da", 1400),
    tech: ["Shopify", "Liquid", "Hydrogen"],
    liveUrl: "https://example.com",
  },
  {
    title: "Lumen Studio",
    slug: "lumen-studio",
    category: "wordpress",
    summary:
      "Bespoke WordPress build with custom Gutenberg blocks, ACF, and a content-led design system.",
    coverUrl: img("1467232004584-a241de8bcf5d", 1400),
    tech: ["WordPress", "ACF", "Sass"],
    liveUrl: "https://example.com",
  },
  {
    title: "Northwind SaaS",
    slug: "northwind-saas",
    category: "uiux",
    summary:
      "End-to-end product redesign for a B2B analytics SaaS — research, design system, and front-end build.",
    coverUrl: img("1460925895917-afdab827c52f", 1400),
    tech: ["Figma", "Webflow", "Framer"],
    liveUrl: "https://example.com",
  },
  {
    title: "Helio Marketplace",
    slug: "helio-marketplace",
    category: "webflow",
    summary:
      "Animated marketing site for a multi-vendor marketplace, built in Webflow with custom GSAP scroll scenes.",
    coverUrl: img("1551434678-e076c223a692", 1400),
    tech: ["Webflow", "GSAP", "Lottie"],
    liveUrl: "https://example.com",
  },
  {
    title: "Cosmic Sport",
    slug: "cosmic-sport",
    category: "shopify",
    summary:
      "Performance-first Shopify rebuild for a sports apparel brand. Headless storefront and edge personalisation.",
    coverUrl: img("1521577352947-9bb58764b69a", 1400),
    tech: ["Shopify", "Next.js", "Edge"],
    liveUrl: "https://example.com",
  },
  {
    title: "Solace Wellness",
    slug: "solace-wellness",
    category: "uiux",
    summary:
      "Brand and product design for a wellness mobile app. Pixel-perfect UI, prototyping, and design tokens.",
    coverUrl: img("1517245386807-bb43f82c33c4", 1400),
    tech: ["Figma", "Lottie", "iOS"],
    liveUrl: "https://example.com",
  },
];

export const fallbackTestimonialAvatars = [
  img("1535713875002-d1d0cf377fde", 200),
  img("1599566150163-29194dcaad36", 200),
  img("1494790108377-be9c29b29330", 200),
  img("1438761681033-6461ffad8d80", 200),
  img("1500648767791-00dcc994a43e", 200),
];

export const fallbackTestimonials = [
  {
    id: "ph-1",
    name: "Brandon Fraser",
    role: "Senior Software Dev",
    company: "Cosmic Sport",
    quote:
      "Working with Imran was a great experience. He built our WordPress site exactly the way we wanted — modern, fast, and easy to manage. Communication was smooth and every detail was handled professionally.",
    rating: 5,
  },
  {
    id: "ph-2",
    name: "Tim Bailey",
    role: "SEO Specialist",
    company: "Theme Junction",
    quote:
      "Imran helped us redesign and optimize our Shopify store, and the results were amazing. The site looks premium, loads faster, and provides a much better shopping experience.",
    rating: 5,
  },
  {
    id: "ph-3",
    name: "Sarah Chen",
    role: "Founder",
    company: "Bloom Wellness",
    quote:
      "We needed a professional eCommerce site, and Imran delivered beyond expectations. From custom design to performance optimization, everything was done perfectly.",
    rating: 5,
  },
  {
    id: "ph-4",
    name: "Marcus Reid",
    role: "Marketing Lead",
    company: "Helio Labs",
    quote:
      "Pixel-perfect builds delivered on time. Imran is one of those rare devs who actually cares about animations and micro-interactions. Will hire again.",
    rating: 5,
  },
];

export const unsplashAttribution =
  "Photos via Unsplash (free, no attribution required) — used as placeholders until you upload your own.";
