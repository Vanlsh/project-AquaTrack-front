import UserBar from "../UserBar/UserBar.jsx";
import styles from "./UserPanel.module.css";

const UserPanel = () => {
  //TODO const userName = useSelector((state) => state.user.name);
  const userName = "Nadia";

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
