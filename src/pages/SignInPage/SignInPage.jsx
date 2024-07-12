import SignFormFooter from "../../components/SignFormFooter/SignFormFooter.jsx";
import SignFormWrapper from "../../components/SignFromWrapper/SignFormWrapper.jsx";
import SignInForm from "../../components/SignInForm/SignInForm.jsx";

const SignInPage = () => {
  return (
    <SignFormWrapper>
      <SignInForm />
      <SignFormFooter
        text="Don't have account? "
        link="/signup"
        linkName="Sing Up"
      />
    </SignFormWrapper>
  );
};

export default SignInPage;
