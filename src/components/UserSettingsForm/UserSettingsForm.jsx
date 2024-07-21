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
  selectIsLoadingPhoto,
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
  const isLoadingPhoto = useSelector(selectIsLoadingPhoto);
  const user = useSelector(selectUser);
  const avatar = useSelector(selectUserPhoto);

  const schema = yup.object({
    name: yup.string().required(t("nameRequired")),
    weight: yup
      .number()
      .min(30, t("weightValueGreat"))
      .max(300, t("weightValueLess"))
      .typeError(t("hasToBeANumber")),
    dailyActiveTime: yup
      .number()
      .min(0)
      .max(12, t("activeSportTime"))
      .typeError(t("hasToBeANumber")),
    dailyWaterConsumption: yup
      .number()
      .min(0)
      .max(8, t("dailyWaterConsumption"))
      .typeError(t("hasToBeANumber")),
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
    // eslint-disable-next-line no-unused-vars
    const { photo, ...compareUser } = user;

    const compareUserOrdered = Object.keys(compareUser)
      .sort()
      .reduce((obj, key) => {
        obj[key] = compareUser[key];
        return obj;
      }, {});

    const dataOrdered = Object.keys(data)
      .sort()
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});

    if (JSON.stringify(compareUserOrdered) !== JSON.stringify(dataOrdered)) {
      // eslint-disable-next-line no-unused-vars
      const { email, ...payload } = data;
      dispatch(updateUserProfile(payload)).then(({ error }) => {
        if (!error) {
          handleClose();
        }
      });
    } else {
      handleClose();
    }
  };

  const handleAvatarChange = (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    console.log(e.target.files);
    if (file) {
      formData.append("avatar", file);
      dispatch(uploadUserPhoto(formData));
    }
    // formData.append("avatar", file);
  };

  return (
    <>
      <div className={css.userAvatar}>
        {!isLoadingPhoto ? (
          <img
            src={avatar || "/img/avatar-placeholder.jpg"}
            alt="User's photo"
          />
        ) : (
          <div className={css.loader}>
            <LoaderComponent />
          </div>
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
                      const regex = /^(\d+(\.\d{0,3})?|\.\d{1,3})$/;
                      if (value === "" || regex.test(value)) {
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
                      } else if (field.value.startsWith(".")) {
                        field.onChange("0" + field.value);
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
                      const regex = /^(\d+(\.\d{0,3})?|\.\d{1,3})$/;
                      if (value === "" || regex.test(value)) {
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
                      } else if (field.value.startsWith(".")) {
                        field.onChange("0" + field.value);
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
                <span className={css.userNorma}>
                  {isNaN(waterIntake) ? 0 : waterIntake}&nbsp;L
                </span>
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
                        const regex = /^(\d+(\.\d{0,3})?|\.\d{1,3})$/;
                        if (value === "" || regex.test(value)) {
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
                        } else if (field.value.startsWith(".")) {
                          field.onChange("0" + field.value);
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
          className={`${css.submitBtn} ${css.boldTextBtn}`}
        >
          {t("save")}
          {isLoading && (
            <div className={css.loaderWrapper}>
              <LoaderComponent height={56} width={56} />
            </div>
          )}
        </button>
      </form>
    </>
  );
};

export default UserSettingsForm;
