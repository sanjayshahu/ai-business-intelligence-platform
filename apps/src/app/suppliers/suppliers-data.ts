export type Supplier = {
  id: string;
  name: string;
  country: string;
  contactEmail: string;
  leadTimeDays: number;
};

/**
 * Static placeholder data.
 *
 * NOT the real Suppliers domain. This exists only so the page has something
 * to render. It will be deleted when Phase 4 introduces real persisted
 * suppliers.
 */
export const PLACEHOLDER_SUPPLIERS: Supplier[] = [
  {
    id: 'SUP-001',
    name: 'Northwind Steel',
    country: 'DE',
    contactEmail: 'sales@northwind-steel.example',
    leadTimeDays: 14,
  },
  {
    id: 'SUP-002',
    name: 'AluSource',
    country: 'NO',
    contactEmail: 'orders@alusource.example',
    leadTimeDays: 21,
  },
  {
    id: 'SUP-003',
    name: 'CuTrade',
    country: 'CL',
    contactEmail: 'sales@cutrade.example',
    leadTimeDays: 30,
  },
  {
    id: 'SUP-004',
    name: 'BondChem',
    country: 'US',
    contactEmail: 'info@bondchem.example',
    leadTimeDays: 7,
  },
  {
    id: 'SUP-005',
    name: 'PackRight',
    country: 'IN',
    contactEmail: 'hello@packright.example',
    leadTimeDays: 10,
  },
];