import { useTranslation } from "react-i18next";
import css from "./WaterModal.module.css";
import clsx from 'clsx';
import WaterForm from "../WaterForm/WaterForm";
import { useState } from "react";
import { ANIMATION } from "../../constants";
import svgSprite from "../../assets/icons.svg";

const WaterModal = ({ operationType, onClose, water }) => {
  const { t } = useTranslation();
  const [closing, setClosing] = useState(false);

  
  const handleClose = () => {
    setClosing(true);
    const id = setTimeout(() => {
      onClose();
      clearTimeout(id);
    }, ANIMATION.DURATION);
  };

  const modalHeader = (operationType) => {
    switch (operationType) {
      case "add":
        return t("addWaterTitle");
      case "edit":
        return t("editWaterAmount");
      default:
        return t("addWaterTitle");
    }
  };

  const getTimestampFromUrl = () => {
    const url = new URL(window.location.href);
    const timestamp = url.pathname.split('/').pop();
    return Number(timestamp);  // Перетворюємо на число
  }

  const curentTimestamp = getTimestampFromUrl();

  const editTime = (operationType) => {
    switch (operationType) {
      case "add":
        return curentTimestamp;
      case "edit":
        return water.date;
      default:
        return null;
    }
  };

  const waterPortion = (operationType) => {
    switch (operationType) {
      case "add":
        return 50;
      case "edit":
        return water.amount;
      default:
        return 50;
    }
  };

  const waterID = (operationType) => {
    switch (operationType) {
      case "add":
        return null;
      case "edit":
        return water.id;
      default:
        return null;
    }
  };

  return (
    <div className={css.WaterModal}>
      <h1>{modalHeader(operationType)}</h1>
      <WaterForm 
        operationType={operationType}
        editTime={editTime(operationType)} // Передаємо мілісекунди
        waterPortion={waterPortion(operationType)} // Передаємо порцію води
        waterID={waterID(operationType)} // Передаємо ID води
        handleClose={handleClose}
      />
      <button
        type="button"
        onClick={handleClose}
        className={css.WaterModalCloseBtn}
      >
        <svg>
          <use xlinkHref={svgSprite + "#icon-clear"}></use>
        </svg>
      </button>
    </div>
  );
};

export default WaterModal;
