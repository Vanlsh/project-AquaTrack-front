import { useEffect, useState, useCallback } from "react";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import css from "./WaterMainInfo.module.css";

import { useModal } from "../../hooks/useModal.js";
import svgSprite from "../../assets/icons.svg";
import WaterModal from "../WaterModal/WaterModal.jsx";

const WaterMainInfo = () => {
  const [goal, setGoal] = useState(0);
  const setModal = useModal();

  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const openModal = useCallback(() => {
    setModal(<WaterModal onClose={closeModal} />);
  }, [setModal, closeModal]);

    const setGoalModal = useCallback(() => {
    setModal(<WaterModal onClose={closeModal} />);
  }, [setModal, closeModal]);

  // useEffect(() => {
  //   const getGoal = async () => {
  //     try {
  //       const response = await fetch('');
  //       const data = await response.json();
  //       setGoal(data.goal)
  //     } catch (error) {
  //       console.error('Помилка при отриманні даних:', error);
  //     }
  //   }
  //   getGoal();
  // }, [])

  return (
      <div className={css.waterContainer}>
      <h1 className={css.waterTitle}>AquaTrack</h1>
      {/* {goal === 0 ? <div className={css.normaContainer} style={{display: none}} /> : <div className={css.normaContainer}>} */}
        <div className={css.normaContainer}>
          <h2 className={css.normaL}>{goal === 0 ? 'You don’t have a goal yet!' : `${goal} L`}</h2>
          <p className={css.normaText}>My daily norma</p>
      </div>
      {/* {goal === 0 ? <WaterProgressBar style={{display: none}} /> : <WaterProgressBar />} */}
      <WaterProgressBar />
      {/* {goal === 0 ? <button type="button" className={css.btnAdd}  onClick={openModal}>
          <svg className={css.plus}>
            <use xlinkHref={svgSprite + "#icon-plus"} />
          </svg>
          <h2 className={css.btnText}>Add water</h2>
        </button>
          :
          <button type="button" className={css.btnAdd}  onClick={openModal}>
          <svg className={css.plus}>
            <use xlinkHref={svgSprite + "#icon-plus"} />
          </svg>
          <h2 className={css.btnText}>Add water</h2>
        </button> */}
        <button type="button" className={css.btnAdd} onClick={openModal}>
          <svg className={css.plus}>
            <use xlinkHref={svgSprite + "#icon-plus"} />
          </svg>
          <h2 className={css.btnText}>Add water</h2>
        </button>
      </div>
    
  );
};

export default WaterMainInfo;
