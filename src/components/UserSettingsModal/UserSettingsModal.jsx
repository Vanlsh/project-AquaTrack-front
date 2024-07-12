// import ModalBackdrop from "../ModalBackdrop/ModalBackdrop.jsx";
import Modal from "../Modal/Modal.jsx";
import UserSettingsForm from "../UserSettingsForm/UserSettingsForm.jsx";
import css from "./UserSettingsModal.module.css";

const UserSettingsModal = ({ isOpen, onClose }) => {
  return (
    // isOpen &&
    // <ModalBackdrop onClose={onClose}>
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.modalSettingContainer}>
        <div className={css.modalHeader}>
          <h2>Setting</h2>
          <button className={css.closeBtn} onClick={onClose}>
            {/* <svg className={css.icon}>
              <use href="../../assets/icons.svg#icon-x"></use>
            </svg> */}
            X
          </button>
        </div>
        <div className="modal-body">
          <UserSettingsForm />
        </div>
      </div>
    </Modal>
    // </ModalBackdrop>
  );
};

export default UserSettingsModal;
