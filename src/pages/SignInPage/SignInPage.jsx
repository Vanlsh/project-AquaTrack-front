import SignInForm from "../../components/SignInForm/SignInForm.jsx";
import SignFormWrapper from "../../components/SignFromWrapper/SignFormWrapper.jsx";
import Logo from "../../components/Logo/Logo.jsx";
import SignFormFooter from "../../components/SignFormFooter/SignFormFooter.jsx";

const SignInPage = () => {
  return (
    <div>
      <Logo />
      <SignFormWrapper>
        <SignInForm />
        <SignFormFooter
          text="Don't have account?"
          link="/signup"
          linkName="Sing Up"
        />
      </SignFormWrapper>
    </div>
  );
};

export default SignInPage;
