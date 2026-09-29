import { describe, expect, it } from 'vitest';
import { add, divideExact, fromString, multiply, toString } from './decimal.js';

describe('decimal', () => {
  it('parses a positive decimal', () => {
    expect(toString(fromString('12.5', 'q'))).toBe('12.5000');
  });

  it('parses a negative decimal', () => {
    expect(toString(fromString('-3.25', 'q'))).toBe('-3.2500');
  });

  it('rejects more than 4 decimal places', () => {
    expect(() => fromString('0.12345', 'q')).toThrow();
  });

  it('adds exactly', () => {
    expect(toString(add(fromString('1.1', 'a'), fromString('2.2', 'b')))).toBe('3.3000');
  });

  it('multiplies preserving full precision (no rounding here)', () => {
    // 1.2345 * 1.2345 = 1.52399025 raw; not rounded at this layer.
    const r = multiply(fromString('1.2345', 'a'), fromString('1.2345', 'b'));
    expect(r.units).toBe(152399025n);
  });

  it('rounds half-up at the 4th decimal place', () => {
    // 1 / 3 = 0.33333... -> 0.3333
    expect(toString(divideExact(fromString('1', 'a'), fromString('3', 'b'), 'q'))).toBe('0.3333');
    // 2 / 3 = 0.66666... -> 0.6667 (half-up at the 4th place)
    expect(toString(divideExact(fromString('2', 'a'), fromString('3', 'b'), 'q'))).toBe('0.6667');
  });

  it('rounds half-up exactly at .00005', () => {
    // 0.00005 -> 0.0001 (half-up)
    expect(toString(divideExact(fromString('1', 'a'), fromString('20000', 'b'), 'q'))).toBe('0.0001');
  });
});