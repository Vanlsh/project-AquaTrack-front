import { useForm } from "react-hook-form";
import styles from "./SignUpForm.module.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schemaValidation = Yup.object().shape({
  email: Yup.string().email("Must be a valid email!").required("Required"),
  password: Yup.string()
    .min(5, "Too short")
    .max(25, "Too long")
    .required("Required"),
  repeatpassword: Yup.string()
    .min(5, "Too short")
    .max(25, "Too long")
    .required("Required"),
});

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({ resolver: yupResolver(schemaValidation) });

  const submitForm = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.signUpComponent}>
      <form onSubmit={handleSubmit(submitForm)}>
        <h2 className={styles.signUpTitle}>Sign Up</h2>
        <div className={styles.signUpForm}>
          <label className={styles.signUpLabel}>
            Email
            <input
              className={styles.signUpInput}
              {...register("email")}
              placeholder="Enter you email"
            />
          </label>

          <label className={styles.signUpLabel}>
            Password
            <input
              className={styles.signUpInput}
              {...register("password")}
              placeholder="Enter your password"
            />
          </label>

          <label className={styles.signUpLabel}>
            Repeat password
            <input
              className={styles.signUpInput}
              {...register("repeatpassword")}
              placeholder="Repeat password"
            />
          </label>
        </div>
        <button className={styles.signUpBtn} type="submit">
          {" "}
          Sign Up{" "}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
