import { Link } from "react-router-dom";
import styles from "./SignFormFooter.module.css";

const SignFormFooter = ({ text, link, linkName }) => {
  return (
    <p className={styles.signFormFooter}>
      {text}
      <Link className={styles.signFormFooterLink} to={link}>
        {linkName}
      </Link>
    </p>
  );
};

export default SignFormFooter;
