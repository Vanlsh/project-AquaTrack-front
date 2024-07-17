import { useSelector } from "react-redux";
import { selectWaterMonthlyRecord } from "../../redux/water/selectors.js";
import CalendarItem from "../CalendarItem/CalendarItem.jsx";

import css from "./Calendar.module.css";

const Calendar = ({ selectedIndex, setSelectedIndex }) => {
  const dateArray = useSelector(selectWaterMonthlyRecord);

  return (
    <div className={css.container}>
      <ul className={css.calendarList}>
        {dateArray.map((eachDate, index) => (
          <li key={index}>
            <CalendarItem
              index={index}
              calendarDate={eachDate.date}
              percent={eachDate.percentage}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
