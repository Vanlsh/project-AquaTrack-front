import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import svgIcons from "../../assets/icons.svg";
import { selectUserPhoto } from "../../redux/auth/selectors.js";
import UserBarPopover from "../UserBarPopover/UserBarPopover.jsx";
import styles from "./UserBar.module.css";

const UserBar = ({ name }) => {
  const { t } = useTranslation();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const userBarPopoverRef = useRef(null);

  const userAvatar = useSelector(selectUserPhoto);
  const avatarPlaceholder = "/img/avatar-placeholder.jpg";

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
    <div className={`${styles.userBarWrapper} four-step`}>
      <button
        className={styles.userBar}
        type="button"
        name="openPopover"
        onClick={handlePopover}
        aria-label={t("openCloseUserPanel")}
      >
        <div className={styles.userBarText}>{name}</div>
        <div
          className={styles.userBarAvatar}
          style={{ backgroundImage: `url(${userAvatar || avatarPlaceholder})` }}
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
