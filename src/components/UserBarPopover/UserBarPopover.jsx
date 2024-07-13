import { forwardRef, useCallback, useEffect, useState } from "react";
import svgIcons from "../../assets/icons.svg";
import { useModal } from "../../hooks/useModal.js";
import ModalLogout from "../ModalLogout/ModalLogout.jsx";
import styles from "./UserBarPopover.module.css";

const UserBarPopover = forwardRef(function UserBarPopover(
  { handleOutsideClick },
  ref,
) {
  const windowHeight = window.innerHeight;
  const scrollPosition = window.scrollY;
  // const userBarPopoverRef = useRef(null);
  const [userBarPopoverTopPosition, setUserBarPopoverTopPosition] =
    useState(64);
  const setModal = useModal();

  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const openSettingsModal = useCallback(() => {
    setModal();
  });

  const openLogOutModal = useCallback(() => {
    setModal(<ModalLogout onClose={closeModal} />);
  }, [setModal, closeModal]);

  useEffect(() => {
    const userBarPopoverHeight = ref.current.clientHeight;
    const userBarPopoverBottomPosition =
      ref.current.getBoundingClientRect().bottom;

    if (
      windowHeight - scrollPosition > userBarPopoverHeight &&
      windowHeight - userBarPopoverBottomPosition < userBarPopoverHeight
    ) {
      setUserBarPopoverTopPosition(-8 - userBarPopoverHeight);
    }
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [windowHeight, scrollPosition, ref, handleOutsideClick]);

  return (
    <div
      className={styles.userBarPopover}
      style={{ top: userBarPopoverTopPosition }}
      ref={ref}
    >
      <ul className={styles.userBarPopoverList}>
        <li
          className={styles.userBarPopoverListItem}
          onClick={openSettingsModal}
        >
          <svg className={styles.userBarPopoverIconSettings}>
            <use xlinkHref={svgIcons + "#icon-settings"}></use>
          </svg>
          Settings
        </li>
        <li
          className={`${styles.userBarPopoverListItem} ${styles.userBarPopoverListItemLogOut}`}
          onClick={openLogOutModal}
        >
          <svg className={styles.userBarPopoverIconLogOut}>
            <use xlinkHref={svgIcons + "#icon-log-out"}></use>
          </svg>
          Log Out
        </li>
      </ul>
    </div>
  );
});

export default UserBarPopover;
