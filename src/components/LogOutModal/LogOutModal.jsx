import { useTranslation } from "react-i18next";
import css from "./LogOutModal.module.css";
import svg from "../../assets/icons.svg";
import BtnLogout from "../BtnLogout/BtnLogout.jsx";
import { ANIMATION } from "../../constants.js";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../redux/auth/selectors.js";
import LoaderComponent from "../LoaderComponent/LoaderComponent.jsx";

const ModalLogout = ({ onClose }) => {
  const { t } = useTranslation();
  const isLoading = useSelector(selectIsLoading);

  const handleClose = () => {
    const id = setTimeout(() => {
      onClose();
      clearTimeout(id);
    }, ANIMATION.DURATION);
  };

  return (
    <div className={css.modal}>
      <button
        type="button"
        aria-label="Close the log out modal window"
        onClick={handleClose}
        className={css.closeBtn}
      >
        <svg className={css.svg}>
          <use xlinkHref={svg + "#icon-x"}></use>
        </svg>
      </button>
      <div className={css.modalTextBox}>
        <h2 className={css.modalTitle}>{t("logout")}</h2>
        <p className={css.modalText}>{t("confirmLogout")}</p>
      </div>
      <div className={css.modalBtnBox}>
        {isLoading ? (
          <LoaderComponent height={80} width={80} />
        ) : (
          <>
            <BtnLogout handleClose={handleClose} />
            <button
              type="button"
              onClick={handleClose}
              className={css.btnCancel}
            >
              {t("cancel")}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalLogout;
