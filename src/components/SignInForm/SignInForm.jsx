import { useForm } from "react-hook-form";
import styles from "./SignInForm.module.css";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";

const SignInForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(logIn(data));
    // reset();
  };

  return (
    <form className={styles.signInForm} onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign In</h1>
      <div className={styles.signInFormInputWrapper}>
        <label className={styles.signInFormLabel}>
          Email
          <input
            className={styles.signInFormInput}
            {...register("email")}
            placeholder="Enter you email"
          />
        </label>
        <label className={styles.signInFormLabel}>
          Password
          <input
            className={styles.signInFormInput}
            {...register("password")}
            placeholder="Enter your password"
          />
        </label>
      </div>
      <button type="submit">Sing In</button>
    </form>
  );
};

export default SignInForm;
