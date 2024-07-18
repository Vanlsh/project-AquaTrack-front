import { useNavigate } from "react-router-dom";
import css from "./CalendarItem.module.css";
import { useDispatch } from "react-redux";
import { fetchDailyWater } from "../../redux/water/operations";
import { useParams } from "react-router-dom";
import { parseDateTime } from "../../helpers/parseDate.js";
import clsx from "clsx";

const isDaySame = (firstDay, secondDay) => {
  const first = new Date(Number(firstDay));
  const second = new Date(Number(secondDay));
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
};

const CalendarItem = ({ calendarDate, percent }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { date: paramsDate } = useParams();
  const currentDate = parseDateTime(paramsDate);

  const handleClick = (calendarDate) => {
    navigate(`/tracker/${calendarDate}`);
    dispatch(fetchDailyWater(calendarDate));
  };

  const date = new Date(Number(calendarDate)).getDate();
  const dateNow = Date.now();
  const isDisabled = Number(calendarDate) > dateNow;
  const isDane = Math.round(percent) < 100;
  const isActive = isDaySame(currentDate, calendarDate);
  return (
    <button
      className={clsx(css.day, {
        [css.disabled]: isDisabled,
      })}
      disabled={isDisabled}
      onClick={() => handleClick(calendarDate)}
    >
      <div
        className={clsx(css.date, {
          [css.perc_filled]: isDane,
          [css.active]: isActive,
        })}
      >
        {date}
      </div>
      <div className={css.perc}>{`${Math.round(percent)}%`}</div>
    </button>
  );
};

export default CalendarItem;
