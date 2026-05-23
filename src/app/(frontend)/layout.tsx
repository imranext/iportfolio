import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import { Cursor } from "@/components/cursor";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ThemeProvider } from "@/components/theme-provider";
import { getPayloadClient } from "@/lib/payload";
import { mediaUrl } from "@/lib/media";
import { fallbackOgImage } from "@/lib/unsplash";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayloadClient();
    const settings = await payload.findGlobal({ slug: "site-settings" });
    const ogUrl = mediaUrl(settings.ogImage as never) || fallbackOgImage;
    return {
      title: {
        default: settings.siteName || "ImranX — Portfolio",
        template: `%s — ${settings.siteName || "ImranX"}`,
      },
      description:
        settings.tagline ||
        "WordPress & Shopify expert. Custom builds, responsive solutions and conversion-focused design.",
      openGraph: {
        title: settings.siteName || "ImranX — Portfolio",
        description: settings.tagline || "",
        images: [{ url: ogUrl }],
        type: "website",
      },
    };
  } catch {
    return {
      title: "ImranX — Portfolio",
      description:
        "WordPress & Shopify expert. Custom builds, responsive solutions and conversion-focused design.",
      openGraph: {
        images: [{ url: fallbackOgImage }],
      },
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased has-custom-cursor">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            <Cursor />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
