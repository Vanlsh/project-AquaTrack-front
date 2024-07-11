import css from './WaterMainInfo.module.css';

const WaterMainInfo = () => {
  return <div>
    <div className={css.waterContainer}>
      <h1 className={css.waterTitle}>AquaTrack</h1>
      <div className={css.normaContainer}>
        <h2 className={css.normaL}>--</h2>
        <p className={css.normaText}>My daily norma</p>
      </div>
      <div className={css.progressBarContainer}>
        <h2 className={css.progressBarTitle}>Today</h2>
      </div>
      <button type='button' className={css.btnAdd}>
        <h2 className={css.btnText}>Add water</h2>
      </button>
    </div>
  </div>;
};

export default WaterMainInfo;
