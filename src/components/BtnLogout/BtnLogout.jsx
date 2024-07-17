import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { logOut } from "../../redux/auth/operations";
import css from "./BtnLogout.module.css";

const BtnLogout = ({ handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    handleClose();
  };

  return (
    <button type="button" onClick={handleLogout} className={css.btnLogout}>
      {t("logout")}
    </button>
  );
};

export default BtnLogout;
