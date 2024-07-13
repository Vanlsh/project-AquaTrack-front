// import { useState } from 'react';
// import { ANIMATION } from '../../constants.js';
import css from './ModalLogout.module.css';
import BtnLogout from '../BtnLogout/BtnLogout.jsx';

const ModalLogout = ({onClose}) => {
    // const [closing, setClosing] = useState(false);
    // console.log(closing);

    // const handleClose = () => {
    //     setClosing(true);
    //     const id = setTimeout(() => {
    //         onClose();
    //         clearTimeout(id);
    //     }, ANIMATION.DURATION);
    // };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className={css.modal}>
            <button type="button" aria-label='' onClick={onClose} className={css.closeBtn}>
                {/* <svg>
                    <use href="src\assets\icons.svg#icon-clear"></use>
                </svg> */}
            </button>
            <div className={css.modalTextBox}>
                <h2 className={css.modalTitle}>Log out</h2>
                <p className={css.modalText}>Do you really want to leave?</p>
            </div>
            <div className={css.modalBtnBox}> 
                <BtnLogout handleClose={handleClose} />
                <button type="button" onClick={onClose} className={css.btnCancel}>Cancel</button> 
            </div>
        </div>
    );
};

export default ModalLogout;