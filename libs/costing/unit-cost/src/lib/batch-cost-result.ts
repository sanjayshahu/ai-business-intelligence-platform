import { Money } from './money.js';

export const CALCULATION_VERSION = 'batch-cost-v1' as const;

export const ASSUMPTIONS: readonly string[] = [
  'currency: single currency per batch',
  'rounding: half-up, 4 dp',
  'yield: not modelled (cost is per produced unit, not per saleable unit)',
  'pricing: not modelled',
  'overheads: not modelled',
] as const;

export type LineCost = {
  readonly materialId: string;
  readonly lineCost: Money;
};

export type BatchCostResult = {
  readonly totalBatchCost: Money;
  readonly costPerProducedUnit: Money;
  readonly producedUnits: number;
  readonly currency: string;
  readonly calculationVersion: typeof CALCULATION_VERSION;
  readonly assumptions: readonly string[];
  readonly lineCosts: readonly LineCost[];
};