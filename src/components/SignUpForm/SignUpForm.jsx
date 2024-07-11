import { useDispatch } from "react-redux";

const SignUpForm = () => {
  const dispatch = useDispatch();

    const handleSubmit = (e) => {
      e.preventDefault();
      // const form = e.target;

      dispatch(
        register({
          // email: form.elements.email.value,
          // password: form.elements.password.value,
        })
      );

      // form.reset();
    };

  return <div>SignUpForm</div>;
};

export default SignUpForm;
