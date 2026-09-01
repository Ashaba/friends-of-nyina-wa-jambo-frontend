import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
