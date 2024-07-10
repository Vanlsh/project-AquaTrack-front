import { useForm } from "react-hook-form";

const SignInForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (d) => {
    //TODO dispatch(login)
    console.log(d);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Sign In</p>
        <label>
          Email
          <input {...register("email")} placeholder="Enter you email" />
        </label>
        <label>
          Password
          <input {...register("password")} placeholder="Enter your password" />
        </label>
        <button type="submit">Sing In</button>
      </form>
    </>
  );
};

export default SignInForm;
