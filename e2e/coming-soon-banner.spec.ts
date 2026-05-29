// Ticket: TFER-2
import { expect, test } from '@playwright/test';

test.describe('TFER-2: Coming soon banner', () => {
  test('AC1: clicking the banner closes it', async ({ page }) => {
    await page.goto('/');

    const banner = page.getByTestId('coming-soon-banner');
    await expect(banner).toBeVisible();

    await banner.click();
    await expect(banner).toBeHidden();
  });
});
