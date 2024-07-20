import css from './BtnDelete.module.css';
import { useTranslation } from 'react-i18next';

const BtnDelete = ({ isLoading, handleDelete }) => {
    const { t } = useTranslation();
    
    return (
        <button
            type="button"
            onClick={() => handleDelete()}
            className={css.btnDelete}
            disabled={isLoading}
        >
            {t("delete")}
        </button>
    );
};

export default BtnDelete;