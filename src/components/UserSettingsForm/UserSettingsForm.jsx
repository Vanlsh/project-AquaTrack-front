import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { selectUser } from "../../redux/auth/selectors.js";
import css from "./UserSettingsForm.module.css";
import svg from "../../assets/icons.svg";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const UserSettingsForm = () => {
  const { t } = useTranslation();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [userName, setUserName] = useState("");
  // const [userEmail, setUserEmail] = useState("");
  const [weight, setWeight] = useState(0);
  const [exerciseTime, setExerciseTime] = useState(0);
  const [waterIntake, setWaterIntake] = useState(0);
  const [genderIndentity, setGenderIndentity] = useState("");

  const user = useSelector(selectUser);

  const schema = yup.object({
    avatar: yup.mixed().required(t("avatarRequired")),
    gender: yup.string().required(t("genderRequired")),
    yourName: yup.string().required(t("nameRequired")),
    yourWeight: yup.number().min(0).typeError("Has to be a number"),
    yourActiveTime: yup.number().min(0).typeError("Has to be a number"),
    yourDayWaterConsumption: yup
      .number()
      .typeError("Has to be a number")
      .min(0, "Value has to be greater than 0"),
  });

  useEffect(() => {
    setAvatarPreview(user.photo);
    setUserName(user.name);
    // setUserEmail(user.email);
    setWeight(user.weight);
    setExerciseTime(user.dailyActiveTime);
    setGenderIndentity(user.gender);
  }, [user.weight, user.dailyActiveTime, user.gender, user.photo, user.name]);

  useEffect(() => {
    let calcWaterIntake;
    if (genderIndentity === "women") {
      calcWaterIntake = weight * 0.03 + exerciseTime * 0.4;
    } else if (genderIndentity === "men") {
      calcWaterIntake = weight * 0.04 + exerciseTime * 0.6;
    }
    setWaterIntake(Math.min(calcWaterIntake, 15).toFixed(2));
  }, [weight, exerciseTime, genderIndentity]);

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    // reset();
    // setAvatarPreview(null);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
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
            <span className={css.ordinaryText}>{t("uploadPhoto")}</span>
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
                onChange={(e) => {
                  if (e.target.checked) {
                    setGenderIndentity(e.target.value);
                  }
                }}
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
                onChange={(e) => {
                  if (e.target.checked) {
                    setGenderIndentity(e.target.value);
                  }
                }}
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
                value={userName}
                {...register("yourName")}
                className={css.inputBox}
                placeholder="Enter your name"
                onChange={(e) => {
                  let value = String(e.target.value);
                  const regex = /^[A-Za-zА-Яа-яЇїІіЄєҐґ]*$/;
                  if (regex.test(value)) {
                    setUserName(value);
                  }
                  if (value === "") {
                    setUserName("");
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    e.target.value = user.name;
                  }
                }}
              />

              {errors.yourName && (
                <p className={css.errorMessage}>{errors.yourName.message}</p>
              )}
            </label>

            <label>
              <span className={css.boldText}>{t("email")}</span>
              <input
                disabled
                value={user.email}
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
                onChange={(e) => {
                  if (Number(e.target.value)) {
                    setWeight(Number(e.target.value));
                  }
                  if (e.target.value === "") {
                    setWeight(0);
                  }
                }}
                onFocus={(e) => {
                  if (weight === 0) {
                    e.target.value = "";
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    e.target.value = 0;
                  }
                }}
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
                onChange={(e) => {
                  if (Number(e.target.value)) {
                    setExerciseTime(Number(e.target.value));
                  }
                  if (e.target.value === "") {
                    setExerciseTime(0);
                  }
                }}
                onFocus={(e) => {
                  if (exerciseTime === 0) {
                    e.target.value = "";
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    e.target.value = 0;
                  }
                }}
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
                <span className={css.userNorma}>{waterIntake}&nbsp;L</span>
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
