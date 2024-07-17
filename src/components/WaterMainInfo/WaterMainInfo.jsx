import { useTranslation } from "react-i18next";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import css from "./WaterMainInfo.module.css";
import { useSelector } from "react-redux";
import Logo from "../Logo/Logo.jsx";
import { selectWaterRate } from "../../redux/auth/selectors.js";
import BtnUserSet from "../BtnUserSet/BtnUserSet.jsx";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx";

const WaterMainInfo = () => {
  const { t } = useTranslation();
  const waterRate = useSelector(selectWaterRate);

  return (
    <div className={css.waterContainer}>
      <Logo className={css.waterTitle}/>
      
      {waterRate === 0 ? (<div className={css.normaContainer} style={{ display: 'none' }} />
      ) : (
        <div className={css.normaContainer}>
            <h2 className={css.normaL}>{`${waterRate} L`}</h2>
          <p className={css.normaText}>{t("dailyNorm")}</p>
        </div>)}
        {waterRate === 0 ? (''):(<WaterProgressBar />)}
        {waterRate === 0 ? (<BtnUserSet/>):(<AddWaterBtn/>)}
      </div>
    
  );
};

export default WaterMainInfo;
