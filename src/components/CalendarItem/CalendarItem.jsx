import { useNavigate } from "react-router-dom";

import css from "./CalendarItem.module.css";

const CalendarItem = ({
  index,
  calendarDate,
  percent,
  selectedIndex,
  setSelectedIndex,
}) => {
  const navigate = useNavigate();

  // Thunk for data for selected month;

  const handleClick = (index, calendarDate) => {
    setSelectedIndex(index);
    navigate(`/tracker/${calendarDate}`);
    // тут не потрібна санка
  };

  const date = new Date(Number(calendarDate)).getDate();
  const dateNow = Date.now();
  const isDisabled = Number(calendarDate) > dateNow;

  return (
    <button
      className={`${css.day} ${isDisabled ? css.disabled : ""}`}
      disabled={isDisabled}
    >
      <div
        onClick={() => handleClick(index, calendarDate)}
        className={`${css.date} 							
					${percent > 0 ? css.perc_filled : ""} ${selectedIndex === index ? css.active : ""}`}
      >
        {date}
      </div>
      <div className={css.perc}>{`${percent}%`}</div>
    </button>
  );
};

export default CalendarItem;
