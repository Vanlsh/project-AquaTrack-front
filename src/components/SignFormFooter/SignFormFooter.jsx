import { Link } from "react-router-dom";
import styles from "./SignFormFooter.module.css";
import GoogleBtn from "../GoogleBtn/GoogleBtn";

const SignFormFooter = ({ text, link, linkName }) => {
  return (
    <>
      <p className={styles.signFormFooter}>
        {text}
        <Link className={styles.signFormFooterLink} to={link}>
          {linkName}
        </Link>
      </p>
      <p className={styles.or}>- or -</p>
      <GoogleBtn />
    </>
  );
};

export default SignFormFooter;
