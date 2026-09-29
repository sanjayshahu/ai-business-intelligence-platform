import { describe, expect, it } from 'vitest';
import { calculateBatchCost } from './calculate-batch-cost.js';
import { toQuantity } from './quantity.js';
import { toUnitPrice } from './unit-price.js';

function line(
  materialId: string,
  qty: string,
  unit: string,
  price: string,
  perUnit = unit,
  currency = 'USD',
) {
  return {
    materialId,
    quantity: toQuantity(qty, unit),
    unitPrice: toUnitPrice(price, currency, perUnit),
  };
}

describe('calculateBatchCost', () => {
  it('returns exact total for one material', () => {
    const r = calculateBatchCost({
      materials: [line('A', '10', 'kg', '2.5')],
      producedUnits: 10,
      currency: 'USD',
    });
    expect(r.totalBatchCost.amount.units).toBe(250000n); // 25.0000
    expect(r.costPerProducedUnit.amount.units).toBe(25000n); // 2.5000
    expect(r.calculationVersion).toBe('batch-cost-v1');
    expect(r.assumptions.length).toBeGreaterThan(0);
  });

  it('returns exact per-unit value when divisible', () => {
    const r = calculateBatchCost({
      materials: [line('A', '5', 'kg', '3'), line('B', '5', 'kg', '3')],
      producedUnits: 4,
      currency: 'USD',
    });
    expect(r.totalBatchCost.amount.units).toBe(300000n); // 30.0000
    expect(r.costPerProducedUnit.amount.units).toBe(75000n); // 7.5000
  });

  it('rounds only at the boundary, not before', () => {
    const r = calculateBatchCost({
      materials: [line('A', '0.3333', 'kg', '1')],
      producedUnits: 1,
      currency: 'USD',
    });
    expect(r.totalBatchCost.amount.units).toBe(3333n); // 3.3330
    expect(r.costPerProducedUnit.amount.units).toBe(3333n);
  });

  it('accepts zero quantity with zero line cost', () => {
    const r = calculateBatchCost({
      materials: [line('A', '0', 'kg', '5')],
      producedUnits: 1,
      currency: 'USD',
    });
    expect(r.totalBatchCost.amount.units).toBe(0n);
    expect(r.lineCosts[0].lineCost.amount.units).toBe(0n);
  });

  it('accepts zero price with zero line cost', () => {
    const r = calculateBatchCost({
      materials: [line('A', '5', 'kg', '0')],
      producedUnits: 1,
      currency: 'USD',
    });
    expect(r.totalBatchCost.amount.units).toBe(0n);
  });

  it('is order-independent and deterministic', () => {
    const lines = [
      line('A', '1.5', 'kg', '2.25'),
      line('B', '3', 'kg', '1.1'),
      line('C', '0.5', 'kg', '9.99'),
    ];
    const a = calculateBatchCost({ materials: lines, producedUnits: 7, currency: 'USD' });
    const b = calculateBatchCost({
      materials: [...lines].reverse(),
      producedUnits: 7,
      currency: 'USD',
    });
    expect(a.totalBatchCost.amount.units).toBe(b.totalBatchCost.amount.units);
    expect(a.costPerProducedUnit.amount.units).toBe(b.costPerProducedUnit.amount.units);
  });

  it('sum of lineCosts equals totalBatchCost after boundary rounding', () => {
    const r = calculateBatchCost({
      materials: [line('A', '1', 'kg', '0.1111'), line('B', '1', 'kg', '0.2222')],
      producedUnits: 3,
      currency: 'USD',
    });
    const sumLines = r.lineCosts.reduce<bigint>(
      (acc, l) => acc + l.lineCost.amount.units,
      0n,
    );
    expect(sumLines).toBe(r.totalBatchCost.amount.units);
  });
});