
import { useEffect, useState } from 'react';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar';
import css from './WaterMainInfo.module.css';

import { useModal } from "../../hooks/useModal.js";
import { useCallback } from 'react';
import Modal from '../Modal/Modal.jsx'



const WaterMainInfo = () => {
  const [goal, setGoal] = useState(0);

  const setModal = useModal();

  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const openModal = useCallback(() => {
    setModal(<Modal onClose={closeModal} />);
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
  

  return <div>
    <div className={css.waterContainer}>
      <h1 className={css.waterTitle}>AquaTrack</h1>
      <div className={css.normaContainer}>
        <h2 className={css.normaL}>{ goal === 0 ? '0 L?':`${goal} L` }</h2>
        <p className={css.normaText}>My daily norma</p>
      </div>
      <WaterProgressBar/>
      <button type='button' className={css.btnAdd} onClick={openModal}>
        <h2 className={css.btnText}>Add water</h2>
      </button>
    </div>
  </div>;
};

export default WaterMainInfo;
