import {
  BatchFormState,
  MaterialLineForm,
  emptyMaterialLine,
} from './batch-form-state';
import styles from './batch-cost-page.module.scss';

type Props = {
  form: BatchFormState;
  onChange: (next: BatchFormState) => void;
  onSubmit: () => void;
};

export function BatchCostForm({ form, onChange, onSubmit }: Props) {
  const updateLine = (index: number, patch: Partial<MaterialLineForm>) => {
    const materials = form.materials.map((m, i) =>
      i === index ? { ...m, ...patch } : m,
    );
    onChange({ ...form, materials });
  };

  const addLine = () => {
    onChange({ ...form, materials: [...form.materials, emptyMaterialLine()] });
  };

  const removeLine = (index: number) => {
    onChange({
      ...form,
      materials: form.materials.filter((_, i) => i !== index),
    });
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className={styles.batchMeta}>
        <div className={styles.field}>
          <label htmlFor="currency">Currency</label>
          <input
            id="currency"
            type="text"
            value={form.currency}
            maxLength={3}
            onChange={(e) => onChange({ ...form, currency: e.target.value })}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="producedUnits">Produced units</label>
          <input
            id="producedUnits"
            type="number"
            value={form.producedUnits}
            onChange={(e) =>
              onChange({ ...form, producedUnits: e.target.value })
            }
          />
        </div>
      </div>

      <h2>Materials</h2>

      {form.materials.map((m, i) => (
        <fieldset key={i} className={styles.materialLine}>
          <legend>Material #{i + 1}</legend>

          <div className={styles.field}>
            <label htmlFor={`materialId-${i}`}>Material ID</label>
            <input
              id={`materialId-${i}`}
              type="text"
              value={m.materialId}
              onChange={(e) => updateLine(i, { materialId: e.target.value })}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor={`quantity-${i}`}>Quantity</label>
            <input
              id={`quantity-${i}`}
              type="text"
              value={m.quantity}
              onChange={(e) => updateLine(i, { quantity: e.target.value })}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor={`unit-${i}`}>Unit</label>
            <input
              id={`unit-${i}`}
              type="text"
              data-testid={`line-${i}-unit`}
              value={m.unit}
              onChange={(e) => updateLine(i, { unit: e.target.value })}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor={`unitPrice-${i}`}>Unit price</label>
            <input
              id={`unitPrice-${i}`}
              type="text"
              data-testid={`line-${i}-unit-price`}
              value={m.unitPrice}
              onChange={(e) => updateLine(i, { unitPrice: e.target.value })}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor={`perUnit-${i}`}>Per unit</label>
            <input
              id={`perUnit-${i}`}
              type="text"
              data-testid={`line-${i}-per-unit`}
              value={m.perUnit}
              onChange={(e) => updateLine(i, { perUnit: e.target.value })}
            />
          </div>

          <button
            type="button"
            className={styles.removeButton}
            onClick={() => removeLine(i)}
          >
            Remove
          </button>
        </fieldset>
      ))}

      <div className={styles.actions}>
        <button type="button" onClick={addLine}>
          Add material
        </button>
        <button type="submit">Calculate</button>
      </div>
    </form>
  );
}

export default BatchCostForm;