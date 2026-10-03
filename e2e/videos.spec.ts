import { test, expect, type Locator, type Page } from "@playwright/test";

async function openFirstVideo(page: Page): Promise<Locator> {
  await page.goto("/videos");
  const card = page.getByRole("button", { name: /Kibeho Shrine/i });
  await card.click();
  return card;
}

test("video modal takes focus when it opens", async ({ page }) => {
  await openFirstVideo(page);

  const dialog = page.getByRole("dialog", { name: /Playing:/ });
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("button", { name: "Close video" })
  ).toBeFocused();
});

test("Escape closes the video modal and returns focus to the card", async ({
  page,
}) => {
  const card = await openFirstVideo(page);

  await page.keyboard.press("Escape");

  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(card).toBeFocused();
});

test("clicking the backdrop closes the video modal", async ({ page }) => {
  await openFirstVideo(page);

  await page.mouse.click(5, 5);

  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("clicking inside the video modal keeps it open", async ({ page }) => {
  await openFirstVideo(page);

  const dialog = page.getByRole("dialog");
  await dialog.getByRole("heading").click();

  await expect(dialog).toBeVisible();
});
