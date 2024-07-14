import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection.jsx";
import SignFormFooter from "../../components/SignFormFooter/SignFormFooter.jsx";
import SignFormWrapper from "../../components/SignFromWrapper/SignFormWrapper.jsx";
import SignInForm from "../../components/SignInForm/SignInForm.jsx";
import styles from "./SignInPage.module.css";

const SignInPage = () => {
  return (
    <div className={styles.signInPage}>
      <SignFormWrapper>
        <SignInForm />
        <SignFormFooter
          text="Don't have account? "
          link="/signup"
          linkName="Sing Up"
        />
      </SignFormWrapper>
      <div className={styles.signInPageRight}>
        <AdvantagesSection />
      </div>
    </div>
  );
};

export default SignInPage;
