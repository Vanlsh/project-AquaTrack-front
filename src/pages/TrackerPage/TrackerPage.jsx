import { useParams } from "react-router-dom";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo.jsx";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchDailyWater,
  fetchMonthlyWater,
} from "../../redux/water/operations.js";
import { parseDateTime } from "../../helpers/parseDate.js";

const TrackerPage = () => {
  const { date } = useParams();
  const parsedDate = parseDateTime(date).getTime();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDailyWater(parsedDate));
    dispatch(fetchMonthlyWater(parsedDate));
  }, [parsedDate, dispatch]);

  return (
    <>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </>
  );
};

export default TrackerPage;
