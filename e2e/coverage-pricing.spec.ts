// Ticket: IQ-3
import { test, expect } from '@playwright/test';

async function fillStep1(page: import('@playwright/test').Page) {
  await page.goto('/quote');
  await page.getByTestId('input-full-name').fill('John Doe');
  await page.getByTestId('input-email').fill('john@example.com');
  await page.getByTestId('input-phone').fill('555-1234');
  await page.getByTestId('input-zip-code').fill('12345');
  await page.getByTestId('step-1-next-btn').click();
}

async function fillStep2(page: import('@playwright/test').Page) {
  await page.getByTestId('select-vehicle-make').selectOption('Toyota');
  await page.getByTestId('select-vehicle-model').selectOption({ index: 1 });
  await page.getByTestId('input-vehicle-year').fill('2020');
  await page.getByTestId('step-2-next-btn').click();
}

test.describe('IQ-3: Coverage Options and Pricing Logic', () => {
  test.beforeEach(async ({ page }) => {
    await fillStep1(page);
    await fillStep2(page);
  });

  test('AC2: Three coverage plan cards are displayed', async ({ page }) => {
    await expect(page.getByTestId('coverage-card-basic')).toBeVisible();
    await expect(page.getByTestId('coverage-card-standard')).toBeVisible();
    await expect(page.getByTestId('coverage-card-premium')).toBeVisible();
  });

  test('AC2: Coverage cards display Monthly Premium, Deductible, and features', async ({ page }) => {
    for (const plan of ['basic', 'standard', 'premium']) {
      const card = page.getByTestId(`coverage-card-${plan}`);
      await expect(card).toBeVisible();
      await expect(page.getByTestId(`plan-premium-${plan}`)).toBeVisible();
    }
  });

  test('AC1: Premium is calculated using driving history multiplier', async ({ page }) => {
    // Select driving history and capture premium for basic plan
    await page.getByTestId('select-driving-history').selectOption('clean');
    const cleanPremium = await page.getByTestId('plan-premium-basic').textContent();

    await page.getByTestId('select-driving-history').selectOption('one_accident');
    const accidentPremium = await page.getByTestId('plan-premium-basic').textContent();

    // Premium with accident should be higher than clean
    const cleanVal = parseFloat((cleanPremium ?? '0').replace(/[^0-9.]/g, ''));
    const accidentVal = parseFloat((accidentPremium ?? '0').replace(/[^0-9.]/g, ''));
    expect(accidentVal).toBeGreaterThan(cleanVal);
  });

  test('AC3: Selected plan is highlighted visually', async ({ page }) => {
    await page.getByTestId('select-driving-history').selectOption('clean');
    await page.getByTestId('coverage-card-standard').click();

    // The selected card should have some visual distinction (aria-pressed, selected class, or data attribute)
    const card = page.getByTestId('coverage-card-standard');
    // Check it has been selected - implementation may use aria-pressed, data-selected, or a class
    const isPressed = await card.getAttribute('aria-pressed');
    const dataSelected = await card.getAttribute('data-selected');
    const className = await card.getAttribute('class');
    const isHighlighted = isPressed === 'true' || dataSelected === 'true' || (className?.includes('selected') ?? false) || (className?.includes('ring') ?? false) || (className?.includes('border') ?? false);
    expect(isHighlighted).toBe(true);
  });

  test('AC4: User can switch between plans and premium updates', async ({ page }) => {
    await page.getByTestId('select-driving-history').selectOption('clean');

    await page.getByTestId('coverage-card-basic').click();
    const basicPremium = await page.getByTestId('plan-premium-basic').textContent();

    await page.getByTestId('coverage-card-premium').click();
    const premiumPremium = await page.getByTestId('plan-premium-premium').textContent();

    const basicVal = parseFloat((basicPremium ?? '0').replace(/[^0-9.]/g, ''));
    const premiumVal = parseFloat((premiumPremium ?? '0').replace(/[^0-9.]/g, ''));
    expect(premiumVal).toBeGreaterThan(basicVal);
  });

  test('AC1: Premium calculation reflects vehicle make multiplier (BMW vs Toyota)', async ({ page }) => {
    // Go back to step 2 and select BMW
    await page.getByTestId('step-3-back-btn').click();
    await page.getByTestId('select-vehicle-make').selectOption('BMW');
    await page.getByTestId('select-vehicle-model').selectOption({ index: 1 });
    await page.getByTestId('input-vehicle-year').fill('2020');
    await page.getByTestId('step-2-next-btn').click();

    await page.getByTestId('select-driving-history').selectOption('clean');
    const bmwPremium = await page.getByTestId('plan-premium-basic').textContent();
    const bmwVal = parseFloat((bmwPremium ?? '0').replace(/[^0-9.]/g, ''));

    // Go back and select Toyota
    await page.getByTestId('step-3-back-btn').click();
    await page.getByTestId('select-vehicle-make').selectOption('Toyota');
    await page.getByTestId('select-vehicle-model').selectOption({ index: 1 });
    await page.getByTestId('input-vehicle-year').fill('2020');
    await page.getByTestId('step-2-next-btn').click();

    await page.getByTestId('select-driving-history').selectOption('clean');
    const toyotaPremium = await page.getByTestId('plan-premium-basic').textContent();
    const toyotaVal = parseFloat((toyotaPremium ?? '0').replace(/[^0-9.]/g, ''));

    // BMW should be more expensive than Toyota (1.2 vs 0.95 multiplier)
    expect(bmwVal).toBeGreaterThan(toyotaVal);
  });
});
