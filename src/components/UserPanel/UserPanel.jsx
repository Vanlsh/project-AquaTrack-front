import UserBar from "../UserBar/UserBar.jsx";
import styles from "./UserPanel.module.css";
import { useSelector } from "react-redux";
import { selectUserName } from "../../redux/auth/selectors.js";

const UserPanel = () => {
  const userName = useSelector(selectUserName);

  return (
    <div className={styles.userPanel}>
      <h1 className={styles.userPanelTitle}>
        Hello,{" "}
        <span className={styles.userPanelTitleName}>{`${userName}!`}</span>
      </h1>
      <UserBar name={userName} />
    </div>
  );
};

export default UserPanel;
