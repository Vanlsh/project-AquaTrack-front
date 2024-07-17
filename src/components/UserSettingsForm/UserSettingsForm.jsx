import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import css from "./UserSettingsForm.module.css";
import svg from "../../assets/icons.svg";

const schema = yup.object().shape({
  avatar: yup.mixed().required("Avatar is required"),
  gender: yup.string().required("Gender is required"),
  yourName: yup.string().required("Name is required"),
  yourEmail: yup.string().email("Invalid email").required("Email is required"),
  yourWeight: yup
    .number()
    .positive("Weight must be positive")
    .required("Weight is required"),
  yourActiveTime: yup
    .number()
    .positive("Active time must be positive")
    .required("Active time is required"),
  yourDayWaterConsumption: yup
    .number()
    .positive("Water consumption must be positive")
    .required("Water consumption is required"),
});

const UserSettingsForm = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [weight, setWeight] = useState(0);
  const [exerciseTime, setExerciseTime] = useState(0);
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

  const calculateWaterIntake = (weight, activeTime) => {
    // Formula
    return (weight * 0.03 + activeTime * 0.5).toFixed(2);
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
            <span className={css.ordinaryText}>Upload a photo</span>
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
      <form onSubmit={handleSubmit(onSubmit)} className={css.userSettingForm}>
        <div className={css.genderContainer}>
          <label className={css.genderIdentity}>
            <span className={css.boldText}>Your gender identity</span>
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
                Women
              </label>

              <input
                type="radio"
                id="men"
                className={css.radioInput}
                {...register("gender")}
                value="men"
              />
              <label htmlFor="men" className={css.ordinaryText}>
                Men
              </label>
            </div>
            {errors.gender && <p>{errors.gender.message}</p>}
          </label>
        </div>

        <div className={css.userPreferences}>
          <div className={css.formNameEmail}>
            <label>
              <span className={css.boldText}>Your name</span>
              <input
                {...register("yourName")}
                className={css.inputBox}
                placeholder="Enter your name"
              />
              {errors.yourName && <p>{errors.yourName.message}</p>}
            </label>

            <label>
              <span className={css.boldText}>Email</span>
              <input
                {...register("yourEmail")}
                className={css.inputBox}
                placeholder="Enterer your email"
              />
              {errors.yourEmail && <p>{errors.yourEmail.message}</p>}
            </label>

            <div className={css.formula}>
              <p className={css.boldText}>My daily norma</p>
              <div className={css.formulaDescription}>
                <p className={css.ordinaryText}>
                  <span>For woman: </span>
                  <span className={css.formulaExpression}>
                    V=(M*0,03) + (T*0,4)
                  </span>
                </p>
                <p className={css.ordinaryText}>
                  <span>For man: </span>{" "}
                  <span className={css.formulaExpression}>
                    V=(M*0,04) + (T*0,6)
                  </span>
                </p>
              </div>
              <p className={css.ordinaryText}>
                <span className={css.formulaExpression}>*</span>{" "}
                <span className={css.formulaDescriptionText}>
                  V is the volume of the water norm in liters per day, M is your
                  body weight, T is the time of active sports, or another type
                  of activity commensurate in terms of loads (in the absence of
                  these, you must set 0)
                </span>
              </p>
              <p className={css.ordinaryText}>
                <span className={css.temporarySymbol}>! </span>{" "}
                {/*Put svg ion*/}
                Active time in hours
              </p>
            </div>
          </div>

          <div className={css.formWeightTime}>
            <label>
              <span className={css.ordinaryText}>
                Your weight in kilograms:
              </span>
              <input
                {...register("yourWeight")}
                className={css.inputBox}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                onFocus={() => setWeight("")}
              />
              {errors.yourWeight && <p>{errors.yourWeight.message}</p>}
            </label>

            <label>
              <span className={css.ordinaryText}>
                The time of active participation in sports:
              </span>
              <input
                {...register("yourActiveTime")}
                className={css.inputBox}
                value={exerciseTime}
                onChange={(e) => setExerciseTime(Number(e.target.value))}
                onFocus={() => setExerciseTime("")}
              />
              {errors.yourActiveTime && <p>{errors.yourActiveTime.message}</p>}
            </label>

            <div className={css.consumeWater}>
              <p className={css.ordinaryText}>
                The required amount of water in liters per day:&nbsp;
                <span className={css.userNorma}>
                  {calculateWaterIntake(86, 1)} L
                </span>
                {/*Should automatically receive value from*/}
              </p>

              <label>
                <span className={css.boldText}>
                  Write down how much water you will drink:
                </span>
                <input
                  {...register("yourDayWaterConsumption")}
                  className={css.inputBox}
                />
                {errors.yourDayWaterConsumption && (
                  <p>{errors.yourDayWaterConsumption.message}</p>
                )}
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className={`${css.submitBtn} ${css.boldTextBtn}`}>
          Save
        </button>
      </form>
    </>
  );
};

export default UserSettingsForm;
