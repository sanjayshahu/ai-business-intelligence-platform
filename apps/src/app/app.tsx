import { Route, Routes, Link, NavLink } from 'react-router-dom';
import { BatchCostPage } from './costing/batch/BatchCostPage';
import { MaterialsPage } from './materials/MaterialsPage';
import { SuppliersPage } from './suppliers/SuppliersPage';
import styles from './app.module.scss';

export function App() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <h1 className={styles.title}>Cost-to-Profit Intelligence</h1>
          <p className={styles.tagline}>
            Know your true cost. Protect your margin. Improve every decision.
          </p>
        </div>

        <nav className={styles.nav} aria-label="Primary">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/materials"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
          >
            Materials
          </NavLink>
          <NavLink
            to="/suppliers"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
          >
            Suppliers
          </NavLink>
          <NavLink
            to="/costing/batch"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
          >
            Batch Cost
          </NavLink>
          <NavLink
            to="/page-2"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
          >
            Page 2
          </NavLink>
        </nav>
      </header>

      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/suppliers" element={<SuppliersPage />} />
          <Route path="/costing/batch" element={<BatchCostPage />} />
          <Route
            path="/page-2"
            element={
              <div>
                <Link to="/">Click here to go back to root page.</Link>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function HomePage() {
  return (
    <section>
      <h2>Overview</h2>
      <p>
        This portal will let you cost a product, price it, and understand its
        profitability. The first working capability is batch material costing.
      </p>
      <p>
        <Link to="/costing/batch">Go to Batch Cost →</Link>
      </p>
    </section>
  );
}

export default App;