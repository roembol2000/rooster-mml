import PropTypes from "prop-types";

import FormEntry from "./FormEntry";

const Form = ({ handleLogin, status }) => {
  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <FormEntry
        type="text"
        name="username"
        text="Gebruikersnaam"
        status={status}
      />
      <FormEntry
        type="password"
        name="password"
        text="Wachtwoord"
        status={status}
      />
      <button
        type="submit"
        className="h-12 px-4 text-white rounded-md bg-mml-blue-200"
      >
        Inloggen
      </button>
      <div className="text-red-500">{status.message}</div>
    </form>
  );
};

Form.propTypes = {
  handleLogin: PropTypes.func,
  status: PropTypes.object,
};

export default Form;
