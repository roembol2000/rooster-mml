import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePageTracking = (analytics) => {
  const location = useLocation();

  useEffect(() => {
    analytics.trackPageView(location);
  }, [location, analytics]);
};

export default usePageTracking;
