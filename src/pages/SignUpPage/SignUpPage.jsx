import SignUpForm from "../../components/SignUpForm/SignUpForm";
import SignFormWrapper from "../../components/SignFromWrapper/SignFormWrapper";
import SignFormFooter from "../../components/SignFormFooter/SignFormFooter";

const SignUpPage = () => {
  return (
    <SignFormWrapper>
      <SignUpForm />
      <SignFormFooter
        text="Already have account? "
        link="/signin"
        linkName="Sing In"
      />
    </SignFormWrapper>
  );
};

export default SignUpPage;
