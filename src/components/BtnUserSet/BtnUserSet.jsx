import { useCallback } from 'react'
import css from './BtnUserSet.module.css'
import { useModal } from '../../hooks/useModal';
import UserSettingsModal from '../UserSettingsModal/UserSettingsModal';
import svgSprite from "../../assets/icons.svg";
import { useTranslation } from 'react-i18next';

const BtnUserSet = () => {
  const setModal = useModal();
  const { t } = useTranslation();
    
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
      <h2 className={css.btnTextSet}>{t("SetBtn") }</h2>
        </button>
    
  )
}

export default BtnUserSet
