const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");

test("Verify Login", async () => {
  const browser = await chromium.launch();

  // Create a new browser context
  const context = await browser.newContext();

  // Create a new page in the context
  const page = await context.newPage();

  // Navigate to website
  await page.goto("https://demo.haroldwaste.com/");

  await page.locator('[type="email"]').fill('qa@julesai.com');
  await page.locator('[type="password"]').fill('QaJULES2023!');
  await page.locator('[type="submit"]').click();
  await expect(page.locator('[data-test-id="header-menu"]')).toBeVisible();
});
