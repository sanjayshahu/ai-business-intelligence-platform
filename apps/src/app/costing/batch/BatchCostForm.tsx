import {
  BatchFormState,
  MaterialLineForm,
  emptyMaterialLine,
} from './batch-form-state';

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
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div>
        <label>
          Currency
          <input
            type="text"
            value={form.currency}
            maxLength={3}
            onChange={(e) => onChange({ ...form, currency: e.target.value })}
          />
        </label>
      </div>

      <div>
        <label>
          Produced units
          <input
            type="number"
            value={form.producedUnits}
            onChange={(e) =>
              onChange({ ...form, producedUnits: e.target.value })
            }
          />
        </label>
      </div>

      <h2>Materials</h2>
      {form.materials.map((m, i) => (
        <fieldset key={i}>
          <legend>Material #{i + 1}</legend>
          <label>
            Material ID
            <input
              type="text"
              value={m.materialId}
              onChange={(e) => updateLine(i, { materialId: e.target.value })}
            />
          </label>
          <label>
            Quantity
            <input
              type="text"
              value={m.quantity}
              onChange={(e) => updateLine(i, { quantity: e.target.value })}
            />
          </label>
          <label>
            Unit
            <input
              type="text"
              value={m.unit}
              onChange={(e) => updateLine(i, { unit: e.target.value })}
            />
          </label>
          <label>
            Unit price
            <input
              type="text"
              value={m.unitPrice}
              onChange={(e) => updateLine(i, { unitPrice: e.target.value })}
            />
          </label>
          <label>
            Per unit
            <input
              type="text"
              value={m.perUnit}
              onChange={(e) => updateLine(i, { perUnit: e.target.value })}
            />
          </label>
          <button type="button" onClick={() => removeLine(i)}>
            Remove
          </button>
        </fieldset>
      ))}

      <div>
        <button type="button" onClick={addLine}>
          Add material
        </button>
        <button type="submit">Calculate</button>
      </div>
    </form>
  );
}

export default BatchCostForm;