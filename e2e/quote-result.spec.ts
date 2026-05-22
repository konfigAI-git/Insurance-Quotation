// Ticket: IQ-4
import { test, expect } from '@playwright/test';

async function completeQuoteForm(page: import('@playwright/test').Page) {
  await page.goto('/quote');
  await page.getByTestId('input-full-name').fill('Alice Johnson');
  await page.getByTestId('input-email').fill('alice@example.com');
  await page.getByTestId('input-phone').fill('555-7777');
  await page.getByTestId('input-zip-code').fill('10001');
  await page.getByTestId('step-1-next-btn').click();

  await page.getByTestId('select-vehicle-make').selectOption('Honda');
  await page.getByTestId('select-vehicle-model').selectOption({ index: 1 });
  await page.getByTestId('input-vehicle-year').fill('2019');
  await page.getByTestId('step-2-next-btn').click();

  await page.getByTestId('select-driving-history').selectOption('clean');
  await page.getByTestId('coverage-card-standard').click();
  await page.getByTestId('step-3-next-btn').click();
}

test.describe('IQ-4: Quote Result Screen and LocalStorage', () => {
  test('AC1: Summary page displays all user-entered data accurately', async ({ page }) => {
    await completeQuoteForm(page);

    await expect(page.getByTestId('summary-page')).toBeVisible();
    await expect(page.getByTestId('summary-name')).toContainText('Alice Johnson');
    await expect(page.getByTestId('summary-email')).toContainText('alice@example.com');
    await expect(page.getByTestId('summary-phone')).toContainText('555-7777');
    await expect(page.getByTestId('summary-zip')).toContainText('10001');
  });

  test('AC1: Summary page displays vehicle and plan details', async ({ page }) => {
    await completeQuoteForm(page);

    await expect(page.getByTestId('summary-make')).toContainText('Honda');
    await expect(page.getByTestId('summary-year')).toContainText('2019');
    await expect(page.getByTestId('summary-plan-name')).toBeVisible();
    await expect(page.getByTestId('summary-plan-premium')).toBeVisible();
    await expect(page.getByTestId('summary-plan-deductible')).toBeVisible();
  });

  test('AC2: Edit Quote button returns user to form with previous data', async ({ page }) => {
    await completeQuoteForm(page);

    await page.getByTestId('summary-edit-btn').click();
    await expect(page).toHaveURL(/\/quote/);

    // Form should be pre-filled
    await expect(page.getByTestId('input-full-name')).toHaveValue('Alice Johnson');
  });

  test('AC3: Save Quote stores quote in localStorage', async ({ page }) => {
    await completeQuoteForm(page);

    await page.getByTestId('summary-save-btn').click();

    const quotes = await page.evaluate(() => {
      const raw = localStorage.getItem('insureQuickQuotes');
      return raw ? JSON.parse(raw) : null;
    });

    expect(quotes).not.toBeNull();
    expect(Array.isArray(quotes)).toBe(true);
    expect(quotes.length).toBeGreaterThan(0);
    expect(quotes[quotes.length - 1].fullName).toBe('Alice Johnson');
  });

  test('AC4: Download PDF triggers a download', async ({ page }) => {
    await completeQuoteForm(page);

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByTestId('summary-download-btn').click(),
    ]);

    expect(download).toBeTruthy();
  });

  test('AC5: Saved quotes can be retrieved from Quote History page', async ({ page }) => {
    await completeQuoteForm(page);
    await page.getByTestId('summary-save-btn').click();

    await page.goto('/quotes');
    await expect(page.getByTestId('quote-history')).toBeVisible();

    // Should not show empty state
    await expect(page.getByTestId('history-empty')).not.toBeVisible();
  });

  test('AC5: Quote History lists saved quotes with view button', async ({ page }) => {
    // Seed localStorage with a quote first
    await completeQuoteForm(page);
    await page.getByTestId('summary-save-btn').click();

    await page.goto('/quotes');
    // There should be at least one history item
    const items = page.locator('[data-testid^="history-item-"]');
    await expect(items.first()).toBeVisible();
  });
});
