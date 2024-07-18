import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import svgSprite from "../../assets/icons.svg";
import { logIn } from "../../redux/auth/operations";
import { selectIsLoading } from "../../redux/auth/selectors.js";
import styles from "./SignInForm.module.css";
import { useTranslation } from "react-i18next";
import SignInWithGoogleBtn from "../SignInWithGoogleBtn/SignInWithGoogleBtn.jsx";

const SignInForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const schema = yup.object({
    email: yup
      .string()
      .email(t("enterValidEmail"))
      .required(t("emailRequired")),
    password: yup
      .string()
      .min(5, t("passwordTooShort"))
      .max(25, t("passwordTooLong"))
      .required(t("passwordRequired")),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    dispatch(logIn(data));
    //! reset form
  };

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className={styles.signInForm} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.signInFormTitle}>{t("signInTitle")}</h1>
      <div className={styles.signInFormInputWrapper}>
        <label className={styles.signInFormLabel}>
          {t("email")}
          <input
            type="email"
            className={clsx(styles.signInFormInput, {
              [styles.signInFormInputError]: errors.email?.message,
            })}
            {...register("email")}
            placeholder={t("enterEmail")}
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
          {t("password")}
          <div className={styles.signInFormIconInputWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              className={clsx(styles.signInFormInput, {
                [styles.signInFormInputError]: errors.password?.message,
              })}
              {...register("password")}
              placeholder={t("enterPassword")}
            />

            <button
              className={styles.signInFormIconButton}
              type="button"
              onClick={handleClick}
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
        {isLoading ? "Loading..." : t("signIn")}
      </button>
      <SignInWithGoogleBtn/>
    </form>
  );
};

export default SignInForm;
