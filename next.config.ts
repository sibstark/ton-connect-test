import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "out",
  images: {
    unoptimized: true, // GitHub Pages doesn't support dynamic image optimization
  },
  /* config options here */
};

export default nextConfig;
