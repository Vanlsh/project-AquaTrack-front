import { useRef, useState } from "react";
import svgIcons from "../../assets/icons.svg";
import UserBarPopover from "../UserBarPopover/UserBarPopover.jsx";
import styles from "./UserBar.module.css";

const UserBar = ({ name }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const userBarPopoverRef = useRef(null);

  //TODO const userAvatar = useSelector((state) => state.user.avatar);
  const userAvatar = "/img/avatar-placeholder.jpg";

  const handleOutsideClick = (e) => {
    if (e.target.name === "openPopover" && isPopoverOpen === true) {
      return;
    } else {
      if (
        userBarPopoverRef.current &&
        !userBarPopoverRef.current.contains(e.target)
      ) {
        setIsPopoverOpen(false);
      }
    }
  };

  const handlePopover = () => {
    if (userBarPopoverRef.current === null) {
      setIsPopoverOpen(true);
    } else {
      setIsPopoverOpen(false);
    }
  };

  return (
    <div className={styles.userBarWrapper}>
      <button
        className={styles.userBar}
        type="button"
        name="openPopover"
        onClick={handlePopover}
      >
        {name}
        <div
          className={styles.userBarAvatar}
          style={{ backgroundImage: `url(${userAvatar})` }}
        ></div>
        {isPopoverOpen ? (
          <svg className={styles.userBarIcon}>
            <use xlinkHref={svgIcons + "#icon-chevron-up"}></use>
          </svg>
        ) : (
          <svg className={styles.userBarIcon}>
            <use xlinkHref={svgIcons + "#icon-chevron-down"}></use>
          </svg>
        )}
      </button>
      {isPopoverOpen && (
        <UserBarPopover
          handleOutsideClick={handleOutsideClick}
          ref={userBarPopoverRef}
        />
      )}
    </div>
  );
};

export default UserBar;
