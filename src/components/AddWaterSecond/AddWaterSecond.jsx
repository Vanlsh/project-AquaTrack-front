import css from "./AddWaterSecond.module.css";
import WaterModal from "../../components/WaterModal/WaterModal";
import { useCallback } from "react";
import { useModal } from "../../hooks/useModal";
import { useTranslation } from "react-i18next";

const AddWaterBtn = () => {
  const setModal = useModal();
  const { t } = useTranslation();
  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const openModal = useCallback(() => {
    setModal(<WaterModal onClose={closeModal} />);
  }, [setModal, closeModal]);

  return (
    <button className={css.btnStyle} type="button" onClick={openModal}>
      <svg className={css.iconStyle} width="16" height="16">
        <use href="../../src/assets/icons.svg#icon-plus"></use>
      </svg>
      {t("addWater")}
    </button>
  );
};

export default AddWaterBtn;
