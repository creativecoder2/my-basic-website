// @playwright/test se test aur expect ko import karen
const { test, expect } = require('@playwright/test');

test('should open website and check title', async ({ page }) => {
  // Browser ko headless mode mein na chalane ke liye
  const browser = await require('playwright').chromium.launch({
    headless: false  // False karenge toh browser visible hoga
  });

  const context = await browser.newContext();
  page = await context.newPage();

  await page.goto('http://127.0.0.1:5500/index.html');  // Aapki website ka local address
  const title = await page.title();
  expect(title).toBe('My Basic Website');
  await page.waitForTimeout(5000);
  // Test ke baad browser close karna
  await browser.close();
});
