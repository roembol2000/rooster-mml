import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { getEntries } from "../utils/api";
import { useAnalytics } from "../contexts/analyticsContext";

import Faq from "../components/Faq";
import Form from "../components/Login/Form";
import Footer from "../components/Footer";

const Login = ({ setCredentials, setEntries }) => {
  const navigate = useNavigate();
  const analytics = useAnalytics();

  const [status, setStatus] = useState({ ok: true, message: "" });

  const handleLogin = async (event) => {
    event.preventDefault();

    const credentials = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    if (!credentials.username || !credentials.password)
      return setStatus({
        ok: false,
        message: "Vul een gebruikersnaam of wachtwoord in.",
      });

    try {
      const entries = await getEntries(credentials);
      setEntries(entries.entries);
      setCredentials({ ...credentials, authenticated: true });
      analytics.trackEvent(location, { name: "User logged in" });
      navigate("/schedule");
    } catch (err) {
      if (err.name == "AuthenticationError") {
        setStatus({
          ok: false,
          message: "Gebruikersnaam of wachtwoord is incorrect.",
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full text-center text-white bg-mml-red-300">
        Deze website is niet officieel.
      </div>
      <div className="flex flex-col pt-8 pb-4 mx-4 lg:mx-8 lg:flex-row lg:max-w-7xl">
        <div className="flex-1">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold">Rooster</h1>
            <p>Log in met je NETWERK-inloggegevens</p>
          </div>
          <div className="mb-8">
            <Form handleLogin={handleLogin} status={status} />
          </div>
        </div>
        <div className="flex-1">
          <Faq />
        </div>
      </div>
      <Footer />
    </div>
  );
};

Login.propTypes = {
  setCredentials: PropTypes.func,
  setEntries: PropTypes.func,
};

export default Login;
