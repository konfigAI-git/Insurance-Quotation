// Ticket: IQ-2
import { test, expect } from '@playwright/test';

test.describe('IQ-2: Multi-step Quote Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/quote');
  });

  test('AC1: Step 1 Next button is disabled until all mandatory fields are valid', async ({ page }) => {
    await expect(page.getByTestId('step-1-next-btn')).toBeDisabled();

    await page.getByTestId('input-full-name').fill('John Doe');
    await page.getByTestId('input-email').fill('john@example.com');
    await page.getByTestId('input-phone').fill('555-1234');
    await page.getByTestId('input-zip-code').fill('12345');

    await expect(page.getByTestId('step-1-next-btn')).toBeEnabled();
  });

  test('AC1: Step 1 validates minimum name length (2 chars)', async ({ page }) => {
    await page.getByTestId('input-full-name').fill('J');
    await page.getByTestId('input-email').fill('j@example.com');
    await page.getByTestId('input-phone').fill('555-1234');
    await page.getByTestId('input-zip-code').fill('12345');

    await expect(page.getByTestId('step-1-next-btn')).toBeDisabled();
  });

  test('AC1: Step 1 validates email format', async ({ page }) => {
    await page.getByTestId('input-full-name').fill('John Doe');
    await page.getByTestId('input-email').fill('not-an-email');
    await page.getByTestId('input-phone').fill('555-1234');
    await page.getByTestId('input-zip-code').fill('12345');

    await expect(page.getByTestId('step-1-next-btn')).toBeDisabled();
  });

  test('AC1: Step 1 validates ZIP code must be 5 digits', async ({ page }) => {
    await page.getByTestId('input-full-name').fill('John Doe');
    await page.getByTestId('input-email').fill('john@example.com');
    await page.getByTestId('input-phone').fill('555-1234');
    await page.getByTestId('input-zip-code').fill('1234');

    await expect(page.getByTestId('step-1-next-btn')).toBeDisabled();
  });

  test('AC2: Vehicle Make/Model dropdowns populated from JSON data', async ({ page }) => {
    await page.getByTestId('input-full-name').fill('John Doe');
    await page.getByTestId('input-email').fill('john@example.com');
    await page.getByTestId('input-phone').fill('555-1234');
    await page.getByTestId('input-zip-code').fill('12345');
    await page.getByTestId('step-1-next-btn').click();

    await expect(page.getByTestId('step-2-vehicle')).toBeVisible();
    const makeSelect = page.getByTestId('select-vehicle-make');
    const options = await makeSelect.locator('option').allTextContents();
    expect(options.length).toBeGreaterThan(1);
    // Should include known makes from vehicles.json
    expect(options.some(o => ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Tesla'].includes(o))).toBe(true);
  });

  test('AC2: Vehicle Model dropdown filters based on selected Make', async ({ page }) => {
    await page.getByTestId('input-full-name').fill('John Doe');
    await page.getByTestId('input-email').fill('john@example.com');
    await page.getByTestId('input-phone').fill('555-1234');
    await page.getByTestId('input-zip-code').fill('12345');
    await page.getByTestId('step-1-next-btn').click();

    await page.getByTestId('select-vehicle-make').selectOption('Toyota');
    const modelOptions = await page.getByTestId('select-vehicle-model').locator('option').allTextContents();
    expect(modelOptions.length).toBeGreaterThan(1);
  });

  test('AC3: User can navigate forward through steps', async ({ page }) => {
    // Step 1 -> Step 2
    await page.getByTestId('input-full-name').fill('John Doe');
    await page.getByTestId('input-email').fill('john@example.com');
    await page.getByTestId('input-phone').fill('555-1234');
    await page.getByTestId('input-zip-code').fill('12345');
    await page.getByTestId('step-1-next-btn').click();

    await expect(page.getByTestId('step-2-vehicle')).toBeVisible();

    // Step 2 -> Step 3
    await page.getByTestId('select-vehicle-make').selectOption('Toyota');
    await page.getByTestId('select-vehicle-model').selectOption({ index: 1 });
    await page.getByTestId('input-vehicle-year').fill('2020');
    await page.getByTestId('step-2-next-btn').click();

    await expect(page.getByTestId('step-3-coverage')).toBeVisible();
  });

  test('AC3: User can navigate backward through steps', async ({ page }) => {
    await page.getByTestId('input-full-name').fill('John Doe');
    await page.getByTestId('input-email').fill('john@example.com');
    await page.getByTestId('input-phone').fill('555-1234');
    await page.getByTestId('input-zip-code').fill('12345');
    await page.getByTestId('step-1-next-btn').click();

    await expect(page.getByTestId('step-2-vehicle')).toBeVisible();
    await page.getByTestId('step-2-back-btn').click();

    await expect(page.getByTestId('step-1-personal')).toBeVisible();
  });

  test('AC4: Form data is persisted when navigating back', async ({ page }) => {
    await page.getByTestId('input-full-name').fill('Jane Smith');
    await page.getByTestId('input-email').fill('jane@example.com');
    await page.getByTestId('input-phone').fill('555-9999');
    await page.getByTestId('input-zip-code').fill('90210');
    await page.getByTestId('step-1-next-btn').click();

    await page.getByTestId('step-2-back-btn').click();

    await expect(page.getByTestId('input-full-name')).toHaveValue('Jane Smith');
    await expect(page.getByTestId('input-email')).toHaveValue('jane@example.com');
  });

  test('AC1: Step 2 Next button disabled until vehicle fields are valid', async ({ page }) => {
    await page.getByTestId('input-full-name').fill('John Doe');
    await page.getByTestId('input-email').fill('john@example.com');
    await page.getByTestId('input-phone').fill('555-1234');
    await page.getByTestId('input-zip-code').fill('12345');
    await page.getByTestId('step-1-next-btn').click();

    await expect(page.getByTestId('step-2-next-btn')).toBeDisabled();
  });

  test('AC1: Step 2 validates vehicle year range 1990 to current year', async ({ page }) => {
    await page.getByTestId('input-full-name').fill('John Doe');
    await page.getByTestId('input-email').fill('john@example.com');
    await page.getByTestId('input-phone').fill('555-1234');
    await page.getByTestId('input-zip-code').fill('12345');
    await page.getByTestId('step-1-next-btn').click();

    await page.getByTestId('select-vehicle-make').selectOption('Toyota');
    await page.getByTestId('select-vehicle-model').selectOption({ index: 1 });
    await page.getByTestId('input-vehicle-year').fill('1980');

    await expect(page.getByTestId('step-2-next-btn')).toBeDisabled();
  });
});
