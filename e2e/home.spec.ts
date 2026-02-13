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
    name: /Events & Gatherings/i,
  });
  await expect(heading).toBeVisible();
});
