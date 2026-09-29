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
      <dl>
        <dt>Total batch cost</dt>
        <dd data-testid="total-batch-cost">
          {formatMoney(result.totalBatchCost.amount)} {result.currency}
        </dd>

        <dt>Cost per produced unit</dt>
        <dd data-testid="cost-per-unit">
          {formatMoney(result.costPerProducedUnit.amount)} {result.currency}
        </dd>

        <dt>Produced units</dt>
        <dd>{result.producedUnits}</dd>

        <dt>Currency</dt>
        <dd>{result.currency}</dd>

        <dt>Calculation version</dt>
        <dd data-testid="calculation-version">{result.calculationVersion}</dd>
      </dl>

      <h3>Line costs</h3>
      <ul>
        {result.lineCosts.map((lc, i) => (
          <li key={i}>
            {lc.materialId}: {formatMoney(lc.lineCost.amount)}{' '}
            {lc.lineCost.currency}
          </li>
        ))}
      </ul>

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