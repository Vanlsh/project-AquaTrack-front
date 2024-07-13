import css from './ModalLogout.module.css';
import svg from '../../assets/icons.svg';
import BtnLogout from '../BtnLogout/BtnLogout.jsx';

const ModalLogout = ({onClose}) => {

    const handleClose = () => {
        onClose();
    };

    return (
        <div className={css.modal}>
            <button type="button" aria-label='Close the log out modal window' onClick={onClose} className={css.closeBtn}>
                <svg className={css.svg}>
                    <use xlinkHref={svg + '#icon-x'}></use>
                </svg>
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