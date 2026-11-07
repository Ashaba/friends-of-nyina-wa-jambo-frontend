import { test, expect } from "@playwright/test";

test("homepage shows hero section", async ({ page }) => {
  await page.goto("/");
  const heading = page.getByRole("heading", { name: /Our Lady of Kibeho/i });
  await expect(heading).toBeVisible();
});

test("homepage shows daily message section", async ({ page }) => {
  await page.goto("/");
  const section = page.getByText(/Daily Message/i);
  await expect(section).toBeVisible();
});

test("homepage has working navigation", async ({ page }) => {
  await page.goto("/");

  // Check that the header navigation exists
  const nav = page.locator("nav");
  await expect(nav.first()).toBeVisible();

  // Check for key nav links
  const prayersLink = page.getByRole("link", { name: /Prayers/i }).first();
  await expect(prayersLink).toBeVisible();
});

test("homepage declares the Our Lady of Kibeho tab and home-screen icons", async ({
  page,
}) => {
  await page.goto("/");

  const hrefs = await page
    .locator("head link[rel='icon'], head link[rel='apple-touch-icon']")
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")));

  expect(hrefs).toEqual([
    expect.stringContaining("/favicon.ico"),
    expect.stringContaining("/icon.svg"),
    expect.stringContaining("/apple-icon.png"),
  ]);
  for (const href of hrefs) {
    const response = await page.request.get(href!);
    expect(response.ok()).toBe(true);
  }
});

test("can navigate to prayers page", async ({ page }) => {
  await page.goto("/prayers");
  const heading = page.getByRole("heading", {
    name: "Prayers & Devotions",
    exact: true,
  });
  await expect(heading).toBeVisible();
});

test("can navigate to events page", async ({ page }) => {
  await page.goto("/events");
  const heading = page.getByRole("heading", {
    name: /Events & Activities/i,
  });
  await expect(heading).toBeVisible();
});

test("homepage calls to action are links, not buttons nested in links", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("link", { name: /More about Her Message/i })
  ).toBeVisible();
  await expect(page.locator("a button, a [role='button']")).toHaveCount(0);
});
