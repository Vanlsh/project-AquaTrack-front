
import { useEffect, useState } from 'react';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar';
import css from './WaterMainInfo.module.css';

const WaterMainInfo = () => {
  const [goal, setGoal] = useState(0);

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
      <button type='button' className={css.btnAdd}>
        <h2 className={css.btnText}>Add water</h2>
      </button>
    </div>
  </div>;
};

export default WaterMainInfo;
