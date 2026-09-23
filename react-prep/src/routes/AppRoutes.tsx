import { Routes, Route } from "react-router-dom";

import Mcoding from "../pages/mcoding/Mcoding";
import Finance from "../pages/finance/Finance";

import { PerformanceProfiler } from "../components/performance/PerformanceMonitor";

const AppRoutes = () => {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <PerformanceProfiler id="Mcoding">
            <Mcoding />
          </PerformanceProfiler>
        }
      />

      <Route
        path="/finance"
        element={
          <PerformanceProfiler id="Finance">
            <Finance />
          </PerformanceProfiler>
        }
      />

    </Routes>
  );
};

export default AppRoutes;