import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Next.js refuses to optimize images from private addresses, which
    // includes a local Strapi. Allowed in development only, so the localhost
    // pattern below works there and production stays protected.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      // Uploads served relative to the Strapi origin (toMediaUrl prefixes them
      // with STRAPI_API_URL).
      {
        protocol: "https",
        hostname: "cms.friendsofnyinawajambo.org",
      },
      // Strapi Cloud stores uploads on its own CDN and returns absolute URLs
      // for them, so those bypass the origin above.
      {
        protocol: "https",
        hostname: "**.media.strapiapp.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
    ],
  },
};

export default nextConfig;
