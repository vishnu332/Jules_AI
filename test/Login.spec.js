const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const locators = require("../locators/loginLocators.json")

test("Verify Login", async () => {
  const browser = await chromium.launch();

  // Create a new browser context
  const context = await browser.newContext();

  // Create a new page in the context
  const page = await context.newPage();

  // Navigate to website
  await page.goto("https://demo.haroldwaste.com/");

  // Case 1: Password too short error mesage displayed
  await page.locator(locators.emailInput).fill('qa@julesai.com');
  await page.locator(locators.passwordInput).fill('QaJU');
  await page.locator(locators.signInButon).click();
  await expect(page.locator(locators.shortPasswordError)).toBeVisible();

  // Case 2: Enter wrong password and verify alert message. 
  // Bug: The close button on alert message does not close the alert.
  await page.locator(locators.emailInput).fill('qa@julesai.com');
  await page.locator(locators.passwordInput).fill('QaJULES2023');
  await page.locator(locators.signInButon).click();
  await expect(page.locator(locators.alertMessage)).toBeVisible();

  try {
    await page.locator(locators.alertMessageClose).click({ timeout: 2000 })
    await expect(page.locator(locators.alertMessage)).not.toBeVisible();
  } catch (error) {
    console.log("Bug: 'X' button on the alert message does not close the alert.");
  }

  // Case 3: Login with correct username and password and validate
  await page.locator(locators.emailInput).fill('qa@julesai.com');
  await page.locator(locators.passwordInput).fill('QaJULES2023!');
  await page.locator(locators.signInButon).click();
  await expect(page.locator(locators.headerMenu)).toBeVisible();
});
