import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "out",
  images: {
    unoptimized: true, // GitHub Pages doesn't support dynamic image optimization
  },
  basePath: "/ton-connect-test"
};

export default nextConfig;
