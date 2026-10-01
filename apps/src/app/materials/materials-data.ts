export type Material = {
  id: string;
  name: string;
  unit: string;
  lastPrice: { amount: string; currency: string };
  supplier: string;
};

/**
 * Static placeholder data.
 *
 * NOT the real Materials domain. This exists only so the page has something
 * to render. It will be deleted when Phase 3 introduces real persisted
 * materials.
 */
export const PLACEHOLDER_MATERIALS: Material[] = [
  {
    id: 'MAT-001',
    name: 'Steel sheet, 1mm',
    unit: 'kg',
    lastPrice: { amount: '2.4500', currency: 'USD' },
    supplier: 'Northwind Steel',
  },
  {
    id: 'MAT-002',
    name: 'Aluminium ingot',
    unit: 'kg',
    lastPrice: { amount: '3.1200', currency: 'USD' },
    supplier: 'AluSource',
  },
  {
    id: 'MAT-003',
    name: 'Copper wire, 2mm',
    unit: 'm',
    lastPrice: { amount: '0.8700', currency: 'USD' },
    supplier: 'CuTrade',
  },
  {
    id: 'MAT-004',
    name: 'Industrial adhesive',
    unit: 'L',
    lastPrice: { amount: '12.5000', currency: 'USD' },
    supplier: 'BondChem',
  },
  {
    id: 'MAT-005',
    name: 'Cardboard packaging, medium',
    unit: 'unit',
    lastPrice: { amount: '0.3300', currency: 'USD' },
    supplier: 'PackRight',
  },
];