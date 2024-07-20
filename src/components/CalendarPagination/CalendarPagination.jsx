import { useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";

import { Title } from "../Title/Title.jsx";
import { parseDateTime } from "../../helpers/parseDate.js";
import svg from "../../assets/icons.svg";
import { monthsName } from "../../constants";
import css from "./CalendarPagination.module.css";
import { fetchMonthlyWater } from "../../redux/water/operations.js";
import { useDispatch, useSelector } from "react-redux";
import { selectMonthlyIsLoading } from "../../redux/water/selectors.js";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const CalendarPagination = () => {
  const { date: dateUrl } = useParams();
  const dateMs = parseDateTime(dateUrl);
  const dispatch = useDispatch();
  const [year, setYear] = useState(new Date(dateMs).getFullYear());
  const [month, setMonth] = useState(new Date(dateMs).getMonth());
  const isLoading = useSelector(selectMonthlyIsLoading);
  const { t } = useTranslation();
  const location = useLocation();
  const pathname = location.pathname.split("/").pop();

  const increment = () => {
    if (month === 11) {
      dispatch(fetchMonthlyWater(new Date(year + 1, 0, 3).getTime()));
      setMonth(0);
      setYear(year + 1);

      return;
    }
    dispatch(fetchMonthlyWater(new Date(year, month + 1, 3).getTime()));
    setMonth(month + 1);
  };

  const decrement = () => {
    if (month === 0) {
      dispatch(fetchMonthlyWater(new Date(year - 1, 11, 3).getTime()));
      setMonth(11);
      setYear(year - 1);
      return;
    }
    dispatch(fetchMonthlyWater(new Date(year, month - 1, 3).getTime()));
    setMonth(month - 1);
  };

  const selectedMonth = t(monthsName[month]);
  const title = pathname === "schedule" ? t("schedule") : t("month");
  const yearNow = new Date(Date.now()).getFullYear();
  const monthNow = new Date(Date.now()).getMonth();
  const incrementDisabled =
    new Date(yearNow, monthNow) <= new Date(year, month);

  return (
    <div className={css.calendar_title}>
      <Title title={title} styles={css.month} />
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
        <button
          onClick={increment}
          className={`${css.btn} ${incrementDisabled ? css.btn_disabled : ""} `}
          disabled={isLoading || incrementDisabled}
        >
          <svg className={css.svg_arrow_right}>
            <use xlinkHref={svg + "#icon-arrow"}></use>
          </svg>
        </button>
        <NavLink
          to="calendar"
          className={({ isActive }) => {
            console.log("schedule", isActive);
            return clsx(css.statistic_btn, { [css.isHidden]: isActive });
          }}
        >
          <svg className={css.svg_schedule}>
            <use xlinkHref={svg + "#icon-pie-chart"}></use>
          </svg>
        </NavLink>
        <NavLink
          to="schedule"
          className={({ isActive }) => {
            return clsx(css.statistic_btn, { [css.isHidden]: isActive });
          }}
        >
          <svg className={css.svg_pie}>
            <use xlinkHref={svg + "#icon-pie-chart"}></use>
          </svg>
        </NavLink>
      </div>
    </div>
  );
};

export default CalendarPagination;
