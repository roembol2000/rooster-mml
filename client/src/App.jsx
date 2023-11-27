import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Main from "./views/Main";
import Login from "./views/Login";
import NetwerkLogin from "./views/NetwerkLogin";

const App = () => {
  const [netwerkCredentials, setNetwerkCredentials] = useState({
    username: "",
    password: "",
    authenticated: false,
  });

  const [entries, setEntries] = useState([]);

  return (
    <div className="min-h-screen dark:bg-neutral-800">
      <Routes>
        <Route path="/" element={<Navigate to="netwerklogin" />} />
        <Route
          path="/netwerklogin"
          element={
            <NetwerkLogin
              setNetwerkCredentials={setNetwerkCredentials}
              setEntries={setEntries}
            />
          }
        />
        <Route
          path="/schedule"
          element={
            netwerkCredentials.authenticated ? (
              <Main
                netwerkCredentials={netwerkCredentials}
                setNetwerkCredentials={setNetwerkCredentials}
                entries={entries}
              />
            ) : (
              <Navigate to="/netwerklogin" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
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
