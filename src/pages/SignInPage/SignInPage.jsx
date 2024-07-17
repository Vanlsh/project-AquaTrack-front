import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection.jsx";
import SignFormFooter from "../../components/SignFormFooter/SignFormFooter.jsx";
import SignFormWrapper from "../../components/SignFromWrapper/SignFormWrapper.jsx";
import SignInForm from "../../components/SignInForm/SignInForm.jsx";
import styles from "./SignInPage.module.css";
import { useTranslation } from "react-i18next";

const SignInPage = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.signInPage}>
      <SignFormWrapper>
        <SignInForm />
        <SignFormFooter
          text={t("noAccount")}
          link="/signup"
          linkName={t("signUp")}
        />
      </SignFormWrapper>
      <div className={styles.signInPageRight}>
        <AdvantagesSection />
      </div>
    </div>
  );
};

export default SignInPage;
