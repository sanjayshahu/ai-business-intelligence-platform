import { Decimal, fromDecimal, fromNumber, fromString, isNegative } from './decimal.js';
import { CostingError } from './errors.js';

export type UnitPrice = {
  readonly amount: Decimal;
  readonly currency: string;
  readonly perUnit: string;
};

const CURRENCY_PATTERN = /^[A-Z]{3}$/;
const UNIT_PATTERN = /^[A-Za-z][A-Za-z0-9_\-/]*$/;

export function toUnitPrice(
  amount: string | number | Decimal,
  currency: string,
  perUnit: string,
  field = 'unitPrice',
): UnitPrice {
  if (typeof currency !== 'string' || !CURRENCY_PATTERN.test(currency)) {
    throw new CostingError('COSTING/INVALID_CURRENCY', `unitPrice: invalid ISO 4217 currency for ${field}`, { field });
  }
  if (typeof perUnit !== 'string' || !UNIT_PATTERN.test(perUnit)) {
    throw new CostingError('COSTING/INVALID_UNIT', `unitPrice: invalid perUnit for ${field}`, { field });
  }
  let decimal: Decimal;
  try {
    if (typeof amount === 'string') decimal = fromString(amount, field);
    else if (typeof amount === 'number') decimal = fromNumber(amount, field);
    else decimal = fromDecimal(amount, field);
  } catch {
    throw new CostingError('COSTING/INVALID_NUMBER', `unitPrice: ${field} is not a valid amount`, { field });
  }
  if (isNegative(decimal)) {
    throw new CostingError('COSTING/INVALID_PRICE', `unitPrice: ${field} must not be negative`, { field });
  }
  return { amount: decimal, currency, perUnit };
}