import { divideExact, multiply } from './decimal.js';
import { BatchInput, validateBatchInput } from './batch-input.js';
import {
  ASSUMPTIONS,
  BatchCostResult,
  CALCULATION_VERSION,
  LineCost,
} from './batch-cost-result.js';

export function calculateBatchCost(input: BatchInput): BatchCostResult {
  validateBatchInput(input);

  // Line costs in raw scaled space: units are scaled by 10^(2*SCALE).
  const rawLineUnits: { materialId: string; units: bigint }[] = input.materials.map((line) => ({
    materialId: line.materialId,
    units: multiply(line.quantity.value, line.unitPrice.amount).units,
  }));

  const rawTotal = rawLineUnits.reduce<bigint>((acc, l) => acc + l.units, 0n);
  const totalUnits = divideByScaleHalfUp(rawTotal);

  // per-unit = total / producedUnits, using the same half-up rule.
  const perUnit = divideExact(
    { units: totalUnits },
    { units: BigInt(input.producedUnits) * pow10(SCALE),
    },
    'costPerProducedUnit',
  ).units;

  const lineCosts: LineCost[] = rawLineUnits.map((l) => ({
    materialId: l.materialId,
    lineCost: { amount: { units: divideByScaleHalfUp(l.units) }, currency: input.currency },
  }));

  return {
    totalBatchCost: { amount: { units: totalUnits }, currency: input.currency },
    costPerProducedUnit: { amount: { units: perUnit }, currency: input.currency },
    producedUnits: input.producedUnits,
    currency: input.currency,
    calculationVersion: CALCULATION_VERSION,
    assumptions: ASSUMPTIONS,
    lineCosts,
  };
}

const SCALE = 4n;
const SCALE_FACTOR = 10n ** SCALE;

function divideByScaleHalfUp(rawUnits: bigint): bigint {
  const negative = rawUnits < 0n;
  const abs = negative ? -rawUnits : rawUnits;
  const q = abs / SCALE_FACTOR;
  const r = abs % SCALE_FACTOR;
  const rounded = r * 2n >= SCALE_FACTOR ? q + 1n : q;
  return negative ? -rounded : rounded;
}

function pow10(exp: bigint): bigint {
  let result = 1n;
  for (let i = 0n; i < exp; i++) result *= 10n;
  return result;
}