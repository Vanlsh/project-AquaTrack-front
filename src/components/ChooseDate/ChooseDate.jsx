import { useParams } from "react-router-dom";
import css from "./ChooseDate.module.css";
import { parseDateTime } from "../../helpers/parseDate.js";
import { getDateMonthString } from "../../helpers/getDateMonthString.js";
import { useTranslation } from "react-i18next";

const ChooseDate = () => {
  const { t } = useTranslation();
  const { date } = useParams();
  const { isToday, day, month } = getDateMonthString(parseDateTime(date));
  const dateString = isToday ? t("today") : `${day} ${t(month)}`;
  return <h3 className={css.selectedDate}>{dateString}</h3>;
};

export default ChooseDate;
