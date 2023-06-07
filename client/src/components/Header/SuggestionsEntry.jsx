import PropTypes from "prop-types";

const SuggestionsEntry = ({ name, clickHandler }) => {
  return (
    <div
      onClick={clickHandler}
      className="flex items-center h-16 px-6 bg-white border-b cursor-pointer dark:bg-neutral-800 md:justify-center border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700"
    >
      <div className="md:w-[32rem] md:p-6 dark:text-white">{name}</div>
    </div>
  );
};

SuggestionsEntry.propTypes = {
  name: PropTypes.string,
  clickHandler: PropTypes.func,
};

export default SuggestionsEntry;
