import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-10-10T10:00:00Z"));
});

test("feast banner counts down to the feast on every page", async ({
  page,
}) => {
  await page.goto("/prayers");

  const banner = page.getByRole("complementary", { name: "Feast countdown" });
  await expect(banner).toContainText(
    "49 days until the Feast of Our Lady of Kibeho."
  );
  await expect(
    banner.getByRole("link", { name: /Read the novena/ })
  ).toHaveAttribute("href", "/novenas");
});

test("a dismissed feast banner stays closed after reloading and on other pages", async ({
  page,
}) => {
  await page.goto("/prayers");
  const banner = page.getByRole("complementary", { name: "Feast countdown" });

  await banner.getByRole("button", { name: "Dismiss countdown" }).click();
  await expect(banner).toBeHidden();

  await page.reload();
  await expect(banner).toBeHidden();

  await page.goto("/events");
  await expect(banner).toBeHidden();
});
