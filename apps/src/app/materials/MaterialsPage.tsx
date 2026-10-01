import { PLACEHOLDER_MATERIALS } from './materials-data';
import styles from './materials-page.module.scss';

export function MaterialsPage() {
  const materials = PLACEHOLDER_MATERIALS;

  return (
    <section>
      <h2>Materials</h2>

      <p className={styles.notice}>
        Placeholder data — not connected to any backend. This page will be
        replaced by the real Materials feature in a later phase.
      </p>

      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Unit</th>
            <th scope="col" className={styles.money}>
              Last price
            </th>
            <th scope="col">Supplier</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.name}</td>
              <td>{m.unit}</td>
              <td className={styles.money}>
                {m.lastPrice.amount} {m.lastPrice.currency}
              </td>
              <td>{m.supplier}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className={styles.footer}>{materials.length} materials shown.</p>
    </section>
  );
}

export default MaterialsPage;