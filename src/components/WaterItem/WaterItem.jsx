import { useCallback } from "react";
import WaterModal from "../../components/WaterModal/WaterModal";
import css from "../WaterItem/WaterItem.module.css";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal.jsx";
import { formatTime } from "../../helpers/formatTime.js";
import { convertToLiters } from "../../helpers/convertToLiters.js";
import { useModal } from "../../hooks/useModal.js";
import { useTranslation } from "react-i18next";
import svg from "../../assets/icons.svg";

const WaterItem = ({ water }) => {
  const setModal = useModal();
  const { t } = useTranslation();
  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);
  console.log("water", water);
  const openModalDelete = useCallback(() => {
    setModal(<DeleteWaterModal id={water.id} onClose={closeModal} />);
  }, [setModal, closeModal, water]);

  const openModalEdit = useCallback(() => {
    setModal(
      <WaterModal water={water} onClose={closeModal} operationType={"edit"} />
    );
  }, [setModal, closeModal, water]);

  const volume = convertToLiters(water.amount);
  return (
    <div className={css.water_item_content}>
      <svg className={css.icon_water_glass} width="44" height="45">
        <use xlinkHref={svg + "#icon-water-glass"}></use>
      </svg>
      <div className={css.water_info}>
        <p className={css.water_amount}>
          {`${volume.value} ${t(volume.text)}`}
        </p>
        <p className={css.water_date}>{formatTime(water.date)}</p>
      </div>
      <div className={css.container_buttons}>
        <button className={css.editButton} onClick={openModalEdit} aria-label="Edit the entered amount of water">
          <svg className={css.icon_action} width="14" height="14">
            <use xlinkHref={svg + "#icon-edit"}></use>
          </svg>
        </button>
        <button className={css.deleteButton} onClick={openModalDelete} aria-label="Delete the entered amount of water">
          <svg className={css.icon_action} width="14" height="14">
            <use xlinkHref={svg + "#icon-trash"}></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WaterItem;
