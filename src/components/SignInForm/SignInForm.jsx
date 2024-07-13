import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import svgSprite from "../../assets/icons.svg";
import styles from "./SignInForm.module.css";

const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email address!")
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
            className={clsx(styles.signInFormInput, {
              [styles.signInFormInputError]: errors.email?.message,
            })}
            {...register("email")}
            placeholder="Enter you email"
          />
          {errors.email?.message ? (
            <p className={styles.signInFormInputErrorMessage}>
              {errors.email?.message}
            </p>
          ) : (
            ""
          )}
        </label>

        <label className={styles.signInFormLabel}>
          Password
          <div className={styles.signInFormIconInputWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              className={clsx(styles.signInFormInput, {
                [styles.signInFormInputError]: errors.password?.message,
              })}
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
          {errors.password?.message ? (
            <p className={styles.signInFormInputErrorMessage}>
              {errors.password?.message}
            </p>
          ) : (
            ""
          )}
        </label>
      </div>
      <button className={styles.signInFormButton} type="submit">
        Sing In
      </button>
    </form>
  );
};

export default SignInForm;
