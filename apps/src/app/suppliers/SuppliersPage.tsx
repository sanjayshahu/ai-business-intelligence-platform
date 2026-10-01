import { PLACEHOLDER_SUPPLIERS } from './suppliers-data';
import styles from './suppliers-page.module.scss';

export function SuppliersPage() {
  const suppliers = PLACEHOLDER_SUPPLIERS;

  return (
    <section>
      <h2>Suppliers</h2>

      <p className={styles.notice}>
        Placeholder data — not connected to any backend. This page will be
        replaced by the real Suppliers feature in a later phase.
      </p>

      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Country</th>
            <th scope="col">Contact</th>
            <th scope="col" className={styles.numeric}>
              Lead time (days)
            </th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.country}</td>
              <td>{s.contactEmail}</td>
              <td className={styles.numeric}>{s.leadTimeDays}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className={styles.footer}>{suppliers.length} suppliers shown.</p>
    </section>
  );
}

export default SuppliersPage;