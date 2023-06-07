import { createContext, useContext } from "react";

const AnalyticsContext = createContext();

const useAnalytics = () => {
  return useContext(AnalyticsContext);
};

export { useAnalytics };
export default AnalyticsContext;
