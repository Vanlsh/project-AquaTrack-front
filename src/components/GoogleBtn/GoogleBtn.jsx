import css from "./GoogleBtn.module.css";
import { useTranslation } from "react-i18next";

const GoogleBtn = () => {
  const { t } = useTranslation();
  return (
    <a
      className={css.btn}
      //   href="http://localhost:3000/users/google"
      href="https://project-aquatrack-back.onrender.com/users/google"
    >
      {t("continueWithGoogle")}
    </a>
  );
};

export default GoogleBtn;
