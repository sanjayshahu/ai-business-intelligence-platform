import { Decimal, fromDecimal, fromNumber, fromString, isNegative } from './decimal.js';
import { CostingError } from './errors.js';

export type Quantity = {
  readonly value: Decimal;
  readonly unit: string;
};

const UNIT_PATTERN = /^[A-Za-z][A-Za-z0-9_\-/]*$/;

export function toQuantity(
  value: string | number | Decimal,
  unit: string,
  field = 'quantity',
): Quantity {
  if (typeof unit !== 'string' || !UNIT_PATTERN.test(unit)) {
    throw new CostingError('COSTING/INVALID_UNIT', `quantity: invalid unit for ${field}`, { field });
  }
  let decimal: Decimal;
  try {
    if (typeof value === 'string') decimal = fromString(value, field);
    else if (typeof value === 'number') decimal = fromNumber(value, field);
    else decimal = fromDecimal(value, field);
  } catch {
    throw new CostingError('COSTING/INVALID_NUMBER', `quantity: ${field} is not a valid number`, { field });
  }
  if (isNegative(decimal)) {
    throw new CostingError('COSTING/INVALID_QUANTITY', `quantity: ${field} must not be negative`, { field });
  }
  return { value: decimal, unit };
}