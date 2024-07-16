import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import css from "./WaterForm.module.css";
import clsx from 'clsx';
import svgSprite from "../../assets/icons.svg";
import { useDispatch } from 'react-redux';

const validationSchema = Yup.object().shape({
    recordingTime: Yup.string().required('Recording time is required').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
    waterValue: Yup.number().required('Water value is required').min(0, 'Water value must be greater than or equal to 0').max(5000, 'Water value must be less than or equal to 5000'),
});

const WaterForm = ({ operationType, formTime, portionOfWater, handleClose }) => {
    const dispatch = useDispatch();

    const [waterAmount, setWaterAmount] = useState(portionOfWater);

    const formatCurrentTime = () => {
        if (!(formTime instanceof Date) || isNaN(formTime.getTime())) {
            return '00:00';
        }
        const now = formTime;
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const currentTime = formatCurrentTime();

    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            recordingTime: currentTime,
            waterValue: waterAmount.toString()
        }
    });

    const onSubmit = data => {
        const recordingTimeInMillis = convertTimeToMillis(data.recordingTime);
        console.log({ ...data, recordingTimeInMillis, waterValue: parseInt(data.waterValue, 10) });
        switch (operationType) {
            case "add":
                dispatch(addWater(FormData));
               break;
            case "edit":
                dispatch(updateWaterIntakeRecord());
                break;
            default:
                return;
        }
        handleClose();
    };

    const FormHeader = (operationType) => {
        switch (operationType) {
            case "add":
                return <p className={css.FormHeader}>Choose a value</p>;
            case "edit":
                return <p className={css.FormHeader}>Correct entered data</p>;
            default:
                return <p className={css.FormHeader}>Add water</p>;
        }
    };

    const handleWaterAmountChange = (amount) => {
        setWaterAmount(amount);
        setValue('waterValue', amount.toString());
    };

    const convertTimeToMillis = (timeString) => {
        const [hours, minutes] = timeString.split(':').map(Number);
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        return date.getTime();
    };

    const isMinusButtonDisabled = waterAmount === 0;
    const isPlusButtonDisabled = waterAmount === 5000;

    return (
        <form className={css.WaterForm} onSubmit={handleSubmit(onSubmit)}>

            {FormHeader(operationType)}
            <p className={css.AmountOfWater}>Amount of water</p>
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
                <p className={css.TapAddWaterValue}>{waterAmount} ml</p>
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

            <label className={css.RecordingTimeLabel}>Recording time:
                <Controller
                    name="recordingTime"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="text"
                            className={clsx(css.RecordingTime)}
                        />
                    )}
                />
                {errors.recordingTime && <p className={css.Error}>{errors.recordingTime.message}</p>}
            </label>
            <label className={css.WaterValueLabel}>Enter the value of the water used:
                <Controller
                    name="waterValue"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="number"
                            value={waterAmount}
                            onChange={(e) => handleWaterAmountChange(Number(e.target.value))}
                            className={css.WaterValue}
                        />
                    )}
                />
                {errors.waterValue && <p className={css.Error}>{errors.waterValue.message}</p>}
            </label>
            <button type="submit" className={css.SaveBtn}>Save</button>
        </form>
    );
};

export default WaterForm;
