import { useState } from "react";
import { useParams } from "react-router-dom";

import { Title } from "../Title/Title.jsx";
import { parseDateTime } from "../../helpers/parseDate.js";
import svg from "../../assets/icons.svg";
import { monthsName } from "../../constants";
import css from "./CalendarPagination.module.css";
import { fetchMonthlyWater } from "../../redux/water/operations.js";
import { useDispatch, useSelector } from "react-redux";
import { selectMonthlyIsLoading } from "../../redux/water/selectors.js";

const CalendarPagination = ({ setSelectedIndex }) => {
  const { dateUrl } = useParams();
  const dateMs = parseDateTime(dateUrl);
  const dispatch = useDispatch();
  const [year, setYear] = useState(new Date(dateMs).getFullYear());
  const [month, setMonth] = useState(new Date(dateMs).getMonth());
  const isLoading = useSelector(selectMonthlyIsLoading);
  // Thunk for data for selected month

  const increment = () => {
    setSelectedIndex(null);
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
      return;
    }
    setMonth(month + 1);
    dispatch(fetchMonthlyWater(new Date(year, month).getTime()));
  };

  const decrement = () => {
    setSelectedIndex(null);
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
      return;
    }
    setMonth(month - 1);
    dispatch(fetchMonthlyWater(new Date(year, month).getTime()));
  };

  const selectedMonth = monthsName[month];

  return (
    <div className={css.calendar_title}>
      <Title title={"Month"} styles={css.month} />
      <div className={css.month_ind}>
        <button onClick={decrement} className={css.btn} disabled={isLoading}>
          <svg className={css.svg_arrow_left}>
            <use xlinkHref={svg + "#icon-arrow"}></use>
          </svg>
        </button>
        <span className={css.month_year}>
          {`${selectedMonth},
					${year}`}
        </span>
        <button onClick={increment} className={css.btn} disabled={isLoading}>
          <svg className={css.svg_arrow_right}>
            <use xlinkHref={svg + "#icon-arrow"}></use>
          </svg>
        </button>
        <div className={css.statistic_btn}>
          <svg className={css.svg_pie}>
            <use xlinkHref={svg + "#icon-pie-chart"}></use>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CalendarPagination;
