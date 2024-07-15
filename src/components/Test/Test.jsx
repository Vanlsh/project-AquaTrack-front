import { useModal } from "../../hooks/useModal.js";
import { useCallback } from 'react';
// import SomeModalWindowWithoutBackdrop from "../../components/SomeModalWindowWithoutBackdrop/SomeModalWindowWithoutBackdrop.jsx";
// import Modal from '../Modal/Modal.jsx';
// import LogOutModal from "../LogOutModal/LogOutModal.jsx";
import WaterModal from "../WaterModal/WaterModal.jsx";
// import DeleteWaterModal from '../DeleteWaterModal/DeleteWaterModal.jsx'

const SomeComponent = () => {
  const setModal = useModal();

  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const openModal = useCallback(() => {
    setModal(<WaterModal onClose={closeModal} />);
  }, [setModal, closeModal]);


  return (
    <div>
      <h2>Component Title</h2>
      <p>Some component content</p>

      <button type="button" onClick={openModal}>
        OpenModal
      </button>
    </div>
  );
};

export default SomeComponent;
