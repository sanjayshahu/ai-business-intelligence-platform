import { describe, expect, it } from 'vitest';
import { validateBatchInput } from './batch-input.js';
import { toQuantity } from './quantity.js';
import { toUnitPrice } from './unit-price.js';

const mk = (qty: string, unit: string, price: string, perUnit: string, currency = 'USD') => ({
  materialId: 'M-1',
  quantity: toQuantity(qty, unit),
  unitPrice: toUnitPrice(price, currency, perUnit),
});

describe('batch input validation', () => {
  it('rejects negative quantity', () => {
    expect(() => toQuantity('-1', 'kg')).toThrow();
  });

  it('rejects negative unit price', () => {
    expect(() => toUnitPrice('-1', 'USD', 'kg')).toThrow();
  });

  it('rejects unit mismatch within a line', () => {
    const line = {
      materialId: 'M-1',
      quantity: toQuantity('1', 'kg'),
      unitPrice: toUnitPrice('2', 'USD', 'g'),
    };
    expect(() =>
      validateBatchInput({ materials: [line], producedUnits: 1, currency: 'USD' }),
    ).toThrow();
  });

  it('rejects currency mismatch between line and batch', () => {
    const line = mk('1', 'kg', '2', 'kg', 'EUR');
    expect(() =>
      validateBatchInput({ materials: [line], producedUnits: 1, currency: 'USD' }),
    ).toThrow();
  });

  it('rejects zero produced units', () => {
    const line = mk('1', 'kg', '2', 'kg');
    expect(() =>
      validateBatchInput({ materials: [line], producedUnits: 0, currency: 'USD' }),
    ).toThrow();
  });

  it('rejects non-integer produced units', () => {
    const line = mk('1', 'kg', '2', 'kg');
    expect(() =>
      validateBatchInput({ materials: [line], producedUnits: 1.5, currency: 'USD' }),
    ).toThrow();
  });

  it('rejects empty materials', () => {
    expect(() =>
      validateBatchInput({ materials: [], producedUnits: 1, currency: 'USD' }),
    ).toThrow();
  });
});