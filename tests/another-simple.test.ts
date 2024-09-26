import { test, expect } from '@playwright/test';

test('[COD-669] another test', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit');

  await page.goto('https://playwright.dev/');

  if (browserName === 'firefox') {
    await expect(page).toHaveTitle(/Playwright/);
  }
  await expect(page).toHaveTitle(/Playwright/);
});
