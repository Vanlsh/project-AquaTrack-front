import { useDispatch } from 'react-redux';
import css from './BtnDelete.module.css';
import { useState } from 'react';
import { deleteWaterIntakeRecord } from '../../redux/water/operations.js';
import { useTranslation } from 'react-i18next';
// import LoaderComponent from '../LoaderComponent/LoaderComponent.jsx';

const BtnDelete = ({ handleClose, id }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    
    const handleDelete = () => {
        setIsLoading(true);
        dispatch(deleteWaterIntakeRecord(id)).then(({ error }) => {
            if (!error) {
             handleClose();   
            }
        });
        setIsLoading(false);
    };
    
    return (
        <button
            type="button"
            onClick={handleDelete}
            // className={!isLoading ? `${css.btnDelete}` : `${css.btnDeleteDisabled}`}
            className={css.btnDelete}
            disabled={isLoading}>
            {t("delete")}
            {/* {isLoading ? <LoaderComponent height={44} width={44} /> : t("delete")} */}
        </button>
    );
};

export default BtnDelete;