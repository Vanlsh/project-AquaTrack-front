import SignUpForm from "../../components/SignUpForm/SignUpForm";
import SignFormWrapper from "../../components/SignFromWrapper/SignFormWrapper";
import SignFormFooter from "../../components/SignFormFooter/SignFormFooter";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import { useTranslation } from "react-i18next";
import styles from "./SignUpPage.module.css";

const SignUpPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.signUpPage}>
      <SignFormWrapper>
        <SignUpForm />
        <SignFormFooter
          text={t("alreadyHaveAccount")}
          link="/signin"
          linkName={t("signIn")}
        />
      </SignFormWrapper>
      <div className={styles.signUpPageRight}>
        <AdvantagesSection />
      </div>
    </div>
  );
};

export default SignUpPage;
