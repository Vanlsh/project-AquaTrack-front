import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import css from "./WelcomeSection.module.css";

const WelcomeSection = () => {
  return (
    <div className={css.welcomeSection}>
      <Logo />
      <div className={css.welcomeSectionContainer}>
        <p className={css.welcomeSectionDescribe}>
          Record daily water intake and track
        </p>
        <h1 className={css.welcomeSectionTitle}>Water consumption tracker</h1>
        <div className={css.welcomeSectionLinks}>
          <Link
            to={`/signup`}
            className={`${css.welcomeSectionLink} ${css.welcomeSectionLinkSignup}`}
          >
            Try tracker
          </Link>
          <Link
            to={`/signin`}
            className={`${css.welcomeSectionLink} ${css.welcomeSectionLinkSignin}`}
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
