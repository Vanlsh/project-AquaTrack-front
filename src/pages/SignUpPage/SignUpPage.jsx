import SignUpForm from "../../components/SignUpForm/SignUpForm";
import SignFormWrapper from "../../components/SignFromWrapper/SignFormWrapper";
import SignFormFooter from "../../components/SignFormFooter/SignFormFooter";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import styles from "./SignUpPage.module.css";

const SignUpPage = () => {
  return (
    <div className={styles.signUpPage}>
      <SignFormWrapper>
        <SignUpForm />
        <SignFormFooter
          text="Already have account? "
          link="/signin"
          linkName="Sing In"
        />
      </SignFormWrapper>
      <div className={styles.signUpPageRight}>
        <AdvantagesSection />
      </div>
    </div>
  );
};

export default SignUpPage;
