import css from "./SignInWithGoogleBtn.module.css";
import svgSprite from "../../assets/icons.svg";

const SignInWithGoogleBtn = () => {
  return (
    <>
      <div className={css.line}></div>
      <div className={css.signInWithGoogleBtnContainer}>
        <a className={css.loginWithGoogleBtn} href="#">
          <svg width="20" height="20">
            <use xlinkHref={svgSprite + "#icon-google"} />
          </svg>{" "}
          <span className={css.googleBtnText}>Sign in with Google</span>
        </a>
      </div>
    </>
  );
};

export default SignInWithGoogleBtn;
