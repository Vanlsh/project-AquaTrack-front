import { useTranslation } from "react-i18next";
import UserSettingsForm from "../UserSettingsForm/UserSettingsForm.jsx";
import css from "./UserSettingsModal.module.css";
import svg from "../../assets/icons.svg";

const UserSettingsModal = ({ onClose }) => {
  const { t } = useTranslation();
  return (
    <div className={css.modalSettingContainer}>
      <div className={css.modalHeader}>
        <h2>{t("settings")}</h2>
        <button className={css.closeBtn} onClick={onClose}>
          <svg className={css.icon}>
            <use xlinkHref={svg + "#icon-x"}></use>
          </svg>
        </button>
      </div>
      <div className="modal-body">
        <UserSettingsForm />
      </div>
    </div>
  );
};

export default UserSettingsModal;
