import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { logOut } from "../../redux/auth/operations";
import css from "./BtnLogout.module.css";
import { Link } from "react-router-dom";
// import { selectIsLoading } from "../../redux/auth/selectors.js";
// import LoaderComponent from '../LoaderComponent/LoaderComponent.jsx'

const BtnLogout = ({ handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const isLoading = useSelector(selectIsLoading);

  const handleLogout = () => {
    dispatch(logOut());
    handleClose();
  };

  return (
    <>
      <button type="button" onClick={handleLogout} className={css.btnLogout}>
        <Link to={'/'}>{t("logout")}</Link>
      {/* {isLoading ? <LoaderComponent height={80} width={80} /> : <Link to={'/'}>{t("logout")}</Link>}   */}
    </button>
    </>
  );
};

export default BtnLogout;
