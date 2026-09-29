import { test, expect } from '@playwright/test';

test.describe('batch cost page', () => {
  test('computes total and per-unit for a valid batch', async ({ page }) => {
    await page.goto('/costing/batch');

    await page.getByLabel('Currency', { exact: true }).fill('USD');
    await page.getByLabel('Produced units', { exact: true }).fill('10');
    await page.getByLabel('Material ID', { exact: true }).fill('A');
    await page.getByLabel('Quantity', { exact: true }).fill('10');
    await page.getByLabel('Unit', { exact: true }).fill('kg');
    await page.getByLabel('Unit price', { exact: true }).fill('2.5');
    await page.getByLabel('Per unit', { exact: true }).fill('kg');

    await page.getByRole('button', { name: 'Calculate' }).click();

    await expect(page.getByTestId('total-batch-cost')).toContainText('25.0000');
    await expect(page.getByTestId('cost-per-unit')).toContainText('2.5000');
    await expect(page.getByTestId('calculation-version')).toHaveText(
      'batch-cost-v1',
    );
  });

  test('shows the typed error code for invalid input', async ({ page }) => {
    await page.goto('/costing/batch');

    await page.getByLabel('Currency', { exact: true }).fill('USD');
    await page.getByLabel('Produced units', { exact: true }).fill('1');
    await page.getByLabel('Material ID', { exact: true }).fill('A');
    await page.getByLabel('Quantity', { exact: true }).fill('-1');
    await page.getByLabel('Unit', { exact: true }).fill('kg');
    await page.getByLabel('Unit price', { exact: true }).fill('2');
    await page.getByLabel('Per unit', { exact: true }).fill('kg');

    await page.getByRole('button', { name: 'Calculate' }).click();

    await expect(page.getByTestId('error-code')).toHaveText(
      'COSTING/INVALID_QUANTITY',
    );
  });
});