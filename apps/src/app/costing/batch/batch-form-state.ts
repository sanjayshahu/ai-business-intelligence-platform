export type MaterialLineForm = {
  materialId: string;
  quantity: string;
  unit: string;
  unitPrice: string;
  perUnit: string;
};

export type BatchFormState = {
  currency: string;
  producedUnits: string;
  materials: MaterialLineForm[];
};

export const emptyMaterialLine = (): MaterialLineForm => ({
  materialId: '',
  quantity: '',
  unit: '',
  unitPrice: '',
  perUnit: '',
});

export const initialBatchForm = (): BatchFormState => ({
  currency: 'USD',
  producedUnits: '1',
  materials: [emptyMaterialLine()],
});