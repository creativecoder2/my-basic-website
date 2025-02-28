const { test, expect } = require('@playwright/test');

test('should open website and check title', async ({ page }) => {
  // Navigate to the website
  await page.goto('http://127.0.0.1:5500/index.html');

  // Check the title of the page
  const title = await page.title();
  expect(title).toBe('My Basic Website'); // Replace with the expected title
});