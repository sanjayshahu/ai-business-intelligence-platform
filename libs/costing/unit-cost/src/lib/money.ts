import { Decimal, fromDecimal, fromNumber, fromString, isNegative } from './decimal.js';
import { CostingError } from './errors.js';

export type Money = {
  readonly amount: Decimal;
  readonly currency: string;
};

const CURRENCY_PATTERN = /^[A-Z]{3}$/;

export function toMoney(
  amount: string | number | Decimal,
  currency: string,
  field = 'money',
): Money {
  if (typeof currency !== 'string' || !CURRENCY_PATTERN.test(currency)) {
    throw new CostingError('COSTING/INVALID_CURRENCY', `money: invalid ISO 4217 currency for ${field}`, { field });
  }
  let decimal: Decimal;
  try {
    if (typeof amount === 'string') decimal = fromString(amount, field);
    else if (typeof amount === 'number') decimal = fromNumber(amount, field);
    else decimal = fromDecimal(amount, field);
  } catch {
    throw new CostingError('COSTING/INVALID_NUMBER', `money: ${field} is not a valid amount`, { field });
  }
  if (isNegative(decimal)) {
    throw new CostingError('COSTING/INVALID_PRICE', `money: ${field} must not be negative`, { field });
  }
  return { amount: decimal, currency };
}

export function isNegativeDecimal(value: Decimal): boolean {
  return isNegative(value);
}