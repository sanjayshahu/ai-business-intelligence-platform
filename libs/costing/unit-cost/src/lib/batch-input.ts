import { MaterialLine, validateMaterialLine } from './material-line.js';
import { CostingError } from './errors.js';

export type BatchInput = {
  readonly materials: readonly MaterialLine[];
  readonly producedUnits: number;
  readonly currency: string;
};

const CURRENCY_PATTERN = /^[A-Z]{3}$/;

export function validateBatchInput(input: BatchInput): void {
  if (typeof input.currency !== 'string' || !CURRENCY_PATTERN.test(input.currency)) {
    throw new CostingError('COSTING/INVALID_CURRENCY', 'batch: currency must be a valid ISO 4217 code', { field: 'currency' });
  }
  if (!Array.isArray(input.materials) || input.materials.length === 0) {
    throw new CostingError('COSTING/EMPTY_MATERIALS', 'batch: materials must be a non-empty array', { field: 'materials' });
  }
  if (typeof input.producedUnits !== 'number' || !Number.isInteger(input.producedUnits) || input.producedUnits <= 0) {
    throw new CostingError('COSTING/INVALID_PRODUCED_UNITS', 'batch: producedUnits must be a positive integer', {
      field: 'producedUnits',
    });
  }
  input.materials.forEach((line, index) => {
    validateMaterialLine(line, index);
    if (line.unitPrice.currency !== input.currency) {
      throw new CostingError(
        'COSTING/CURRENCY_MISMATCH',
        `materialLine[${index}]: unitPrice.currency "${line.unitPrice.currency}" does not match batch currency "${input.currency}"`,
        { lineIndex: index, field: 'currency' },
      );
    }
  });
}