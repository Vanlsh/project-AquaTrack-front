import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import css from "./WaterForm.module.css";
import clsx from "clsx";
import svgSprite from "../../assets/icons.svg";
import { useDispatch } from "react-redux";
import { addWater, updateWaterIntakeRecord } from "../../redux/water/operations";

const validationSchema = Yup.object().shape({
  recordingTime: Yup.string()
    .required("Recording time is required")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format, use HH:MM"),
  waterValue: Yup.number()
    .required("Water value is required")
    .min(50, "Water value must be greater than or equal to 50")
    .max(5000, "Water value must be less than or equal to 5000"),
});

const WaterForm = ({ operationType, editTime, waterPortion, waterID, handleClose }) => {
  const { t } = useTranslation();
  const [waterAmount, setWaterAmount] = useState(waterPortion);
  const dispatch = useDispatch();

  const formatTimeFromMillis = (millis) => {
    const date = new Date(millis);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formattedTime = formatTimeFromMillis(editTime);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      recordingTime: formattedTime,
      waterValue: waterAmount.toString(),
    },
  });

  const onSubmit = (data) => {
    const recordingTimeInMillis = convertTimeToMillis(data.recordingTime);
    console.log({
      ...data,
      recordingTimeInMillis,
      waterValue: parseInt(data.waterValue),
    });

    const addWaterValue = {
        "amount": waterAmount,
        "date": `${recordingTimeInMillis}`,
    }

    const editWaterValue = {
      waterID,
      "amount": waterAmount,
    }

    switch (operationType) {
      case "add":
        dispatch(addWater(addWaterValue));
        break;
      case "edit":
        dispatch(updateWaterIntakeRecord(editWaterValue));
        break;
    }

    handleClose();
  };

  const FormHeader = (operationType) => {
    switch (operationType) {
      case "add":
        return <p className={css.FormHeader}>{t("chooseValue")}</p>;
      case "edit":
        return <p className={css.FormHeader}>{t("correctData")}</p>;
      default:
        return <p className={css.FormHeader}>{t("addWater")}</p>;
    }
  };

  const handleWaterAmountChange = (amount) => {
    setWaterAmount(amount);
    setValue("waterValue", amount.toString());
  };

  const convertTimeToMillis = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.getTime();
  };

  const isMinusButtonDisabled = waterAmount === 50;
  const isPlusButtonDisabled = waterAmount === 5000;

  return (
    <form className={css.WaterForm} onSubmit={handleSubmit(onSubmit)}>
      {FormHeader(operationType)}
      <p className={css.AmountOfWater}>{t("waterAmount")}</p>
      <div className={css.TapAddWaterWrapper}>
        <button
          type="button"
          className={css.TapAddWater}
          onClick={() => handleWaterAmountChange(Math.max(waterAmount - 50, 0))}
          disabled={isMinusButtonDisabled}
        >
          <svg>
            <use xlinkHref={svgSprite + "#icon-remove"}></use>
          </svg>
        </button>
        <p className={css.TapAddWaterValue}>
          {waterAmount} {t("ml")}
        </p>
        <button
          type="button"
          className={css.TapAddWater}
          onClick={() => handleWaterAmountChange(waterAmount + 50)}
          disabled={isPlusButtonDisabled}
        >
          <svg>
            <use xlinkHref={svgSprite + "#icon-add"}></use>
          </svg>
        </button>
      </div>

      <label className={css.RecordingTimeLabel}>
        {t("recordTime")}
        <Controller
          name="recordingTime"
          control={control}
          defaultValue={formattedTime}
          render={({ field }) => (
            <input {...field} type="text" className={clsx(css.RecordingTime)} placeholder="HH:MM"/>
          )}
        />
        {errors.recordingTime && (
          <p className={css.Error}>{errors.recordingTime.message}</p>
        )}
      </label>
      <label className={css.WaterValueLabel}>
        {t("enterWaterValue")}
        <Controller
          name="waterValue"
          control={control}
          defaultValue={waterAmount.toString()}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              value={waterAmount || ""}
              onChange={(e) => handleWaterAmountChange(Number(e.target.value))}
              className={css.WaterValue}
            />
          )}
        />
        {errors.waterValue && (
          <p className={css.Error}>{errors.waterValue.message}</p>
        )}
      </label>
      <button type="submit" className={css.SaveBtn}>
        {t("save")}
      </button>
    </form>
  );
};

export default WaterForm;
