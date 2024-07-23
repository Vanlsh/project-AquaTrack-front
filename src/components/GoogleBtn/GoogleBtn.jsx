import css from "./GoogleBtn.module.css";

const GoogleBtn = () => {
  return (
    <a
      className={css.btn}
      //   href="http://localhost:3000/users/google"
      href="https://project-aquatrack-back.onrender.com/users/google"
    >
      Continue with Google
    </a>
  );
};

export default GoogleBtn;
