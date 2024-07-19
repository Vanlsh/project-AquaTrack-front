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
import { selectUser, selectUserPhoto } from "../../redux/auth/selectors.js";
import css from "./UserSettingsForm.module.css";
import svg from "../../assets/icons.svg";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const UserSettingsForm = () => {
  const { t } = useTranslation();
  const [waterIntake, setWaterIntake] = useState(0);
  const dispatch = useDispatch();
  // const [userName, setUserName] = useState("");
  // const [userEmail, setUserEmail] = useState("");
  // const [weight, setWeight] = useState(0);
  // const [exerciseTime, setExerciseTime] = useState(0);
  // const [genderIndentity, setGenderIndentity] = useState("");
  // const [waterConsumption, setWaterConsumption] = useState(0);

  const user = useSelector(selectUser);

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
    console.log(calcWaterIntake);
  }, [watchActiveTime, watchName, watchGender, watchWeight]);

  const onSubmit = (data) => {
    const { email, ...payload } = data;
    dispatch(updateUserProfile(payload));
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
        <img
          src={user.photo || "/img/avatar-placeholder.jpg"}
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
                {/*{t("women")}*/}
                Woman
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
                {/*{t("men")}*/}
                Man
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
                    placeholder="Enter your name"
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

              {/*<input*/}
              {/*  className={css.inputBox}*/}
              {/*  {...register("name")}*/}
              {/*  placeholder="Enter your name"*/}
              {/*  onChange={(e) => {*/}
              {/*    let value = e.target.value;*/}
              {/*    const regex = /^[A-Za-zА-Яа-яЇїІіЄєҐґ]*$/;*/}
              {/*    if (regex.test(value)) {*/}
              {/*      setUserName(value);*/}
              {/*      setValue("youName", e.target.value);*/}
              {/*    }*/}
              {/*    if (value === "") {*/}
              {/*      setUserName("");*/}
              {/*    }*/}
              {/*  }}*/}
              {/*  onBlur={(e) => {*/}
              {/*    if (e.target.value === "") {*/}
              {/*      e.target.value = user.name;*/}
              {/*    }*/}
              {/*  }}*/}
              {/*/>*/}
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
                placeholder="Enter your email"
              />
              {/*{errors.email && (*/}
              {/*  <p className={css.errorMessage}>{errors.email.message}</p>*/}
              {/*)}*/}
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
                <span className={css.boldText}>
                  {t("Write down how much water you will drink:")}
                </span>
                <Controller
                  name="dailyWaterConsumption"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className={css.inputBox}
                      // onChange={(e) => {
                      //   let value = e.target.value;
                      //   const regex = /^\d+(\.\d{0,2})?$/;
                      //   if (regex.test(value)) {
                      //     field.onChange(value);
                      //   }
                      //   if (value === "") {
                      //     field.onChange(0);
                      //   }
                      // }}
                      // onFocus={() => {
                      //   if (field.value === 0) {
                      //     field.onChange("");
                      //   }
                      // }}
                      // onBlur={() => {
                      //   if (field.value === "") {
                      //     field.onChange(0);
                      //   }
                      // }}

                      onChange={(e) => {
                        let value = e.target.value;
                        const regex = /^\d+(\.\d{0,2})?$/;

                        // Перевірка регулярним виразом
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
                      // onChange={(e) => {
                      //   let value = e.target.value;
                      //   if (Number(value)) {
                      //     setWaterConsumption(Number(value));
                      //   }
                      //   if (value === "") {
                      //     setWaterConsumption(0);
                      //   }
                      // }}
                      // onFocus={(e) => {
                      //   if (waterConsumption === 0) {
                      //     e.target.value = "";
                      //   }
                      // }}
                      // onBlur={(e) => {
                      //   if (e.target.value === "") {
                      //     e.target.value = user.dailyWaterConsumption;
                      //   }
                      // }}
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
        <button type="submit" className={`${css.submitBtn} ${css.boldTextBtn}`}>
          {t("save")}
        </button>
      </form>
    </>
  );
};

export default UserSettingsForm;
