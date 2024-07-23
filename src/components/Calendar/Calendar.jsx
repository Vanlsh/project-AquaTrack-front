import { useSelector } from "react-redux";
import {
  selectWaterMonthlyRecord,
  selectMonthlyIsLoading,
  selectMonthlyIsError,
} from "../../redux/water/selectors.js";
import Loader from "../Loader/Loader.jsx";

import css from "./Calendar.module.css";
import CalendarItem from "../CalendarItem/CalendarItem.jsx";
import { useTranslation } from "react-i18next";

const Calendar = () => {
  const { t } = useTranslation();
  const dateArray = useSelector(selectWaterMonthlyRecord);
  const isLoading = useSelector(selectMonthlyIsLoading);
  const isError = useSelector(selectMonthlyIsError);

  if (isLoading) return <Loader />;

  if (isError)
    return (
      <div className={css.container}>
        <h2 className={css.errorMessage}>{t("waterMonthErrorMessage")}</h2>
      </div>
    );
  return (
    <div className={css.container}>
      <ul className={css.calendarList}>
        {dateArray.map((eachDate, index) => (
          <li key={index}>
            <CalendarItem
              index={index}
              calendarDate={eachDate.date}
              amount={eachDate.amount}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
