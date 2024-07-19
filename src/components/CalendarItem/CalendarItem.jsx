import { useNavigate } from "react-router-dom";
import css from "./CalendarItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDailyWater } from "../../redux/water/operations";
import { useParams } from "react-router-dom";
import { parseDateTime } from "../../helpers/parseDate.js";
import clsx from "clsx";
import { selectWaterRate } from "../../redux/auth/selectors.js";

const isFuture = (date) => {
  const dateNow = new Date();
  const currentDate = new Date(Number(date));
  const isBigger =
    dateNow.getFullYear() < currentDate.getFullYear() ||
    dateNow.getMonth() < currentDate.getMonth() ||
    dateNow.getDate() < currentDate.getDate();
  return isBigger;
};

const isDaySame = (firstDay, secondDay) => {
  const first = new Date(Number(firstDay));
  const second = new Date(Number(secondDay));
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
};

const CalendarItem = ({ calendarDate, amount }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goal = useSelector(selectWaterRate);
  const { date: paramsDate } = useParams();
  const currentDate = parseDateTime(paramsDate);

  const handleClick = (calendarDate) => {
    navigate(`/tracker/${calendarDate}`);
    dispatch(fetchDailyWater(calendarDate));
  };

  const date = new Date(Number(calendarDate)).getDate();

  const percent = Math.round((amount / (goal * 1000)) * 100);
  const isDisabled = isFuture(calendarDate);
  const isDane = Math.round(percent) < 100;
  const isActive = isDaySame(currentDate, calendarDate);
  const percentString =
    Math.round(percent) >= 100 ? "100%" : `${Math.round(percent)}%`;

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
      <div className={css.perc}>{percentString}</div>
    </button>
  );
};

export default CalendarItem;
