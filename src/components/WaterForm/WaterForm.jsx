import css from "./WaterForm.module.css";
import clsx from 'clsx';
import { useForm } from "react-hook-form";

const WaterForm = ({ operationType }) => {
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
    return (
        <form className={css.WaterForm}>
            {FormHeader(operationType)}
            <p className={css.AmountOfWater}>Amount of water</p>
            <div className={css.TapAddWaterWrapper}> 
                <button type="button">-</button>
                 <p>50ml</p>
                 <button type="button">+</button>
            </div>
            
            <label >Recording time:
                <input type="time" />
            </label>
            <label>Enter the value of the water used:
                <input type="number" />
            </label>
            <button type="submit">Save</button>
           
            

        </form>
    )
};
export default WaterForm;