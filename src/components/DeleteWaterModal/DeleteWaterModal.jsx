import svg from "../../assets/icons.svg";
import css from "./DeleteWaterModal.module.css";
import BtnDelete from "../BtnDelete/BtnDelete.jsx";
import { ANIMATION } from "../../constants.js";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteWaterIntakeRecord } from "../../redux/water/operations.js";
import LoaderComponent from "../LoaderComponent/LoaderComponent.jsx";

const ModalDeleteEntry = ({ id, onClose }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    const id = setTimeout(() => {
      onClose();
      clearTimeout(id);
    }, ANIMATION.DURATION);
  };

  const handleDelete = () => {
    setIsLoading(() => true);
    dispatch(deleteWaterIntakeRecord(id)).then(({ error }) => {
      if (!error) {
        handleClose();
      }
      setIsLoading(false);
    });
  };

  return (
    <div className={css.modal}>
      <button
        type="button"
        aria-label="Close the delete entry modal window"
        onClick={handleClose}
        className={css.closeBtn}
      >
        <svg className={css.svg}>
          <use xlinkHref={svg + "#icon-x"}></use>
        </svg>
      </button>
      <div className={css.modalTextBox}>
        <h2 className={css.modalTitle}>{t("deleteEntry")}</h2>
        <p className={css.modalText}>{t("confirmDeleteEntry")}</p>
      </div>
      <div className={css.modalBtnBox}>
        {isLoading ? (
          <LoaderComponent height={80} width={80} />
        ) : (
          <>
            <BtnDelete handleDelete={handleDelete} id={id} />
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

export default ModalDeleteEntry;
