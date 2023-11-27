import { useEffect, useState } from "react";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import Header from "../components/Header";
import Suggestions from "../components/Header/Suggestions";
import Schedule from "../components/Schedule";
import WeekSelector from "../components/Header/WeekSelector";

dayjs.extend(weekOfYear);
const currentWeekNumber = dayjs().week();

const Main = ({ netwerkCredentials, setNetwerkCredentials, entries }) => {
  const location = useLocation();

  const [suggestions, setSuggestions] = useState([]);
  const [weekNumber, setWeekNumber] = useState(currentWeekNumber);
  const [schedule, setSchedule] = useState({});
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (!Object.keys(schedule).length) return;
  }, [schedule, location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        entries={entries}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        setSchedule={setSchedule}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setNetwerkCredentials={setNetwerkCredentials}
      />

      <div>
        {suggestions.length ? (
          <div className="absolute z-10 w-full">
            <Suggestions
              suggestions={suggestions}
              setSuggestions={setSuggestions}
              setSchedule={setSchedule}
              setSearchInput={setSearchInput}
            />
          </div>
        ) : null}

        {Object.keys(schedule).length ? (
          <div>
            <WeekSelector
              weekNumber={weekNumber}
              setWeekNumber={setWeekNumber}
            />
            <Schedule
              netwerkCredentials={netwerkCredentials}
              schedule={schedule}
              weekNumber={weekNumber}
            />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="max-w-sm p-4 mx-4 mt-8 space-y-2 text-center border-2 rounded-md border-neutral-300 dark:border-neutral-700 dark:text-white">
              <h1 className="text-2xl font-semibold">Rooster</h1>
              <p>
                Vul je leerlingnummer, klas, afkorting of lokaal in aan de
                bovenkant van de pagina!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Main.propTypes = {
  netwerkCredentials: PropTypes.object,
  setNetwerkCredentials: PropTypes.func,
  entries: PropTypes.array,
};

export default Main;
