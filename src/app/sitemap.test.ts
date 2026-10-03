import { readdirSync } from "node:fs";
import { basename, dirname } from "node:path";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("lists every page in the app, so new pages are not left out", () => {
    const pagePaths = readdirSync(__dirname, {
      recursive: true,
      encoding: "utf8",
    })
      .filter((file) => basename(file) === "page.tsx")
      .map((file) => (dirname(file) === "." ? "/" : `/${dirname(file)}`));
    const sitemapPaths = sitemap().map((entry) => new URL(entry.url).pathname);

    expect(sitemapPaths.sort()).toEqual(pagePaths.sort());
  });

  it("uses absolute URLs on the production domain", () => {
    for (const { url } of sitemap()) {
      expect(url).toMatch(/^https:\/\/www\.friendsofnyinawajambo\.org\//);
    }
  });
});
