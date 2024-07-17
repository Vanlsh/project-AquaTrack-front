import { useParams } from "react-router-dom";
import css from "./ChooseDate.module.css";
import { parseDateTime } from "../../helpers/parseDate.js";
import { getDateMonthString } from "../../helpers/getDateMonthString.js";

const ChooseDate = () => {
  const { date } = useParams();
  const currentDate = parseDateTime(date);

  return (
    <h3 className={css.selectedDate}>{getDateMonthString(currentDate)}</h3>
  );
};

export default ChooseDate;
