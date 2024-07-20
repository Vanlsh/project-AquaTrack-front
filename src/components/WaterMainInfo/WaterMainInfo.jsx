import { useTranslation } from "react-i18next";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import css from "./WaterMainInfo.module.css";
import { useSelector } from "react-redux";
import Logo from "../Logo/Logo.jsx";
import { selectWaterRate } from "../../redux/auth/selectors.js";
import BtnUserSet from "../BtnUserSet/BtnUserSet.jsx";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx";
import { useTour } from "@reactour/tour";

const WaterMainInfo = () => {
  const { t } = useTranslation();
  const waterRate = useSelector(selectWaterRate);
  const { setIsOpen } = useTour();

  const waterRateString =
    waterRate < 1 ? `${waterRate * 1000} ${t("ml")}` : `${waterRate} ${t("l")}`;
    
  return (
    <div className={css.waterContainer}>
      <Logo className={css.waterTitle} />
      <button onClick={() => setIsOpen(true)}>Open Tour</button>

      {waterRate === 0 ? (
        ""
      ) : (
        <div className={`${css.normaContainer} first-step`}>
          <h2 className={css.normaL}>{waterRateString}</h2>
          <p className={css.normaText}>{t("dailyNorm")}</p>
        </div>
      )}
      {waterRate === 0 ? "" : <WaterProgressBar />}
      {waterRate === 0 ? <BtnUserSet /> : <AddWaterBtn />}
    </div>
  );
};

export default WaterMainInfo;
