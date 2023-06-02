import { useState } from "react";
import Main from "./views/Main";
import Login from "./views/Login";

const App = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    isValid: false,
  });

  const [entries, setEntries] = useState([]);

  return (
    <div>
      {credentials.isValid ? (
        <Main
          credentials={credentials}
          setCredentials={setCredentials}
          entries={entries}
        />
      ) : (
        <Login setCredentials={setCredentials} setEntries={setEntries} />
      )}
    </div>
  );
};

export default App;
