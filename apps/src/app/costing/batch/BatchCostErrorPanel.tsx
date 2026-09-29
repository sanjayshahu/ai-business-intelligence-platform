import styles from './batch-cost-page.module.scss';

type Props = {
  code: string;
  message: string;
};

export function BatchCostErrorPanel({ code, message }: Props) {
  return (
    <section
      className={styles.error}
      role="alert"
      aria-label="Batch cost error"
    >
      <h2>Could not calculate</h2>
      <p data-testid="error-code">{code}</p>
      <p>{message}</p>
    </section>
  );
}

export default BatchCostErrorPanel;