import { Outlet, useLocation } from "react-router-dom";
import DailyInfo from "../DailyInfo/DailyInfo.jsx";
import MonthInfo from "../MonthInfo/MonthInfo.jsx";
import UserPanel from "../UserPanel/UserPanel.jsx";
import WaterIntakeChart from "../WaterIntakeChart/WaterIntakeChart.jsx";
import styles from "./WaterDetailedInfo.module.css";

const WaterDetailedInfo = () => {
  const location = useLocation();

  return (
    <section className={styles.waterDetailedInfo}>
      <UserPanel />
      <DailyInfo />
      {location.pathname.includes('calendar') && <MonthInfo />}
      {location.pathname.includes('schedule') && <WaterIntakeChart />}
      <Outlet />
    </section>
  );
};

export default WaterDetailedInfo;
