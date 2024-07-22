import { useParams } from "react-router-dom";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo.jsx";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDailyWater,
  fetchMonthlyWater,
  fetchTodayWater,
  fetchWeeklyWater,
} from "../../redux/water/operations.js";
import { parseDateTime } from "../../helpers/parseDate.js";
import { useTour } from "@reactour/tour";
import { selectIsNewUser } from "../../redux/auth/selectors.js";
import { setNewUser } from "../../redux/auth/slice.js";

const TrackerPage = () => {
  const { setIsOpen } = useTour();
  const { date } = useParams();
  const parsedDate = parseDateTime(date).getTime();
  const dispatch = useDispatch();
  const [isRefreshingPage, setIsRefreshingPage] = useState(true);
  const isNewUser = useSelector(selectIsNewUser)

  useEffect(() => {
    if (isRefreshingPage) {
      const formattedDate = Date.now();
      dispatch(fetchMonthlyWater(parsedDate));
      dispatch(fetchDailyWater(parsedDate));
      dispatch(fetchTodayWater());
      dispatch(fetchWeeklyWater(formattedDate));
      setIsRefreshingPage(false);
    }
  }, [isRefreshingPage, parsedDate, dispatch]);

      useEffect(() => {
    if (isNewUser) {
      setIsOpen(true);
      dispatch(setNewUser(false))
    }
  }, [isNewUser, setIsOpen, dispatch])

  return (
    <>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </>
  );
};

export default TrackerPage;
