import { useCallback } from 'react'
import css from './AddWaterBtn.module.css'
import { useModal } from '../../hooks/useModal';
import svgSprite from "../../assets/icons.svg";
import WaterModal from '../WaterModal/WaterModal';
import { useTranslation } from "react-i18next";

const AddWaterBtn = () => {
    const setModal = useModal();
    const { t } = useTranslation();
  
      const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const openModal = useCallback(() => {
    setModal(<WaterModal onClose={closeModal} operationType={"add"}/>);
  }, [setModal, closeModal]);
    
    
  return (
    <button type="button" className={`${css.btnAdd} third-step`} onClick={openModal}>
      <svg className={css.plus}>
        <use xlinkHref={svgSprite + "#icon-plus"} />
      </svg>
      <h2 className={css.btnText}>{t("addWater")}</h2>
    </button>
  )
}

export default AddWaterBtn

