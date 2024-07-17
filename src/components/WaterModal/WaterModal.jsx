import css from "./WaterModal.module.css";

import clsx from 'clsx';
import WaterForm from "../WaterForm/WaterForm";
import { useState } from "react";
import { ANIMATION } from "../../constants";
import svgSprite from "../../assets/icons.svg";
import { useLocation } from 'react-router-dom';


const WaterModal = ({ operationType, onClose, editTime, portionOfDB }) => {
    const [closing, setClosing] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const timestamp = searchParams.get('time');

    const handleClose = () => {
        setClosing(true);
        const id = setTimeout(() => {
            onClose();
            clearTimeout(id);
        }, ANIMATION.DURATION);
    };


    const modalHeader = (operationType) => {
        switch (operationType) {
            case "add": {
                return "Add water";
            }
            case "edit": {
                return "Edit the entered amount of water";
            }
            default: {
                return "Add Water";
            }
        }
    };

    const formTime = (operationType) => {
        switch (operationType) {
            case "add": {
                return timestamp ? new Date(parseInt(timestamp, 10)) : new Date();
            }
            case "edit": {
                return new Date(editTime);
            }
            default: {
                return new Date();
            }
        }
    };

    const portionOfWater = (operationType) => {
        switch (operationType) {
            case "add": {
                return 50;
            }
            case "edit": {
                return portionOfDB;
            }
            default: {
                return 50;
            }
        }
    };




    return (
        <div className={css.WaterModal}>

            <h1>{modalHeader(operationType)}</h1>
            <WaterForm operationType={operationType} formTime={formTime(operationType)} portionOfWater={portionOfWater} handleClose={handleClose} />
            <button type="button" onClick={handleClose} className={css.WaterModalCloseBtn}>
                <svg>
                    <use xlinkHref={svgSprite + "#icon-clear"}></use>
                </svg>
            </button>
        </div>
    );
};

export default WaterModal;
