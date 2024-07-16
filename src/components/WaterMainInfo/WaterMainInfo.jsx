import { useEffect, useState, useCallback } from "react";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import css from "./WaterMainInfo.module.css";

import { useModal } from "../../hooks/useModal.js";
import svgSprite from "../../assets/icons.svg";
import WaterModal from "../WaterModal/WaterModal.jsx";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectWaterDailyAmount, selectWaterDailyPercentage, selectWaterDailyRecord, selectWaterMonthlyRecord } from "../../redux/water/selectors.js";
import { fetchDailyWater, fetchMonthlyWater } from "../../redux/water/operations.js";
import Logo from "../Logo/Logo.jsx";

const WaterMainInfo = () => {
  const dispatch = useDispatch();
  const dailyWaterAmount = useSelector(selectWaterDailyRecord)
  const setModal = useModal();
  console.log(dailyWaterAmount);

  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const openModal = useCallback(() => {
    setModal(<WaterModal onClose={closeModal} />);
  }, [setModal, closeModal]);

    const setGoalModal = useCallback(() => {
    setModal(<UserSettingsModal  onClose={closeModal} />);
  }, [setModal, closeModal]);

  useEffect(() => {
    dispatch(fetchMonthlyWater())
  }, [dispatch])

  return (
    <div className={css.waterContainer}>
      <Logo className={css.waterTitle}/>
      
      {dailyWaterAmount === 0 ? (<div className={css.normaContainer} style={{ display: 'none' }} />
      ) : (
        <div className={css.normaContainer}>
            <h2 className={css.normaL}>{`${dailyWaterAmount} L`}</h2>
          <p className={css.normaText}>My daily norma</p>
        </div>)}
      {dailyWaterAmount === 0 ? ('')
        :
        (<WaterProgressBar />)}
      
       {dailyWaterAmount === 0 ? (<button type="button" className={css.btnSet}  onClick={setGoalModal}>
          <svg className={css.plus}>
            <use xlinkHref={svgSprite + "#icon-plus"} />
          </svg>
          <h2 className={css.btnTextSet}>Set your norm</h2>
        </button>)
          :(
         
        <button type="button" className={css.btnAdd} onClick={openModal}>
          <svg className={css.plus}>
            <use xlinkHref={svgSprite + "#icon-plus"} />
          </svg>
          <h2 className={css.btnText}>Add water</h2>
        </button>)}
      </div>
    
  );
};

export default WaterMainInfo;
