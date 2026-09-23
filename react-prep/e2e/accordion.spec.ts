import { test, expect } from "@playwright/test";

test.describe("Accordion Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should render accordion title", async ({ page }) => {
    await expect(page.getByText("Accordion")).toBeVisible();
  });

  test("should render accordion items", async ({ page }) => {
    const buttons = page.locator(".a-t");
    await expect(buttons.first()).toBeVisible();
  });

  test("should show description when item is clicked", async ({ page }) => {
    const firstButton = page.locator(".a-t").first();

    await firstButton.click();

    const desc = page.locator(".a-d").first();
    await expect(desc).toBeVisible();
  });

  test("should hide description when same item is clicked again", async ({ page }) => {
    const firstButton = page.locator(".a-t").first();

    await firstButton.click();
    await expect(page.locator(".a-d").first()).toBeVisible();

    await firstButton.click();
    await expect(page.locator(".a-d")).toHaveCount(0);
  });

  test("should only open one accordion item at a time", async ({ page }) => {
    const buttons = page.locator(".a-t");

    await buttons.nth(0).click();
    await expect(page.locator(".a-d")).toHaveCount(1);

    await buttons.nth(1).click();

    const openItems = page.locator(".a-d");
    await expect(openItems).toHaveCount(1);
  });

  test("should toggle indicator text correctly", async ({ page }) => {
    const firstButton = page.locator(".a-t").first();
    const indicator = firstButton.locator(".a-a");

    await expect(indicator).toHaveText("d");

    await firstButton.click();
    await expect(indicator).toHaveText("u");

    await firstButton.click();
    await expect(indicator).toHaveText("d");
  });

  test("should show 'no items found' when data is empty", async ({ page }) => {
    await page.goto("/?empty=true");

    await expect(page.getByText("no items found")).toBeVisible();
  });
});