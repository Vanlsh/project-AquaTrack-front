import Logo from "../Logo/Logo";
import styles from "./SignFormWrapper.module.css";
const SignFormWrapper = ({ children }) => {
  return (
    <div className={styles.signFormWrapper}>
      <div className={styles.signFormLogoWrapper}>
        <Logo />
      </div>
      <div style={{ width: "100%" }}>{children}</div>
    </div>
  );
};

export default SignFormWrapper;
