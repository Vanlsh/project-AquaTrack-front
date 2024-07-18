import { useSelector } from "react-redux";
import WaterItem from "../WaterItem/WaterItem";
import css from "./WaterList.module.css";
import {
  selectWaterDailyRecord,
  selectDailyIsLoading,
} from "../../redux/water/selectors.js";

const WaterList = () => {
  const data = useSelector(selectWaterDailyRecord);
  const isLoading = useSelector(selectDailyIsLoading);

  if (isLoading) {
    return (
      <div className={css.waterList}>
        {[1, 2, 3].map((item) => (
          <div key={item} className={css.skeleton}></div>
        ))}
      </div>
    );
  }
  if (!data.length) {
    return (
      <div className={css.messageContainer}>
        <h2 className={css.noWater}>No water added jet</h2>
      </div>
    );
  }
  return (
    <ul className={css.waterList}>
      {data.map((item) => (
        <li key={item.id}>
          <WaterItem water={item} />
        </li>
      ))}
    </ul>
  );
};

export default WaterList;
