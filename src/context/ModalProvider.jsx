import { createContext, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import ModalBackdrop from "../components/ModalBackdrop/ModalBackdrop.jsx";
import { ANIMATION } from "../constants.js";

export const ModalContext = createContext();
const modalRoot = document.querySelector("#modal-root");

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);
  const handleSetModal = useCallback((modal = null) => {
    const id = setTimeout(() => {
      setModal(modal);
      clearTimeout(id);
    }, ANIMATION.DURATION);
  }, []);
  return (
    <ModalContext.Provider value={handleSetModal}>
      {children}
      {modal &&
        createPortal(
          <ModalBackdrop onClose={handleSetModal}>{modal}</ModalBackdrop>,
          modalRoot
        )}
    </ModalContext.Provider>
  );
};
