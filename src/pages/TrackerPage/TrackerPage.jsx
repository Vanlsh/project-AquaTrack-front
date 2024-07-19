import { useParams } from "react-router-dom";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo.jsx";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDailyWater,
  fetchMonthlyWater,
} from "../../redux/water/operations.js";
import { parseDateTime } from "../../helpers/parseDate.js";
import {
  selectDailyErrorMessage,
  selectDailySuccessMessage,
} from "../../redux/water/selectors.js";
import toast from "react-hot-toast";

const TrackerPage = () => {
  const { date } = useParams();
  const parsedDate = parseDateTime(date).getTime();
  const dispatch = useDispatch();
  const [isRefreshingPage, setIsRefreshingPage] = useState(true);
  const errorMessage = useSelector(selectDailyErrorMessage);
  const successMessage = useSelector(selectDailySuccessMessage);

  useEffect(() => {
    if (isRefreshingPage) {
      dispatch(fetchMonthlyWater(parsedDate));
      dispatch(fetchDailyWater(parsedDate));
      setIsRefreshingPage(false);
    }
  }, [isRefreshingPage, parsedDate, dispatch]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [errorMessage, successMessage]);

  return (
    <>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </>
  );
};

export default TrackerPage;
