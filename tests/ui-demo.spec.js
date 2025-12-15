/**
 * Playwright smoke tests for ui-demo.html.
 *
 * Run instructions:
 * 1. npm install --save-dev @playwright/test
 * 2. npx playwright install
 * 3. npx playwright test tests/ui-demo.spec.js
 */
const path = require("path");
const { test, expect } = require("@playwright/test");

const pageUrl = `file://${path.resolve(__dirname, "../public_html/ui-demo.html")}`;

test.describe("JRavah UI demo", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl);
    await page.addInitScript(() => {
      window.open = (...args) => {
        window.__lastWindowOpen = args;
      };
    });
  });

  test("only one product card expands at a time", async ({ page }) => {
    const cards = page.locator(".main-grid .product-card");
    await expect(cards.first()).toBeVisible();

    await cards.nth(0).locator(".select-btn").click();
    await expect(cards.nth(0)).toHaveClass(/open/);

    await cards.nth(1).locator(".select-btn").click();
    await expect(cards.nth(1)).toHaveClass(/open/);
    await expect(cards.nth(0)).not.toHaveClass(/open/);
  });

  test("best-loved preview shows only limited cards", async ({ page }) => {
    const visibleCards = await page.$$eval(".preview-grid .product-card", (nodes) =>
      nodes.filter((node) => getComputedStyle(node).display !== "none").length
    );
    expect(visibleCards).toBeLessThanOrEqual(8);
  });

  test("video modal plays and stops", async ({ page }) => {
    await page.locator(".hero figure button").click();
    const modal = page.locator("#videoModal");
    await expect(modal).toHaveClass(/open/);
    await expect(modal.locator("iframe")).toHaveCount(1);

    await modal.locator(".video-close").click();
    await expect(modal).not.toHaveClass(/open/);
    await expect(modal.locator("iframe")).toHaveCount(0);
  });

  test("checkout opens WhatsApp link", async ({ page }) => {
    const firstCard = page.locator(".main-grid .product-card").first();
    await firstCard.locator(".select-btn").click();
    await firstCard.locator(".add-cart-btn").click();
    await page.locator(".checkout-btn").click();
    const result = await page.evaluate(() => window.__lastWindowOpen);
    expect(result).toBeTruthy();
    expect(result[0]).toMatch(/https:\/\/wa\.me\/919999999999/);
  });

  test("WhatsApp button is visible", async ({ page }) => {
    await expect(page.locator(".whatsapp-button")).toBeVisible();
  });
});

