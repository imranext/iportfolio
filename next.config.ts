import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Vercel Blob (when BLOB_READ_WRITE_TOKEN is set on Vercel)
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      // Allow other https origins (e.g. your custom CDN). Tighten if needed.
      { protocol: "https", hostname: "**" },
    ],
  },
  // Payload admin uploads can exceed Next.js's default 1MB limit.
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
