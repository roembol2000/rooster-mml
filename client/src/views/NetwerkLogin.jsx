import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getEntries } from "../utils/api";

import Faq from "../components/Faq";
import Form from "../components/Login/Form";
import Footer from "../components/Footer";

const NetwerkLogin = ({ setNetwerkCredentials, setEntries }) => {
  const navigate = useNavigate();

  const [cookies, , removeCookie] = useCookies();

  const [status, setStatus] = useState({ ok: true, message: "" });

  useEffect(() => {
    if (!cookies.token) {
      navigate("/login");
    }
  }, [cookies]);

  const handleLogin = async (event) => {
    event.preventDefault();

    const netwerkCredentials = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    if (!netwerkCredentials.username || !netwerkCredentials.password)
      return setStatus({
        ok: false,
        message: "Vul een gebruikersnaam of wachtwoord in.",
      });

    try {
      const entries = await getEntries(netwerkCredentials);
      setEntries(entries.entries);
      setNetwerkCredentials({ ...netwerkCredentials, authenticated: true });
      navigate("/schedule");
    } catch (err) {
      if (err.name == "AuthenticationError") {
        setStatus({
          ok: false,
          message: "Gebruikersnaam of wachtwoord is incorrect.",
        });
      }
      if (err.name == "ForbiddenError") {
        removeCookie("token");
        navigate("/login");
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
          <div className="mb-4 dark:text-white">
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

NetwerkLogin.propTypes = {
  setNetwerkCredentials: PropTypes.func,
  setEntries: PropTypes.func,
};

export default NetwerkLogin;
