import { useParams } from "react-router-dom";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo.jsx";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchDailyWater,
  fetchMonthlyWater,
} from "../../redux/water/operations.js";
import { parseDateTime } from "../../helpers/parseDate.js";

const TrackerPage = () => {
  const { date } = useParams();
  const parsedDate = parseDateTime(date).getTime();
  const [isRefreshingPage, setIsRefreshingPage] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isRefreshingPage) {
      dispatch(fetchMonthlyWater(parsedDate));
      dispatch(fetchDailyWater(parsedDate));
      setIsRefreshingPage(false);
    }
  }, [isRefreshingPage, parsedDate, dispatch]);

  return (
    <>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </>
  );
};

export default TrackerPage;
