import { describe, expect, it } from 'vitest';
import { toMoney } from './money.js';
import { decimalToString } from '../index.js';

describe('money', () => {
  it('accepts a string amount and a valid currency', () => {
    const m = toMoney('10.5', 'USD');
    expect(decimalToString(m.amount)).toBe('10.5000');
    expect(m.currency).toBe('USD');
  });

  it('rejects an invalid currency', () => {
    expect(() => toMoney('10', 'usd')).toThrow();
    expect(() => toMoney('10', 'US')).toThrow();
  });

  it('rejects a negative amount', () => {
    expect(() => toMoney('-1', 'USD')).toThrow();
  });

  it('rejects a non-numeric string', () => {
    expect(() => toMoney('abc', 'USD')).toThrow();
  });
});