import React, { useState, useEffect } from 'react';
import css from './WaterProgressBar.module.css';

const WaterProgressBar = () => {
  const [currentWater, setCurrentWater] = useState(0);
  const [goal, setGoal] = useState(2000);

  useEffect(() => {
    const mockFetchWaterData = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ currentWater: 2000, goal: 2000 });
        }, 1000);
      });
    };

    const fetchWaterData = async () => {
      try {
        const data = await mockFetchWaterData();
        setCurrentWater(data.currentWater);
        setGoal(data.goal);
        // const response = await fetch('');
        // const data = await response.json();
      } catch (error) {
        console.error('Помилка при отриманні даних:', error);
      }
    };

    fetchWaterData();
  }, []);

  const calculatePercentage = (current, goal) => {
    return (current / goal) * 100;
  };

  const percentage = calculatePercentage(currentWater, goal);

  return (
    <div className={css.progressBarContainer}>
      <h2 className={css.progressBarTitle}>Today</h2>
      <div className={css.progressBar}>
        <div
          className={css.progressBarFill}
          style={{
            width: `${percentage}%`,
            maxWidth: '174px',
            backgroundColor: currentWater < goal ? '#9be1a0' : '#FABE4A',
          }}
        >
          <p className={css.percentNumber}
            style={{
            color: currentWater < goal ? '#9be1a0' : '#FABE4A'
          }}>
            {currentWater < goal ? `${percentage}%` : 'done!'}
          </p>
          <div className={css.ball} style={{
            border: currentWater < goal ? 'solid 1px #9be1a0' : 'solid 1px #FABE4A'
          }}></div>
        </div>
      </div>
      <div className={css.percentContainer}>
        <p className={css.percent}>0%</p>
        <p className={css.percent}>50%</p>
        <p className={css.percent}>100%</p>
      </div>
    </div>
  );
};

export default WaterProgressBar;
