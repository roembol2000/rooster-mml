import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Main from "./views/Main";
import Login from "./views/Login";
import Analytics from "./utils/analytics";
import usePageTracking from "./utils/usePageTracking";
import AnalyticsContext from "./contexts/analyticsContext";

const App = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    authenticated: false,
  });

  const [entries, setEntries] = useState([]);

  const analytics = new Analytics(import.meta.env.VITE_ANALYTICS_PROVIDER, {
    endpoint: import.meta.env.VITE_ANALYTICS_ENDPOINT,
    website: import.meta.env.VITE_ANALYTICS_WEBSITE_ID,
  });

  usePageTracking(analytics);

  return (
    <AnalyticsContext.Provider value={analytics}>
      <Routes>
        <Route path="/" element={<Navigate to="login" />} />
        <Route
          path="/login"
          element={
            <Login setCredentials={setCredentials} setEntries={setEntries} />
          }
        />
        <Route
          path="/schedule"
          element={
            credentials.authenticated ? (
              <Main
                credentials={credentials}
                setCredentials={setCredentials}
                entries={entries}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </AnalyticsContext.Provider>
  );
};

const RouterWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default RouterWrapper;
