import Fuse from "fuse.js";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Account } from "../assets/account.svg";
// import { ReactComponent as StarUnfilled } from "../assets/star_fill0.svg";

const Header = ({
  entries,
  suggestions,
  setSuggestions,
  setSchedule,
  searchInput,
  setSearchInput,
  setNetwerkCredentials,
}) => {
  const navigate = useNavigate();

  const fuse = new Fuse(entries, {
    keys: ["name"],
  });

  // const handleFavoriteToggle = () => {
  //   console.log("clicked");
  // };

  const handleAccountButton = () => {
    setNetwerkCredentials({ username: "", password: "", authenticated: false });
    navigate("/netwerklogin");
  };

  const handleOnChange = (event) => {
    const suggestions = fuse.search(event.target.value).slice(0, 5);
    setSuggestions(suggestions);
    setSearchInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.elements[0].blur();

    const suggestion = suggestions[0];

    setSchedule(suggestion.item);
    setSearchInput(suggestion.item.name);
    setSuggestions([]);
  };

  return (
    <div className="md:flex md:justify-center dark:bg-neutral-800">
      <div className="flex items-center h-16 md:w-[32rem]">
        <div className="flex flex-1 h-12 ml-4 border-2 rounded-md outline-none touch-none border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 focus-within:border-mml-blue-100">
          <form onSubmit={handleSubmit} className="flex-1">
            <input
              type="text"
              placeholder="Zoeken"
              size="1"
              value={searchInput}
              onChange={handleOnChange}
              className="w-full h-full pl-2 rounded-md outline-none dark:text-white dark:bg-neutral-800"
            />
          </form>
          {/* <div
          onClick={handleFavoriteToggle}
          className="flex items-center h-full"
          >
          <StarUnfilled fill="#737373" className="w-6 h-6 mx-2" />
        </div> */}
        </div>
        <div
          onClick={handleAccountButton}
          className="flex items-center h-12 px-4 cursor-pointer"
        >
          <Account fill="#737373" className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  entries: PropTypes.array,
  suggestions: PropTypes.array,
  setSuggestions: PropTypes.func,
  setSchedule: PropTypes.func,
  searchInput: PropTypes.string,
  setSearchInput: PropTypes.func,
  setNetwerkCredentials: PropTypes.func,
};

export default Header;
