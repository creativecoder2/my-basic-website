import { test, expect } from '@playwright/test';

test('Zindigi webapp flow test', async ({ page }) => {
  // Increase the timeout for this test to 60 seconds
  test.setTimeout(60000);

  // Navigate to the auth page
  await page.goto('https://zindigi.app-dev.planckly.com/auth');

  // Click on "Create My Account"
  await page.getByText('Create My Account').click();

  // Wait for the first image to load and click it
  await page.waitForSelector('img', { state: 'visible' });
  await page.locator('img').first().click();

  // Click on "Login"
  await page.getByText('Login').click();

  // Wait for the first image to load again and click it
  await page.waitForSelector('img', { state: 'visible' });
  await page.locator('img').first().click();

  // Click on "Skip For Now"
  await page.waitForSelector('div:has-text("Skip For Now")', { state: 'visible' });
  await page.locator('div').filter({ hasText: /^Skip For Now$/ }).click();

  // Click on the first image in the "Shops CategoriesBuy" section
  await page.waitForSelector('section:has-text("Shops CategoriesBuy")', { state: 'visible' });
  await page.locator('section').filter({ hasText: 'Shops CategoriesBuy' }).getByRole('img').first().click();

  // Click on the first product image
  await page.waitForSelector('.card_product_image__Oe983', { state: 'visible' });
  await page.locator('.card_product_image__Oe983').first().click();

  // Click on the image in the "Rs 100.00Add to Basket" section
  await page.waitForSelector('section:has-text("Rs 100.00Add to Basket")', { state: 'visible' });
  await page.locator('section').filter({ hasText: 'Rs 100.00Add to Basket' }).locator('img').click();

  // Click on the 4th image in the banner
  await page.waitForSelector('role=banner >> img', { state: 'visible' });
  await page.getByRole('banner').locator('img').nth(3).click();

  // Click on the "Cash" option
  await page.waitForSelector('div:has-text("Cash")', { state: 'visible' });
  await page.locator('div').filter({ hasText: /^Cash$/ }).locator('svg').click();

  // Click on "Collection"
  await page.getByText('Collection', { exact: true }).click();

  // Click on "Pay Now"
  await page.getByText('Pay Now').click();

  // Fill in the "Phone Number" field (using a more specific selector)
  await page.waitForSelector('section:has-text("NamePhoneAddressrequired") input[placeholder="Phone Number"]', { state: 'visible' });
  await page.locator('section:has-text("NamePhoneAddressrequired") input[placeholder="Phone Number"]').click();
  await page.locator('section:has-text("NamePhoneAddressrequired") input[placeholder="Phone Number"]').fill('3132426056');

  // Click on "Login"
  await page.getByText('Login', { exact: true }).click();

  // Fill in the OTP fields
  await page.waitForSelector('[id="\\30 "]', { state: 'visible' });
  await page.locator('[id="\\30 "]').fill('1');
  await page.locator('[id="\\31 "]').fill('2');
  await page.locator('[id="\\32 "]').fill('3');
  await page.locator('[id="\\33 "]').fill('4');
  await page.locator('[id="\\34 "]').fill('5');
  await page.locator('[id="\\35 "]').fill('6');

  // Click on "Collection" again
  await page.getByText('Collection', { exact: true }).click();

  // Click on "Cash"
  await page.getByText('Cash').click();

  // Click on "Pay Now"
  await page.getByText('Pay Now').click();

  // Click on "Confirm"
  await page.getByText('Confirm', { exact: true }).click();
});