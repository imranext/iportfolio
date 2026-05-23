import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Allow your own deployed domain to serve admin-uploaded media
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
