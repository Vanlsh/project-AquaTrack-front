import { useContext } from "react";
import { ModalContext } from "../context/ModalProvider.jsx";

export const useModal = () => useContext(ModalContext);

// !!!= example to use =!!!

/* in component

import { useModal } from "../../hooks/useModal.js";
import { useCallback } from 'react';
import SomeModalWindowWithoutBackdrop from "../../components/SomeModalWindowWithoutBackdrop/SomeModalWindowWithoutBackdrop.jsx";

const SomeComponent = () => {
  const setModal = useModal();

  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const openModal = useCallback(() => {
    setModal(<SomeModalWindowWithoutBackdrop onClose={closeModal} />);
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

export default SomeComponent
 */

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
