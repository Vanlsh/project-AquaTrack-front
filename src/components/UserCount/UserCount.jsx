import { useState, useEffect } from "react";
import photo1 from "../../../public/img/userCount/photo1.png";
import photo2 from "../../../public/img/userCount/photo2.png";
import photo3 from "../../../public/img/userCount/photo3.png";
import styles from "./UserCount.module.css";
import { requestUserCount } from "../../api/auth";

const UserCount = () => {
  const [userCount, setUserCount] = useState();

  useEffect(() => {
    async function getCount() {
      try {
        const data = await requestUserCount();
        setUserCount(data.data.count);
      } catch (err) {
        console.log(err.message);
      }
    }
    getCount();
  });

  return (
    <div className={styles.userCountComponent}>
      <ul className={styles.userCountList}>
        <li className={styles.userCountItem}>
          <img src={photo1} alt="user" />
        </li>
        <li className={styles.userCountItem}>
          <img src={photo2} alt="user" />
        </li>
        <li className={styles.userCountItem}>
          <img src={photo3} alt="user" />
        </li>
      </ul>
      <p className={styles.userCountText}>
        Our{" "}
        <span className={styles.userCountTextColor}> {userCount} happy</span>{" "}
        customers
      </p>
    </div>
  );
};

export default UserCount;
