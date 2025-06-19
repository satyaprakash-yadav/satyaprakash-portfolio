import type { NextConfig } from "next";
import withPlaiceholder from "@plaiceholder/next";
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
      },
    ],
  },
};

export default withPlaiceholder(nextConfig);
