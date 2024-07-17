import { useNavigate } from "react-router-dom";
import css from "./CalendarItem.module.css";
import { useDispatch } from "react-redux";
import { fetchDailyWater } from "../../redux/water/operations";

const CalendarItem = ({
  index,
  calendarDate,
  percent,
  selectedIndex,
  setSelectedIndex,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Thunk for data for selected month;

  const handleClick = (index, calendarDate) => {
    setSelectedIndex(index);
    navigate(`/tracker/${calendarDate}`);
    dispatch(fetchDailyWater(calendarDate));
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
