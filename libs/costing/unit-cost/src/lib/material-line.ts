import { Quantity } from './quantity.js';
import { UnitPrice } from './unit-price.js';
import { CostingError } from './errors.js';

export type MaterialLine = {
  readonly materialId: string;
  readonly quantity: Quantity;
  readonly unitPrice: UnitPrice;
};

export function validateMaterialLine(line: MaterialLine, index: number): void {
  if (typeof line.materialId !== 'string' || line.materialId.trim() === '') {
    throw new CostingError('COSTING/INVALID_MATERIAL_ID', `materialLine[${index}]: materialId must be a non-empty string`, {
      lineIndex: index,
      field: 'materialId',
    });
  }
  if (line.quantity.unit !== line.unitPrice.perUnit) {
    throw new CostingError(
      'COSTING/UNIT_MISMATCH',
      `materialLine[${index}]: quantity.unit "${line.quantity.unit}" does not match unitPrice.perUnit "${line.unitPrice.perUnit}"`,
      { lineIndex: index, field: 'unit' },
    );
  }
}