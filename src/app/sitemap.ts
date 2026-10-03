import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const pagePaths = [
  "/",
  "/messages",
  "/prayers",
  "/novenas",
  "/events",
  "/videos",
  "/prayer-requests",
  "/newsletter",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pagePaths.map((path) => ({ url: new URL(path, siteUrl).href }));
}
