import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Main from "./views/Main";
import Login from "./views/Login";

const App = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    authenticated: false,
  });

  const [entries, setEntries] = useState([]);

  return (
    <div className="min-h-screen dark:bg-neutral-800">
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
    </div>
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
