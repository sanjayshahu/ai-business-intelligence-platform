export type CostingErrorCode =
  | 'COSTING/INVALID_NUMBER'
  | 'COSTING/INVALID_QUANTITY'
  | 'COSTING/INVALID_PRICE'
  | 'COSTING/INVALID_UNIT'
  | 'COSTING/INVALID_CURRENCY'
  | 'COSTING/CURRENCY_MISMATCH'
  | 'COSTING/UNIT_MISMATCH'
  | 'COSTING/INVALID_MATERIAL_ID'
  | 'COSTING/INVALID_PRODUCED_UNITS'
  | 'COSTING/EMPTY_MATERIALS'
  | 'COSTING/DIVISION_BY_ZERO';

export class CostingError extends Error {
  readonly code: CostingErrorCode;
  readonly field?: string;
  readonly lineIndex?: number;

  constructor(
    code: CostingErrorCode,
    message: string,
    options: { field?: string; lineIndex?: number } = {},
  ) {
    super(message);
    this.name = 'CostingError';
    this.code = code;
    this.field = options.field;
    this.lineIndex = options.lineIndex;
    Object.setPrototypeOf(this, CostingError.prototype);
  }
}