import { useState } from 'react';
import {
  calculateBatchCost,
  toQuantity,
  toUnitPrice,
  CostingError,
  BatchCostResult,
  decimalToString,
} from '@org/costing-unit-cost';
import { BatchCostForm } from './BatchCostForm';
import { BatchCostResultPanel } from './BatchCostResultPanel';
import { BatchCostErrorPanel } from './BatchCostErrorPanel';
import { BatchFormState, initialBatchForm } from './batch-form-state';
import styles from './batch-cost-page.module.scss';

type ErrorState = { code: string; message: string } | null;

export function BatchCostPage() {
  const [form, setForm] = useState<BatchFormState>(initialBatchForm);
  const [result, setResult] = useState<BatchCostResult | null>(null);
  const [error, setError] = useState<ErrorState>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);
    try {
      const batch = {
        currency: form.currency,
        producedUnits: Number(form.producedUnits),
        materials: form.materials.map((m) => ({
          materialId: m.materialId,
          quantity: toQuantity(m.quantity, m.unit),
          unitPrice: toUnitPrice(m.unitPrice, form.currency, m.perUnit),
        })),
      };
      setResult(calculateBatchCost(batch));
    } catch (e) {
      if (e instanceof CostingError) {
        setError({ code: e.code, message: e.message });
      } else {
        setError({ code: 'UNEXPECTED', message: String(e) });
      }
    }
  };

  return (
    <section className={styles.page}>
      <h1>Batch Cost</h1>
      <p>
        Enter one production batch. Cost is computed by the deterministic engine
        in <code>@org/costing-unit-cost</code>.
      </p>

      <BatchCostForm form={form} onChange={setForm} onSubmit={handleCalculate} />

      {error && (
        <BatchCostErrorPanel code={error.code} message={error.message} />
      )}

      {result && (
        <BatchCostResultPanel result={result} formatMoney={decimalToString} />
      )}
    </section>
  );
}

export default BatchCostPage;