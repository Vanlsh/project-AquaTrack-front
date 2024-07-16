import css from "./AdvantagesSection.module.css";

const AdvantagesSection = () => {
  return (
    <div className={css.advantagesSection}>
      <ul className={css.advantagesList}>
        <li className={css.advantagesHabit}>Habit drive</li>
        <li className={css.advantagesStatistics}>View statistics</li>
        <li className={css.advantagesSetting}>Personal rate setting</li>
      </ul>
    </div>
  );
};

export default AdvantagesSection;
