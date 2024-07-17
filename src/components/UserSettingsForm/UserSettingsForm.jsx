import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import css from "./UserSettingsForm.module.css";
import svg from "../../assets/icons.svg";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const UserSettingsForm = () => {
  const { t } = useTranslation();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [weight, setWeight] = useState(0);
  const [exerciseTime, setExerciseTime] = useState(0);

  const schema = yup.object().shape({
    avatar: yup.mixed().required(t("avatarRequired")),
    gender: yup.string().required(t("genderRequired")),
    yourName: yup.string().required(t("nameRequired")),
    yourEmail: yup
      .string()
      .email(t("invalidEmail"))
      .required(t("emailRequired")),
    yourWeight: yup
      .number()
      .positive(t("positiveWeight"))
      .required(t("weightRequired")),
    yourActiveTime: yup
      .number()
      .positive(t("positiveActiveTime"))
      .required(t("activeTimeRequired")),
    yourDayWaterConsumption: yup
      .number()
      .positive(t("positiveWaterConsumption"))
      .required(t("waterConsumptionRequired")),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    reset();
    setAvatarPreview(null);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const calculateWaterIntake = (weight, exerciseTime) => {
    const waterIntake = weight * 0.03 + exerciseTime * 0.5;
    return Math.min(waterIntake, 15).toFixed(2);
  };

  return (
    <>
      <div className={css.userAvatar}>
        <img
          src={avatarPreview || "/img/avatar-placeholder.jpg"}
          alt="User's photo"
        />
        <label>
          <div className={css.uploadContainer}>
            <svg className={css.icon}>
              <use xlinkHref={svg + "#icon-upload"}></use>
            </svg>
            <span className={css.ordinaryText}>{t("Upload a photo")}</span>
          </div>
          <input
            className={css.hideBtn}
            type="file"
            {...register("avatar")}
            onChange={handleAvatarChange}
          />
          {errors.avatar && <p>{errors.avatar.message}</p>}
        </label>
      </div>
      <div className={css.langButton}>
        <p>{t("changeLanguage")}</p>
        <LanguageSwitcher />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={css.userSettingForm}>
        <div className={css.genderContainer}>
          <label className={css.genderIdentity}>
            <span className={css.boldText}>{t("genderIdentity")}</span>
            <div className={css.radioContainer}>
              <input
                type="radio"
                id="women"
                className={css.radioInput}
                {...register("gender")}
                value="women"
                defaultChecked
              />
              <label htmlFor="women" className={css.ordinaryText}>
                {t("women")}
              </label>

              <input
                type="radio"
                id="men"
                className={css.radioInput}
                {...register("gender")}
                value="men"
              />
              <label htmlFor="men" className={css.ordinaryText}>
                {t("men")}
              </label>
            </div>
            {errors.gender && (
              <p className={css.errorMessage}>{errors.gender.message}</p>
            )}
          </label>
        </div>

        <div className={css.userPreferences}>
          <div className={css.formNameEmail}>
            <label>
              <span className={css.boldText}>{t("yourName")}</span>
              <input
                {...register("yourName")}
                className={css.inputBox}
                placeholder="Enter your name"
              />

              {errors.yourName && (
                <p className={css.errorMessage}>{errors.yourName.message}</p>
              )}
            </label>

            <label>
              <span className={css.boldText}>{t("email")}</span>
              <input
                {...register("yourEmail")}
                className={css.inputBox}
                placeholder="Enterer your email"
              />
              {errors.yourEmail && (
                <p className={css.errorMessage}>{errors.yourEmail.message}</p>
              )}
            </label>

            <div className={css.formula}>
              <p className={css.boldText}>{t("dailyNorm")}</p>
              <div className={css.formulaDescription}>
                <p className={css.ordinaryText}>
                  <span>{t("forWoman")} </span>
                  <span className={css.formulaExpression}>
                    V=(M*0,03) + (T*0,4)
                  </span>
                </p>
                <p className={css.ordinaryText}>
                  <span>{t("forMan")} </span>
                  <span className={css.formulaExpression}>
                    V=(M*0,04) + (T*0,6)
                  </span>
                </p>
              </div>
              <p className={css.ordinaryText}>
                <span className={css.formulaExpression}>*&nbsp;</span>
                <span className={css.formulaDescriptionText}>
                  {t("formulaExplanation")}
                </span>
              </p>
              <p className={css.ordinaryText}>
                <span className={css.temporarySymbol}>!&nbsp;</span>
                {/*Put svg ion*/}
                {t("activeTime")}
              </p>
            </div>
          </div>

          <div className={css.formWeightTime}>
            <label>
              <span className={css.ordinaryText}>{t("yourWeight")}</span>
              <input
                {...register("yourWeight")}
                className={css.inputBox}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                onFocus={() => setWeight(weight === 0 ? "" : weight)}
                onBlur={() => setWeight(weight === "" ? 0 : weight)}
              />
              {errors.yourWeight && (
                <p className={css.errorMessage}>{errors.yourWeight.message}</p>
              )}
            </label>

            <label>
              <span className={css.ordinaryText}>{t("activeSportsTime")}</span>
              <input
                {...register("yourActiveTime")}
                className={css.inputBox}
                value={exerciseTime}
                onChange={(e) => setExerciseTime(Number(e.target.value))}
                onFocus={() =>
                  setExerciseTime(exerciseTime === 0 ? "" : exerciseTime)
                }
                onBlur={() =>
                  setExerciseTime(exerciseTime === "" ? 0 : exerciseTime)
                }
              />

              {errors.yourActiveTime && (
                <p className={css.errorMessage}>
                  {errors.yourActiveTime.message}
                </p>
              )}
            </label>

            <div className={css.consumeWater}>
              <p className={css.ordinaryText}>
                {t("requiredWaterAmount")}&nbsp;
                <span className={css.userNorma}>
                  {calculateWaterIntake(weight, exerciseTime)} L
                </span>
              </p>

              <label>
                <span className={css.boldText}>
                  {t("Write down how much water you will drink:")}
                </span>
                <input
                  {...register("yourDayWaterConsumption")}
                  className={css.inputBox}
                />
                {errors.yourDayWaterConsumption && (
                  <p className={css.errorMessage}>
                    {errors.yourDayWaterConsumption.message}
                  </p>
                )}
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className={`${css.submitBtn} ${css.boldTextBtn}`}>
          {t("save")}
        </button>
      </form>
    </>
  );
};

export default UserSettingsForm;
