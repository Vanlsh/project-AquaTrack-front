import { useSelector } from "react-redux";
import WaterItem from "../WaterItem/WaterItem";
import css from "./WaterList.module.css";
import { selectWaterDailyRecord } from "../../redux/water/selectors.js";

const WaterList = () => {
  const data = useSelector(selectWaterDailyRecord);
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
