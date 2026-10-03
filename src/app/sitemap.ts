import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const paths = [
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
  return paths.map((path) => ({ url: new URL(path, siteUrl).href }));
}
