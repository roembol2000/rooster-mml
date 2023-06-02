import PropTypes from "prop-types";

const SuggestionsEntry = ({ name, clickHandler }) => {
  return (
    <div
      onClick={clickHandler}
      className="flex items-center h-16 px-6 bg-white border-b cursor-pointer md:justify-center border-neutral-300 hover:bg-neutral-100"
    >
      <div className="md:w-[32rem] md:p-6">{name}</div>
    </div>
  );
};

SuggestionsEntry.propTypes = {
  name: PropTypes.string,
  clickHandler: PropTypes.func,
};

export default SuggestionsEntry;
