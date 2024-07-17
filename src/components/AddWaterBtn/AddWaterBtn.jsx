import React, { useCallback } from 'react'
import css from './AddWaterBtn.module.css'
import { useModal } from '../../hooks/useModal';
import svgSprite from "../../assets/icons.svg";
import WaterModal from '../WaterModal/WaterModal';

const AddWaterBtn = () => {
    const setModal = useModal();
    
      const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const openModal = useCallback(() => {
    setModal(<WaterModal onClose={closeModal} />);
  }, [setModal, closeModal]);
    
    
  return (
    <button type="button" className={css.btnAdd} onClick={openModal}>
      <svg className={css.plus}>
        <use xlinkHref={svgSprite + "#icon-plus"} />
      </svg>
      <h2 className={css.btnText}>Add water</h2>
    </button>
  )
}

export default AddWaterBtn

