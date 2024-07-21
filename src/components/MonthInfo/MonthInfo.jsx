import CalendarPagination from "../CalendarPagination/CalendarPagination.jsx";
import Calendar from "../Calendar/Calendar.jsx";

const MonthInfo = () => {
  return (
    <div className="six-step">
      <CalendarPagination />
      <Calendar />
    </div>
  );
};

export default MonthInfo;
