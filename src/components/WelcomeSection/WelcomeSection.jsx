import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import css from "./WelcomeSection.module.css";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";

const WelcomeSection = () => {
  const { t } = useTranslation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div className={css.welcomeSection}>
      <div className={css.header}>
        <Logo />
        <LanguageSwitcher />
      </div>
      <div className={css.welcomeSectionContainer}>
        <p className={css.welcomeSectionDescribe}>{t("recordWater")}</p>
        <h1 className={css.welcomeSectionTitle}>{t("trackerTitle")}</h1>
        <div className={css.welcomeSectionLinks}>
          {isLoggedIn ? (
            <Link
              to={`/tracker`}
              className={`${css.welcomeSectionLink} ${css.welcomeSectionLinkSignup}`}
            >
              {t("checkTracker")}
            </Link>
          ) : (
            <>
              <Link
                to={`/signup`}
                className={`${css.welcomeSectionLink} ${css.welcomeSectionLinkSignup}`}
              >
                {t("tryTracker")}
              </Link>
              <Link
                to={`/signin`}
                className={`${css.welcomeSectionLink} ${css.welcomeSectionLinkSignin}`}
              >
                {t("signIn")}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
