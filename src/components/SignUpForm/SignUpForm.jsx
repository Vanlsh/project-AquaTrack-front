import { useForm } from "react-hook-form";
import styles from "./SignUpForm.module.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import svgSprite from "../../assets/icons.svg";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/auth/operations";
import { selectIsLoading } from "../../redux/auth/selectors.js";

const schemaValidation = Yup.object({
  email: Yup.string()
    .email("Enter a valid email adress!")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password is too short")
    .max(25, "Password is too long")
    .required("Password is required"),
  repeatpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Reapet password must be values of password")
    .required("Repeat password is required"),
});

const SignUpForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setshowPasswordRepeat] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordRepeatVisibility = () => {
    setshowPasswordRepeat(!showPasswordRepeat);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaValidation) });

  const submitForm = (data) => {
    console.log(data);
    const { email, password } = data;
    dispatch(signUp({ email, password }));
    //! reset form
  };

  return (
    <div className={styles.signUpComponent}>
      <form onSubmit={handleSubmit(submitForm)}>
        <h2 className={styles.signUpTitle}>Sign Up</h2>
        <div className={styles.signUpForm}>
          <label className={styles.signUpLabel}>
            Email
            <input
              className={
                errors.email?.message
                  ? `${styles.signUpInputError}`
                  : `${styles.signUpInput}`
              }
              {...register("email")}
              placeholder="Enter you email"
            />
            {errors.email?.message ? (
              <p className={styles.signUpErrorMessage}>
                {errors.email?.message}
              </p>
            ) : (
              ""
            )}
          </label>

          <label className={styles.signUpLabel}>
            <span>Password</span>
            <span className={styles.signUpPassword}>
              <input
                type={showPassword ? "text" : "password"}
                className={
                  errors.password?.message
                    ? `${styles.signUpInputError}`
                    : `${styles.signUpInput}`
                }
                {...register("password")}
                placeholder="Enter your password"
              />
              <button
                className={styles.passwordIconBtn}
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword === false ? (
                  <svg className={styles.passwordIcon}>
                    <use xlinkHref={svgSprite + "#icon-eye-off"} />
                  </svg>
                ) : (
                  <svg className={styles.passwordIcon}>
                    <use xlinkHref={svgSprite + "#icon-eye"} />
                  </svg>
                )}
              </button>
            </span>
            {errors.password?.message ? (
              <p className={styles.signUpErrorMessage}>
                {errors.password?.message}
              </p>
            ) : (
              ""
            )}
          </label>

          <label className={styles.signUpLabel}>
            <span>Repeat password</span>
            <span className={styles.signUpPassword}>
              <input
                type={showPasswordRepeat ? "text" : "password"}
                className={
                  errors.repeatpassword?.message
                    ? `${styles.signUpInputError}`
                    : `${styles.signUpInput}`
                }
                {...register("repeatpassword")}
                placeholder="Repeat password"
              />
              <button
                className={styles.passwordIconBtn}
                type="button"
                onClick={togglePasswordRepeatVisibility}
              >
                {showPasswordRepeat === false ? (
                  <svg className={styles.passwordIcon}>
                    <use xlinkHref={svgSprite + "#icon-eye-off"} />
                  </svg>
                ) : (
                  <svg className={styles.passwordIcon}>
                    <use xlinkHref={svgSprite + "#icon-eye"} />
                  </svg>
                )}
              </button>
            </span>
            {errors.repeatpassword?.message ? (
              <p className={styles.signUpErrorMessage}>
                {errors.repeatpassword?.message}
              </p>
            ) : (
              ""
            )}
          </label>
        </div>
        <button className={styles.signUpBtn} type="submit">
          {isLoading ? "Loading" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
