import { useState } from 'react';
import { ANIMATION } from '../../constants.js';
import css from './ModalDelete.module.css';

const ModalDelete = ({onClose}) => {
    const [closing, setClosing] = useState(false);

    const handleClose = () => {
        setClosing(true);
        const id = setTimeout(() => {
            onClose();
            clearTimeout(id);
        }, ANIMATION.DURATION);
    };

    return (
        <div className={css.modal}>
            <button type="button" onClick={handleClose} className={css.closeBtn}>
                <svg>
                    <use href="src\assets\icons.svg#icon-clear"></use>
                </svg>
            </button>
            <div className={css.modalTextBox}>
                <h2 className={css.modalTitle}>Delete entry</h2>
                <p className={css.modalText}>Are you sure you want to delete the entry?</p>
            </div>
            <div className={css.modalBtnBox}>
                <BtnDelete />
                <BtnCancel />  
            </div>
        </div>
    );
};

export default ModalDelete;

/* in SomeModalWindowWithoutBackdrop

import { useState } from 'react';
import { ANIMATION } from "../../constants.js";

const SomeModalWindowWithoutBackdrop = ({ onClose }) => {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    const id = setTimeout(() => {
      onClose();
      clearTimeout(id);
    }, ANIMATION.DURATION);
  };

  return (
    <div>
      <h2>Component Title</h2>
      <p>Some component content</p>

      <button type="button" onClick={handleClose}>
        CloseModal
      </button>
    </div>
  );
};

export default SomeModalWindowWithoutBackdrop;

*/
