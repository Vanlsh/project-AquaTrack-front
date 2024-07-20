import css from "./AddWaterSecond.module.css";
import WaterModal from "../../components/WaterModal/WaterModal";
import { useCallback } from "react";
import { useModal } from "../../hooks/useModal";
import { useTranslation } from "react-i18next";
import svg from "../../assets/icons.svg";
import { useParams } from "react-router-dom";
import { parseDateTime } from "../../helpers/parseDate";
const AddWaterBtn = () => {
  const setModal = useModal();
  const { t } = useTranslation();
  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const { date: dateUrl } = useParams();
  const timestampFromUrl = parseDateTime(dateUrl).getTime();

  const openModal = useCallback(() => {
    setModal(
      <WaterModal
        onClose={closeModal}
        operationType={"add"}
        timestampFromUrl={timestampFromUrl}
      />
    );
  }, [setModal, closeModal, timestampFromUrl]);

  return (
    <button className={css.btnStyle} type="button" onClick={openModal}>
      <svg className={css.iconStyle} width="16" height="16">
        <use xlinkHref={svg + "#icon-plus"}></use>
      </svg>
      {t("addWater")}
    </button>
  );
};

export default AddWaterBtn;
