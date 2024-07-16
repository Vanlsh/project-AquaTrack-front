import css from "./WaterModal.module.css";
// import clsx from 'clsx';

import WaterForm from "../WaterForm/WaterForm";
// import { useState } from "react";
import { ANIMATION } from "../../constants";

const WaterModal = ({ operationType, onClose }) => {
    // const [closing, setClosing] = useState(false);

  const handleClose = () => {
    // setClosing(true);
    const id = setTimeout(() => {
      onClose();
      clearTimeout(id);
    }, ANIMATION.DURATION);
  };

    const modalHeader = (operationType) => {
            switch (operationType) {
                case "add":
                    return "Add water";
                case "edit":
                    return "Edit the entered amount of water";
                default:
                    return "Add Water";
            }
        }

    return (
        <div className={css.WaterModal}>
            <h1 >{modalHeader(operationType)}</h1>
            <WaterForm operationType={operationType}/>
            <button type="button" onClick={handleClose} className={css.WaterModalCloseBtn}>
                <svg>
                    <use href="src\assets\icons.svg#icon-clear"></use>
                </svg>
            </button>
        </div>
    );
};
export default WaterModal;