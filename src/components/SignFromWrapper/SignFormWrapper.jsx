import Logo from "../Logo/Logo";
import styles from "./SignFormWrapper.module.css";
const SignFormWrapper = ({ children }) => {
  return (
    <div className={styles.signFormWrapper}>
      <div style={{ position: "absolute", top: "24px", left: "16px" }}>
        <Logo />
      </div>
      <div style={{ width: "100%" }}>{children}</div>
    </div>
  );
};

export default SignFormWrapper;
