export const SCALE = 4n;
export const SCALE_FACTOR = 10n ** SCALE;

export type Decimal = {
  readonly units: bigint;
};

const DECIMAL_PATTERN = /^-?\d+(\.\d+)?$/;

export function fromString(input: string, field: string): Decimal {
  const trimmed = input.trim();
  if (!DECIMAL_PATTERN.test(trimmed)) {
    throw new RangeError(`decimal: "${input}" is not a valid decimal for ${field}`);
  }
  const negative = trimmed.startsWith('-');
  const unsigned = negative ? trimmed.slice(1) : trimmed;
  const [whole, fraction = ''] = unsigned.split('.');
  if (fraction.length > Number(SCALE)) {
    throw new RangeError(`decimal: "${input}" for ${field} has more than ${SCALE} decimal places`);
  }
  const padded = fraction.padEnd(Number(SCALE), '0');
  const units = BigInt(`${whole}${padded}`);
  return { units: negative ? -units : units };
}

export function fromNumber(input: number, field: string): Decimal {
  if (!Number.isFinite(input)) {
    throw new RangeError(`decimal: ${field} must be finite, got ${input}`);
  }
  return fromString(input.toString(), field);
}

export function fromDecimal(input: Decimal, field: string): Decimal {
  if (typeof input !== 'object' || input === null || typeof (input as { units?: unknown }).units !== 'bigint') {
    throw new RangeError(`decimal: ${field} must be a Decimal`);
  }
  return input;
}

export function add(a: Decimal, b: Decimal): Decimal {
  return { units: a.units + b.units };
}

export function multiply(a: Decimal, b: Decimal): Decimal {
  return { units: a.units * b.units };
}

export function divideExact(a: Decimal, b: Decimal, field: string): Decimal {
  if (b.units === 0n) throw new RangeError(`decimal: division by zero for ${field}`);
  const numerator = a.units * SCALE_FACTOR;
  return { units: divideRoundHalfUp(numerator, b.units) };
}

export function divideRoundHalfUp(numerator: bigint, denominator: bigint): bigint {
  if (denominator === 0n) throw new RangeError('decimal: division by zero');
  const negative = (numerator < 0n) !== (denominator < 0n);
  const n = numerator < 0n ? -numerator : numerator;
  const d = denominator < 0n ? -denominator : denominator;
  const q = n / d;
  const r = n % d;
  const rounded = r * 2n >= d ? q + 1n : q;
  return negative ? -rounded : rounded;
}

export function roundHalfUp(value: Decimal): Decimal {
  return value;
}

export function toString(value: Decimal): string {
  const negative = value.units < 0n;
  const abs = negative ? -value.units : value.units;
  const whole = abs / SCALE_FACTOR;
  const fraction = abs % SCALE_FACTOR;
  return `${negative ? '-' : ''}${whole}.${fraction.toString().padStart(Number(SCALE), '0')}`;
}
export function isNegative(value: Decimal): boolean {
  return value.units < 0n;
}