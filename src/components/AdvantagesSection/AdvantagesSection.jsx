import css from "./AdvantagesSection.module.css";
import { useTranslation } from "react-i18next";

const AdvantagesSection = () => {
  const { t } = useTranslation();
  return (
    <div className={css.advantagesSection}>
      <ul className={css.advantagesList}>
        <li className={css.advantagesHabit}>{t("habitDrive")}</li>
        <li className={css.advantagesStatistics}>{t("viewStats")}</li>
        <li className={css.advantagesSetting}>{t("personalRate")}</li>
      </ul>
    </div>
  );
};

export default AdvantagesSection;
