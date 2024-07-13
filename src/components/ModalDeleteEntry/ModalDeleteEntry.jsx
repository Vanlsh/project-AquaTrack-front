import svg from '../../assets/icons.svg';
import css from './ModalDeleteEntry.module.css';
import BtnDelete from '../BtnDelete/BtnDelete.jsx';

const ModalDeleteEntry = ({onClose, id}) => {
    
  const handleClose = () => {
    onClose();
  };

    return (
        <div className={css.modal}>
            <button type="button" aria-label='Close the delete entry modal window' onClick={onClose} className={css.closeBtn}>
                <svg className={css.svg}>
                    <use xlinkHref={svg + '#icon-x'}></use>
                </svg>
            </button>
            <div className={css.modalTextBox}>
                <h2 className={css.modalTitle}>Delete entry</h2>
                <p className={css.modalText}>Are you sure you want to delete the entry?</p>
            </div>
            <div className={css.modalBtnBox}>
                <BtnDelete handleClose={handleClose} id={id} />
                <button type="button" onClick={onClose} className={css.btnCancel}>Cancel</button> 
            </div>
        </div>
    );
};

export default ModalDeleteEntry;

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
