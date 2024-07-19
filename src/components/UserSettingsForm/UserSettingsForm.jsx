import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  updateUserProfile,
  uploadUserPhoto,
} from "../../redux/auth/operations.js";
import {
  selectIsLoading,
  selectUser,
  selectUserPhoto,
} from "../../redux/auth/selectors.js";
import css from "./UserSettingsForm.module.css";
import svg from "../../assets/icons.svg";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import LoaderComponent from "../LoaderComponent/LoaderComponent.jsx";

const UserSettingsForm = ({ handleClose }) => {
  const { t } = useTranslation();
  const [waterIntake, setWaterIntake] = useState(0);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const user = useSelector(selectUser);
  const avatar = useSelector(selectUserPhoto);

  const schema = yup.object({
    name: yup.string().required(t("nameRequired")),
    weight: yup.number().min(0).typeError("Has to be a number"),
    dailyActiveTime: yup.number().min(0).typeError("Has to be a number"),
    dailyWaterConsumption: yup
      .number()
      .min(0, "Value has to be greater than 0")
      .typeError("Has to be a number"),
  });

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: user.email,
      gender: user.gender,
      name: user.name,
      weight: user.weight,
      dailyActiveTime: user.dailyActiveTime,
      dailyWaterConsumption: user.dailyWaterConsumption,
    },
    mode: "onChange",
  });

  const watchWeight = watch("weight");
  const watchName = watch("name");
  const watchGender = watch("gender");
  const watchActiveTime = watch("dailyActiveTime");

  useEffect(() => {
    let calcWaterIntake;
    const weight = parseInt(watchWeight || 0);
    const activeTime = parseInt(watchActiveTime || 0);
    if (watchGender === "woman") {
      calcWaterIntake = weight * 0.03 + activeTime * 0.4;
    } else {
      calcWaterIntake = weight * 0.04 + activeTime * 0.6;
    }
    setWaterIntake(Math.min(parseFloat(calcWaterIntake), 15).toFixed(2));
  }, [watchActiveTime, watchName, watchGender, watchWeight]);

  const onSubmit = (data) => {
    const { email, ...payload } = data;
    dispatch(updateUserProfile(payload)).then(({ error }) => {
      if (!error) {
        handleClose();
      }
    });
    console.log(payload);
  };

  const handleAvatarChange = (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("avatar", file);
    dispatch(uploadUserPhoto(formData));
  };

  return (
    <>
      <div className={css.userAvatar}>
        {!isLoading ? (
          <img
            src={avatar || "/img/avatar-placeholder.jpg"}
            alt="User's photo"
          />
        ) : (
          <LoaderComponent width={110} height={110} />
        )}
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
                id="woman"
                className={css.radioInput}
                {...register("gender")}
                value="woman"
                checked={watchGender === "woman"}
              />
              <label htmlFor="woman" className={css.ordinaryText}>
                {t("woman")}
              </label>

              <input
                type="radio"
                id="man"
                className={css.radioInput}
                {...register("gender")}
                value="man"
                checked={watchGender === "man"}
              />
              <label htmlFor="man" className={css.ordinaryText}>
                {t("man")}
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
              <Controller
                render={({ field }) => (
                  <input
                    {...field}
                    className={css.inputBox}
                    placeholder={t("placeholderName")}
                    onChange={(e) => {
                      let value = e.target.value;
                      const regex = /^[A-Za-zА-Яа-яЇїІіЄєҐґ]*$/;
                      if (regex.test(value)) {
                        field.onChange(value);
                      }
                    }}
                  />
                )}
                name="name"
                control={control}
              />

              {errors.name && (
                <p className={css.errorMessage}>{errors.name.message}</p>
              )}
            </label>

            <label>
              <span className={css.boldText}>{t("email")}</span>
              <input
                disabled
                {...register("email")}
                className={css.inputBox}
                placeholder={t("placeholderEmail")}
              />
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
              <Controller
                name="weight"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className={css.inputBox}
                    onChange={(e) => {
                      let value = e.target.value;
                      if (value === "" || Number(value)) {
                        field.onChange(value);
                      }
                    }}
                    onFocus={() => {
                      if (field.value === 0) {
                        field.onChange("");
                      }
                    }}
                    onBlur={() => {
                      if (field.value === "") {
                        field.onChange(0);
                      }
                    }}
                  />
                )}
              />
              {errors.weight && (
                <p className={css.errorMessage}>{errors.weight.message}</p>
              )}
            </label>

            <label>
              <span className={css.ordinaryText}>{t("activeSportsTime")}</span>
              <Controller
                name="dailyActiveTime"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className={css.inputBox}
                    onChange={(e) => {
                      let value = e.target.value;
                      if (value === "" || Number(value)) {
                        field.onChange(value);
                      }
                    }}
                    onFocus={() => {
                      if (field.value === 0) {
                        field.onChange("");
                      }
                    }}
                    onBlur={() => {
                      if (field.value === "") {
                        field.onChange(0);
                      }
                    }}
                  />
                )}
              />

              {errors.dailyActiveTime && (
                <p className={css.errorMessage}>
                  {errors.dailyActiveTime.message}
                </p>
              )}
            </label>

            <div className={css.consumeWater}>
              <p className={css.ordinaryText}>
                {t("requiredWaterAmount")}&nbsp;
                <span className={css.userNorma}>{waterIntake}&nbsp;L</span>
              </p>

              <label>
                <span className={css.boldText}>{t("recordWaterIntake")}</span>
                <Controller
                  name="dailyWaterConsumption"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className={css.inputBox}
                      onChange={(e) => {
                        let value = e.target.value;
                        const regex = /^\d+(\.\d{0,2})?$/;

                        if (value === "" || regex.test(value)) {
                          field.onChange(value);
                        }
                      }}
                      onFocus={() => {
                        if (field.value === 0 || field.value === "0") {
                          field.onChange("");
                        }
                      }}
                      onBlur={() => {
                        if (field.value === "" || field.value === "0") {
                          field.onChange(0);
                        }
                      }}
                    />
                  )}
                />
                {errors.dailyWaterConsumption && (
                  <p className={css.errorMessage}>
                    {errors.dailyWaterConsumption.message}
                  </p>
                )}
              </label>
            </div>
          </div>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          // className={
          //   isLoading
          //     ? `${css.submitFormBtnDisabled}`
          //     : `${css.submitBtn} ${css.boldTextBtn}`
          // }
          className={`${css.submitBtn} ${css.boldTextBtn}`}
        >
          {!isLoading ? t("save") : <LoaderComponent height={56} width={56} />}
        </button>
      </form>
    </>
  );
};

export default UserSettingsForm;
