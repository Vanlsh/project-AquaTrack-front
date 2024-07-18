import WaterList from "../WaterList/WaterList";
import css from "./DailyInfo.module.css";
import AddWaterBtn from "../AddWaterSecond/AddWaterSecond";
import ChooseDate from "../ChooseDate/ChooseDate";

const DailyInfo = () => {
  return (
    <div className={css.info}>
      <div className={css.header}>
        <ChooseDate />
        <AddWaterBtn />
      </div>
      <WaterList />
    </div>
  );
};

export default DailyInfo;
