import { useState } from "react";
import { useForm } from "react-hook-form";
// @ts-ignore
import svgSprite from "../../assets/icons.svg";
import styles from "./SignInForm.module.css";

const SignInForm = () => {
  const { register, handleSubmit } = useForm();
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
      <h1>Sign In</h1>
      <div className={styles.signInFormInputWrapper}>
        <label className={styles.signInFormLabel}>
          Email
          <input
            type="email"
            className={styles.signInFormInput}
            {...register("email")}
            placeholder="Enter you email"
          />
        </label>

        <label className={styles.signInFormLabel}>
          Password
          <div className={styles.signInFormIconInputWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              className={styles.signInFormInput}
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
        </label>
      </div>
      <button className={styles.signInFormButton} type="submit">
        Sing In
      </button>
    </form>
  );
};

export default SignInForm;
