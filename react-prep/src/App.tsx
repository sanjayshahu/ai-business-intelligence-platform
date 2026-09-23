import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import RouteTracker from "./routes/RouteTracker";
import { NPro } from "./context/NotificationContext";

import {
  PerformanceProfiler,
  PerformanceDashboard
} from "./components/performance/PerformanceMonitor";

const App = () => {
  return (
    <NPro>
      <BrowserRouter>

        <RouteTracker />

        {/* Whole application */}
        <PerformanceProfiler id="WholeApp">
          <AppRoutes />
        </PerformanceProfiler>

        {/* Dashboard */}
        <PerformanceDashboard />

      </BrowserRouter>
    </NPro>
  );
};

export default App;