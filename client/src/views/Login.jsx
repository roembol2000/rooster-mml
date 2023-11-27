import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import Faq from "../components/Faq";
import Form from "../components/Login/Form";
import { login } from "../utils/api";

const Login = () => {
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["token"]);

  const [status, setStatus] = useState({ ok: true, message: "" });

  useEffect(() => {
    if (cookies.token) {
      navigate("/schedule");
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    const credentials = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    if (!credentials.username || !credentials.password)
      return setStatus({
        ok: false,
        message: "Vul een gebruikersnaam of wachwoord in.",
      });

    try {
      const response = await login(credentials);
      console.log(response.token);
      // 7d
      setCookie("token", response.token, { maxAge: 604800 });
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
  );
};

export default Login;
