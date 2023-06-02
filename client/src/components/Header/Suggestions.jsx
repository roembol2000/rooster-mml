import PropTypes from "prop-types";

import SuggestionsEntry from "./SuggestionsEntry";

const Suggestions = ({
  suggestions,
  setSuggestions,
  setSchedule,
  setSearchInput,
}) => {
  const clickHandler = (suggestion) => {
    setSchedule(suggestion);
    setSearchInput(suggestion.name);
    setSuggestions([]);
  };

  return (
    <div className="border-t border-neutral-300">
      {suggestions.map(
        ({ item: suggestion }) => (
          <SuggestionsEntry
            key={suggestion.name}
            name={suggestion.name}
            clickHandler={() => clickHandler(suggestion)}
          />
        )
      )}
    </div>
  );
};

Suggestions.propTypes = {
  suggestions: PropTypes.array,
  setSuggestions: PropTypes.func,
  setSchedule: PropTypes.func,
  setSearchInput: PropTypes.func,
};

export default Suggestions;
