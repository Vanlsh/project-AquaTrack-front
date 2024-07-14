import UserPanel from "../UserPanel/UserPanel.jsx";
import styles from "./UserBar.module.css";

const UserBar = () => {
  //TODO const userName = useSelector((state) => state.user.name);
  const userName = "Nadia";

  return (
    <div className={styles.userBar}>
      <h1 className={styles.userBarTitle}>
        Hello, <span className={styles.userBarTitleName}>{`${userName}!`}</span>
      </h1>
      <UserPanel name={userName} />
    </div>
  );
};

export default UserBar;
