import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const schema = yup.object.shape({
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

  const {
    register,
    handleSubmit,
    reset,
    control,
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
    // Приклад простої формули для розрахунку рекомендованої норми споживання води
    return (weight * 0.03 + activeTime * 0.5).toFixed(2);
  };

  return (
    <>
      <div>
        <img src={avatarPreview || "#"} alt="User's photo" />
        <p>Upload a photo</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Your avatar
          <input
            type="file"
            {...register("avatar")}
            onChange={handleAvatarChange}
          />
          {errors.avatar && <p>{errors.avatar.message}</p>}
        </label>

        <label className="genderIdentity">
          Your gender identity
          <div className="radioContainer">
            <input
              type="radio"
              id="women"
              {...register("gender")}
              value="women"
            />
            <label htmlFor="women">Women</label>

            <input type="radio" id="men" {...register("gender")} value="men" />
            <label htmlFor="men">Men</label>
          </div>
          {errors.gender && <p>{errors.gender.message}</p>}
        </label>

        <label>
          Your name
          <br />
          <input {...register("yourName")} />
          {errors.yourName && <p>{errors.yourName.message}</p>}
        </label>

        <label>
          Email
          <br />
          <input {...register("yourEmail")} />
          {errors.yourEmail && <p>{errors.yourEmail.message}</p>}
        </label>

        <label>
          Your weight in kilograms:
          <br />
          <input {...register("yourWeight")} />
          {errors.yourWeight && <p>{errors.yourWeight.message}</p>}
        </label>

        <label>
          The time of active participation in sports (hours):
          <br />
          <input {...register("yourActiveTime")} />
          {errors.yourActiveTime && <p>{errors.yourActiveTime.message}</p>}
        </label>

        <label>
          Write down how much water you will drink (liters):
          <input {...register("yourDayWaterConsumption")} />
          {errors.yourDayWaterConsumption && (
            <p>{errors.yourDayWaterConsumption.message}</p>
          )}
        </label>

        <div>
          <p>
            The required amount of water in liters per day:
            {calculateWaterIntake(50, 1)}{" "}
            {/* Вкажіть початкові значення для демонстрації */}
          </p>
        </div>

        <button type="submit" className="submitBtn">
          Save
        </button>
      </form>
    </>
  );
};

export default UserSettingsForm;
