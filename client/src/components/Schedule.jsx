import { useEffect, useState } from "react";
import root from "react-shadow";
import PropTypes from "prop-types";
import { getSchedule } from "../utils/api";
import style from "../utils/style.js";

const Schedule = ({ credentials, schedule, weekNumber }) => {
  const [scheduleHtml, setScheduleHtml] = useState("");

  useEffect(() => {
    getSchedule(credentials, schedule, weekNumber)
      .then((schedule) => {
        setScheduleHtml(schedule.schedule);
      })
      .catch((err) => {
        console.log(err);
        if (err.name == "AuthenticationError") {
          setScheduleHtml("<div>authentication error</div>");
        }
        if (err.name == "NotFoundError") {
          setScheduleHtml("<div>Helaas bestaat dit rooster niet.</div>");
        }
      });
  }, [schedule, credentials, weekNumber]);

  return (
    <root.div className="flex justify-center w-full mt-2 overflow-auto ">
      <div dangerouslySetInnerHTML={{ __html: scheduleHtml }} />
      <style>{style}</style>
    </root.div>
  );
};

Schedule.propTypes = {
  credentials: PropTypes.object,
  schedule: PropTypes.object,
  weekNumber: PropTypes.number,
};

export default Schedule;
