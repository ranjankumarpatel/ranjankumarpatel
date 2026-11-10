import type { NextConfig } from "next";

// The site is served from https://ranjankumarpatel.github.io/ranjankumarpatel/
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ranjankumarpatel",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
