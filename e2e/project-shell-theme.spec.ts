// Ticket: IQ-1
import { test, expect } from '@playwright/test';

test.describe('IQ-1: Project shell and theme layout', () => {
  test('AC1: Home page has CTA to start quote process', async ({ page }) => {
    await page.goto('/');
    const cta = page.getByTestId('hero-cta-btn');
    await expect(cta).toBeVisible();
    await cta.click();
    await expect(page).toHaveURL(/\/quote/);
  });

  test('AC1: Navigation links are present in navbar', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('navbar')).toBeVisible();
    await expect(page.getByTestId('nav-home-link')).toBeVisible();
    await expect(page.getByTestId('nav-quote-link')).toBeVisible();
  });

  test('AC1: /quote page renders multi-step form with progress indicator', async ({ page }) => {
    await page.goto('/quote');
    await expect(page.getByTestId('progress-indicator')).toBeVisible();
    await expect(page.getByTestId('step-1-heading')).toBeVisible();
  });

  test('AC1: Progress indicator updates as user moves through steps', async ({ page }) => {
    await page.goto('/quote');
    await expect(page.getByTestId('progress-indicator')).toBeVisible();

    // Fill required fields and advance to step 2
    await page.getByLabel(/full name/i).fill('Jane Doe');
    await page.getByLabel(/email/i).fill('jane@example.com');
    await page.getByLabel(/phone/i).fill('5551234567');
    await page.getByLabel(/zip/i).fill('10001');
    await page.getByRole('button', { name: /next/i }).click();

    // Step 2 should now be active - vehicle info heading or step indicator
    await expect(page.getByText(/vehicle info/i).first()).toBeVisible();
  });

  test('AC2: Theme toggle button is present in navbar', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('theme-toggle-btn')).toBeVisible();
  });

  test('AC2: Dark/Light mode toggle switches theme', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByTestId('theme-toggle-btn');
    await expect(toggle).toHaveAttribute('aria-label', 'Switch to dark mode');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  test('AC2: Dark/Light mode persists across page refresh', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByTestId('theme-toggle-btn');

    // Switch to dark mode
    await expect(toggle).toHaveAttribute('aria-label', 'Switch to dark mode');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-label', 'Switch to light mode');

    // Reload and verify dark mode persisted
    await page.reload();
    await expect(page.getByTestId('theme-toggle-btn')).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  test('AC3: Layout is responsive - mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await expect(page.getByTestId('navbar')).toBeVisible();
    await expect(page.getByTestId('home-page')).toBeVisible();
  });

  test('AC3: Layout is responsive - tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page.getByTestId('navbar')).toBeVisible();
    await expect(page.getByTestId('home-page')).toBeVisible();
  });

  test('AC3: Layout is responsive - desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await expect(page.getByTestId('navbar')).toBeVisible();
    await expect(page.getByTestId('home-page')).toBeVisible();
  });

  test('AC4: Navigation from Home to Quote page works', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('nav-quote-link').click();
    await expect(page).toHaveURL(/\/quote/);
  });

  test('AC4: /summary page renders', async ({ page }) => {
    await page.goto('/summary');
    await expect(page.getByTestId('navbar')).toBeVisible();
    // Summary page should have some content
    await expect(page.locator('main, [data-testid*="summary"]').first()).toBeVisible();
  });

  test('AC4: Navigation from Summary back to Home works', async ({ page }) => {
    await page.goto('/summary');
    await page.getByTestId('nav-home-link').click();
    await expect(page).toHaveURL('/');
  });
});
