import { useForm } from "react-hook-form";
import styles from "./SignUpForm.module.css";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.signUpComponent}>
      <form onSubmit={handleSubmit(submitForm)}>
        <h2 className={styles.signUpTitle}>Sign Up</h2>
        <div className={styles.signUpForm}>
          <label className={styles.signUpLabel}>
            Email
            <input
              className={styles.signUpInput}
              {...register("email")}
              placeholder="Enter you email"
            />
          </label>

          <label className={styles.signUpLabel}>
            Password
            <input
              className={styles.signUpInput}
              {...register("password")}
              placeholder="Enter your password"
            />
          </label>

          <label className={styles.signUpLabel}>
            Repeat password
            <input
              className={styles.signUpInput}
              {...register("repeat password")}
              placeholder="Repeat password"
            />
          </label>
        </div>
        <button className={styles.signUpBtn} type="submit">
          {" "}
          Sign Up{" "}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
