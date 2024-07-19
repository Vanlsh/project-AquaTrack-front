import { useTranslation } from "react-i18next";
import UserSettingsForm from "../UserSettingsForm/UserSettingsForm.jsx";
import css from "./UserSettingsModal.module.css";
import svg from "../../assets/icons.svg";
import { useState } from "react";

const UserSettingsModal = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className={css.modalSettingContainer}>
      <div className={css.modalHeader}>
        <h2>{t("settings")}</h2>
        <button type="button" className={css.closeBtn} onClick={onClose}>
          <svg className={css.icon}>
            <use xlinkHref={svg + "#icon-x"}></use>
          </svg>
        </button>
      </div>
      <UserSettingsForm handleClose={onClose} />
    </div>
  );
};

export default UserSettingsModal;
