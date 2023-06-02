import PropTypes from "prop-types";

const FormEntry = ({ type, name, text, status }) => {
  return (
    <div className="flex flex-col">
      <div className="text-neutral-500">{text}</div>
      <input
        type={type}
        name={name}
        className={`h-12 px-2 border-2 rounded-md max-w-md touch-none outline-none ${
          status.ok ? "border-neutral-300" : "border-red-300"
        } focus:border-mml-blue-100`}
      />
    </div>
  );
};

FormEntry.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string,
  status: PropTypes.object,
};

export default FormEntry;
