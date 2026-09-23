import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "../utils/analytics";

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackEvent("page_view", {
      page_path: location.pathname,
    });

    // finance-style mapping (optional but powerful)
    if (location.pathname === "/") {
      trackEvent("dashboard_view");
    }

    if (location.pathname.includes("account")) {
      trackEvent("account_view");
    }

    if (location.pathname.includes("transaction")) {
      trackEvent("transaction_view");
    }
  }, [location]);

  return null;
};

export default RouteTracker;