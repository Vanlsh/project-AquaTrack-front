import { Link } from "react-router-dom";
import styles from "./SignFormFooter.module.css";

const SignFormFooter = ({ text, link, linkName }) => {
  return (
    <p className={styles.signInFormFooter}>
      {text}
      <Link to={link}>{linkName}</Link>
    </p>
  );
};

export default SignFormFooter;
