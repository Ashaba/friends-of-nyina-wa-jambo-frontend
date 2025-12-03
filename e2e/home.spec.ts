import { test, expect } from "@playwright/test";

test("homepage shows main heading", async ({ page }) => {
  await page.goto("/");
  const heading = page.getByRole("heading", { name: /Message of the Day/i });
  await expect(heading).toBeVisible();
});
