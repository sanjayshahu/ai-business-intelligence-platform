import NxWelcome from './nx-welcome';
import { Route, Routes, Link } from 'react-router-dom';
import { BatchCostPage } from './costing/batch/BatchCostPage';

export function App() {
  return (
    <div>
      <NxWelcome title="@org/apps" />

      <br />
      <hr />
      <br />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
          <li>
            <Link to="/costing/batch">Batch Cost</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
        <Route path="/costing/batch" element={<BatchCostPage />} />
      </Routes>
    </div>
  );
}

export default App;