import dayjs from "dayjs";
import isoWeeksInYear from "dayjs/plugin/isoWeeksInYear";
import isLeapYear from "dayjs/plugin/isLeapYear";
import PropTypes from "prop-types";

import { ReactComponent as ArrowRight } from "../../assets/arrow_right.svg";

dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);

const addWeekNumber = (weekNumber, amount) => {
  // I don't care about leap years :)
  let newWeek = weekNumber;
  for (let i = 0; i < Math.abs(amount); i++) {
    const sign = Math.sign(amount);
    newWeek += Math.sign(sign);
    if (newWeek > 52) {
      newWeek = 1;
    }
    if (newWeek < 1) {
      newWeek = 52;
    }
  }

  return newWeek;
};

const WeekSelector = ({ weekNumber, setWeekNumber }) => {
  return (
    <div className="border-t border-b md:flex md:justify-center border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800">
      <div className="flex items-center h-16 px-4 place-content-between md:w-[32rem]">
        <div
          onClick={() => setWeekNumber(addWeekNumber(weekNumber, -1))}
          className="flex items-center justify-center w-12 h-12"
        >
          <ArrowRight fill="#737373" className="w-6 h-6 rotate-180" />
        </div>
        <div className="text-neutral-500">Week {weekNumber}</div>
        <div
          onClick={() => setWeekNumber(addWeekNumber(weekNumber, 1))}
          className="flex items-center justify-center w-12 h-12"
        >
          <ArrowRight fill="#737373" className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

WeekSelector.propTypes = {
  weekNumber: PropTypes.number,
  setWeekNumber: PropTypes.func,
};

export default WeekSelector;
