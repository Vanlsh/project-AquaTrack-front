import { useTranslation } from "react-i18next";
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
    .min(5, "Must be at least 5 characters long")
    .max(25, "Must be no more than 25 characters")
    .required("Password is required"),
  repeatpassword: Yup.string()
    .oneOf(
      [Yup.ref("password")],
      "There must be the same value as in the password field"
    )
    .required("Repeat password is required"),
});

const SignUpForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setshowPasswordRepeat] = useState(false);

  const schemaValidation = Yup.object({
    email: Yup.string()
      .email(t("enterValidEmail"))
      .required(t("emailRequired")),
    password: Yup.string()
      .min(5, t("passwordTooShort"))
      .max(25, t("passwordTooLong"))
      .required(t("passwordRequired")),
    repeatpassword: Yup.string()
      .oneOf([Yup.ref("password")], t("repeatPasswordMustMatch"))
      .required(t("repeatPasswordRequired")),
  });
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
    const { email, password } = data;
    dispatch(signUp({ email, password }));
    //! reset form
  };

  return (
    <div className={styles.signUpComponent}>
      <form onSubmit={handleSubmit(submitForm)}>
        <h2 className={styles.signUpTitle}>{t("signUpTitle")}</h2>
        <div className={styles.signUpForm}>
          <label className={styles.signUpLabel}>
            {t("email")}
            <input
              className={
                errors.email?.message
                  ? `${styles.signUpInputError}`
                  : `${styles.signUpInput}`
              }
              {...register("email")}
              placeholder={t("enterEmail")}
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
            <span>{t("password")}</span>
            <span className={styles.signUpPassword}>
              <input
                type={showPassword ? "text" : "password"}
                className={
                  errors.password?.message
                    ? `${styles.signUpInputError}`
                    : `${styles.signUpInput}`
                }
                {...register("password")}
                placeholder={t("enterPassword")}
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
            <span>{t("repeatPassword")}</span>
            <span className={styles.signUpPassword}>
              <input
                type={showPasswordRepeat ? "text" : "password"}
                className={
                  errors.repeatpassword?.message
                    ? `${styles.signUpInputError}`
                    : `${styles.signUpInput}`
                }
                {...register("repeatpassword")}
                placeholder={t("repeatPassword")}
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
          {isLoading ? "Loading" : t("signUp")}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
