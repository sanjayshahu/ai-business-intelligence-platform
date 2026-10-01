import { BatchCostResult, Decimal } from '@org/costing-unit-cost';
import styles from './batch-cost-page.module.scss';

type Props = {
  result: BatchCostResult;
  formatMoney: (amount: Decimal) => string;
};

export function BatchCostResultPanel({ result, formatMoney }: Props) {
  return (
    <section className={styles.result} aria-label="Batch cost result">
      <h2>Result</h2>

      <p className={styles.currency}>
        Currency: <strong>{result.currency}</strong>
      </p>

      <table className={styles.resultTable}>
        <thead>
          <tr>
            <th scope="col">Material</th>
            <th scope="col" className={styles.money}>
              Line cost
            </th>
          </tr>
        </thead>
        <tbody>
          {result.lineCosts.map((lc, i) => (
            <tr key={i}>
              <th scope="row">{lc.materialId}</th>
              <td
                className={styles.money}
                data-testid={`line-cost-${lc.materialId}`}
              >
                {formatMoney(lc.lineCost.amount)}
              </td>
            </tr>
          ))}
          <tr className={styles.subtotalRow}>
            <th scope="row">Subtotal (total batch cost)</th>
            <td className={styles.money}>
              <span data-testid="total-batch-cost">
                {formatMoney(result.totalBatchCost.amount)}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <div className={styles.summaryBlock}>
        <h3>Per produced unit</h3>
        <p className={styles.summaryValue}>
          <span data-testid="cost-per-unit">
            {formatMoney(result.costPerProducedUnit.amount)}
          </span>{' '}
          {result.currency}
          <span className={styles.summaryNote}>
            {' '}
            (produced units: {result.producedUnits})
          </span>
        </p>
      </div>

      <p className={styles.version}>
        Calculation version:{' '}
        <span data-testid="calculation-version">
          {result.calculationVersion}
        </span>
      </p>

      <h3>Assumptions</h3>
      <ul>
        {result.assumptions.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
    </section>
  );
}

export default BatchCostResultPanel;