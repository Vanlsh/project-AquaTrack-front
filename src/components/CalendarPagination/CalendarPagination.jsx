import { useState } from "react";
import { useParams } from "react-router-dom";

import { Title } from "../Title/Title.jsx";
import { parseDateTime } from "../../helpers/parseDate.js";
import svg from "../../assets/icons.svg";
import { monthsName } from "../../constants";
import css from "./CalendarPagination.module.css";

const CalendarPagination = ({ setSelectedIndex }) => {
  const { dateUrl } = useParams();
  const dateMs = parseDateTime(dateUrl);

  const [year, setYear] = useState(new Date(dateMs).getFullYear());
  const [month, setMonth] = useState(new Date(dateMs).getMonth());

  // Thunk for data for selected month

  const increment = () => {
    setSelectedIndex(null);
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
      return;
    }
    setMonth(month + 1);
    // Thunk
  };

  const decrement = () => {
    setSelectedIndex(null);
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
      return;
    }
    setMonth(month - 1);
    // Thunk
  };

  const selectedMonth = monthsName[month];

  return (
    <div className={css.calendar_title}>
      <Title title={"Month"} styles={css.month} />
      <div className={css.month_ind}>
        <button onClick={decrement} className={css.btn}>
          <svg className={css.svg_arrow_left}>
            <use xlinkHref={svg + "#icon-arrow"}></use>
          </svg>
        </button>
        <span className={css.month_year}>
          {`${selectedMonth},
					${year}`}
        </span>
        <button onClick={increment} className={css.btn}>
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
