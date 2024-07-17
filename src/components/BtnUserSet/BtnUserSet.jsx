import React, { useCallback } from 'react'
import css from './BtnUserSet.module.css'
import { useModal } from '../../hooks/useModal';
import UserSettingsModal from '../UserSettingsModal/UserSettingsModal';
import svgSprite from "../../assets/icons.svg";

const BtnUserSet = () => {
    const setModal = useModal();
    
      const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

        const setGoalModal = useCallback(() => {
    setModal(<UserSettingsModal  onClose={closeModal} />);
        }, [setModal, closeModal]);
    
    
  return (
    
      <button type="button" className={css.btnSet}  onClick={setGoalModal}>
          <svg className={css.plus}>
            <use xlinkHref={svgSprite + "#icon-plus"} />
          </svg>
          <h2 className={css.btnTextSet}>Set your norm</h2>
        </button>
    
  )
}

export default BtnUserSet
