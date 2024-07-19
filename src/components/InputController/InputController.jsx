import { useController } from "react-hook-form";

const InputController = (props) => {
  const { field } = useController(props);
  return (
    <div>
      <input {...field} placeholder={props.placeholder} className={props.css} />
    </div>
  );
};

export default InputController;
