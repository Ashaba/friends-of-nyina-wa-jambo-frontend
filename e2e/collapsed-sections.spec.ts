import { test, expect } from "@playwright/test";

const proverbs = /Trust in the Lord with all your heart/;

test("closed novena days are in the page HTML for search engines", async ({
  request,
}) => {
  const response = await request.get("/novenas");
  expect(await response.text()).toMatch(proverbs);
});

test("closed novena days stay hidden until opened", async ({ page }) => {
  await page.goto("/novenas");
  const dayNine = page.getByText(proverbs);
  await expect(dayNine).toBeHidden();

  await page.getByRole("button", { name: /Day 9: Trust & Surrender/ }).click();
  await expect(dayNine).toBeVisible();
});

test("closed messages and prayers are in the page HTML", async ({
  request,
}) => {
  const messages = await (await request.get("/messages")).text();
  expect(messages).toMatch(/proved prophetically significant/);

  const prayers = await (await request.get("/prayers")).text();
  expect(prayers).toMatch(/Holy Sacrifice of the Mass throughout the world/);
});
