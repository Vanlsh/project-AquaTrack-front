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
import { useTranslation } from "react-i18next";

const CalendarPagination = () => {
  const { date: dateUrl } = useParams();
  const dateMs = parseDateTime(dateUrl);
  const dispatch = useDispatch();
  const [year, setYear] = useState(new Date(dateMs).getFullYear());
  const [month, setMonth] = useState(new Date(dateMs).getMonth());
  const isLoading = useSelector(selectMonthlyIsLoading);
  const { t } = useTranslation();

  const increment = () => {
    if (month === 11) {
      dispatch(fetchMonthlyWater(new Date(year + 1, 4).getTime()));
      setMonth(0);
      setYear(year + 1);

      return;
    }
    dispatch(fetchMonthlyWater(new Date(year, month + 1, 4).getTime()));
    setMonth(month + 1);
  };

  const decrement = () => {
    if (month === 0) {
      dispatch(fetchMonthlyWater(new Date(year - 1, 11, 4).getTime()));
      setMonth(11);
      setYear(year - 1);
      return;
    }
    dispatch(fetchMonthlyWater(new Date(year, month - 1, 4).getTime()));
    setMonth(month - 1);
  };

  const selectedMonth = t(monthsName[month]);

  const yearNow = new Date(Date.now()).getFullYear();
  const monthNow = new Date(Date.now()).getMonth();
  const incrementDisabled =
    new Date(yearNow, monthNow) <= new Date(year, month);

  return (
    <div className={css.calendar_title}>
      <Title title={t("month")} styles={css.month} />
      <div className={css.month_ind}>
        <button
          onClick={decrement}
          className={css.btn}
          aria-label={t("viewPreviousMonthEntries")}
          disabled={isLoading}
        >
          <svg className={css.svg_arrow_left}>
            <use xlinkHref={svg + "#icon-arrow"}></use>
          </svg>
        </button>
        <span className={css.month_year}>
          {`${selectedMonth},
					${year}`}
        </span>
        <button
          onClick={increment}
          className={`${css.btn} ${incrementDisabled ? css.btn_disabled : ""} `}
          aria-label={t("viewNextMonthEntries")}
          disabled={isLoading || incrementDisabled}
        >
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
