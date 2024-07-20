import { useCallback } from 'react'
import css from './AddWaterBtn.module.css'
import { useModal } from '../../hooks/useModal';
import svgSprite from "../../assets/icons.svg";
import WaterModal from '../WaterModal/WaterModal';
import { useTranslation } from "react-i18next";
import { parseDateTime } from '../../helpers/parseDate';
import { useParams } from 'react-router-dom';



const AddWaterBtn = () => {
    const setModal = useModal();
  const { t } = useTranslation();
  
  const { date: dateUrl } = useParams();
  const timestampFromUrl = parseDateTime(dateUrl);

  
      const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const openModal = useCallback(() => {
    setModal(<WaterModal onClose={closeModal} operationType={"add"} timestampFromUrl={timestampFromUrl}/>);
  }, [setModal, closeModal]);
    
    
  return (
    <button type="button" className={css.btnAdd} onClick={openModal}>
      <svg className={css.plus}>
        <use xlinkHref={svgSprite + "#icon-plus"} />
      </svg>
      <h2 className={css.btnText}>{t("addWater")}</h2>
    </button>
  )
}

export default AddWaterBtn

