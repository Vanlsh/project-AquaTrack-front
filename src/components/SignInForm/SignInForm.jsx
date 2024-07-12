import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// @ts-ignore
import svgSprite from "../../assets/icons.svg";
import styles from "./SignInForm.module.css";

const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email adress!")
    .required("Email is required"),
  password: yup
    .string()
    .min(5, "Password is too short")
    .max(25, "Password is too long")
    .required("Password is required"),
});

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (d) => {
    //TODO dispatch(login)
    console.log(d);
  };

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className={styles.signInForm} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.signInFormTitle}>Sign In</h1>
      <div className={styles.signInFormInputWrapper}>
        <label className={styles.signInFormLabel}>
          Email
          <input
            type="email"
            className={
              errors.email?.message
                ? `${styles.signInFormInput} ${styles.signInFormInputError}`
                : `${styles.signInFormInput}`
            }
            {...register("email")}
            placeholder="Enter you email"
          />
          <p className={styles.signInFormInputErrorMessage}>
            {errors.email?.message}
          </p>
        </label>

        <label className={styles.signInFormLabel}>
          Password
          <div className={styles.signInFormIconInputWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              className={
                errors.password?.message
                  ? `${styles.signInFormInput} ${styles.signInFormInputError}`
                  : `${styles.signInFormInput}`
              }
              {...register("password")}
              placeholder="Enter your password"
            />

            <button
              className={styles.signInFormIconButton}
              type="button"
              onMouseDown={handleClick}
              onMouseUp={handleClick}
            >
              {showPassword === false ? (
                <svg className={styles.signInFormInputIcon}>
                  <use xlinkHref={svgSprite + "#icon-eye-off"} />
                </svg>
              ) : (
                <svg className={styles.signInFormInputIcon}>
                  <use xlinkHref={svgSprite + "#icon-eye"} />
                </svg>
              )}
            </button>
          </div>
          <p className={styles.signInFormInputErrorMessage}>
            {errors.password?.message}
          </p>
        </label>
      </div>
      <button className={styles.signInFormButton} type="submit">
        Sing In
      </button>
    </form>
  );
};

export default SignInForm;
