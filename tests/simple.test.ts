import { test, expect } from '@playwright/test';

test('[COD-669] test success', async ({ page, browserName }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('[COD-769] test fail', async ({ page, browserName }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwrightfail/);
});

test('[COD-770] another test success', async ({ page, browserName }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});
