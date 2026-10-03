import { readdirSync } from "node:fs";
import { basename, dirname } from "node:path";
import type { Metadata } from "next";
import sitemap from "./sitemap";

const pages = readdirSync(__dirname, { recursive: true, encoding: "utf8" })
  .filter((file) => basename(file) === "page.tsx")
  .map((file) => ({
    file,
    path: dirname(file) === "." ? "/" : `/${dirname(file)}`,
  }));

describe("pages", () => {
  it("are all listed in the sitemap, so new pages are not left out", () => {
    const sitemapPaths = sitemap().map((entry) => new URL(entry.url).pathname);

    expect(sitemapPaths.sort()).toEqual(pages.map(({ path }) => path).sort());
  });

  it("use absolute sitemap URLs on the production domain", () => {
    for (const { url } of sitemap()) {
      expect(url).toMatch(/^https:\/\/www\.friendsofnyinawajambo\.org\//);
    }
  });

  it.each(pages)(
    "$path sets its own route as the canonical URL",
    async ({ file, path }) => {
      const { metadata }: { metadata: Metadata } = await import(`./${file}`);

      expect(metadata.alternates?.canonical).toBe(path);
    }
  );
});
