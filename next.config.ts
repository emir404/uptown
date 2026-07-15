import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
    ],
  },
  // sharp's libvips native lib is loaded via dlopen at runtime, so Next's
  // file tracer can't see it. Force-include the Linux binaries so they land
  // in the Vercel serverless function bundle.
  outputFileTracingIncludes: {
    "**/*": [
      "./node_modules/@img/sharp-linux-x64/**/*",
      "./node_modules/@img/sharp-libvips-linux-x64/**/*",
    ],
  },
};

export default withPayload(nextConfig);
