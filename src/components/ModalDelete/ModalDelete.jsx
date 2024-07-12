import css from './ModalDelete.module.css';

const ModalDelete = ({}) => {
    // const { modal, handleSetModal } = useModal;

    return (
        <div className={css.modal}>
            <button className={css.closeBtn}>x</button>
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