import { forwardRef, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import svgIcons from "../../assets/icons.svg";
import { useModal } from "../../hooks/useModal.js";
import LogOutModal from "../LogOutModal/LogOutModal.jsx";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal.jsx";
import styles from "./UserBarPopover.module.css";
import { useTour } from "@reactour/tour";
import { disableBody } from "../../onboarding/onboardingStyles.js";


const UserBarPopover = forwardRef(function UserBarPopover(
  { handleOutsideClick },
  ref
) {
  const { setIsOpen, setCurrentStep } = useTour();
  const { t } = useTranslation();
  const windowHeight = window.innerHeight;
  const scrollPosition = window.scrollY;
  const [userBarPopoverTopPosition, setUserBarPopoverTopPosition] =
    useState(64);
  const setModal = useModal();

    const startTour = () => {
    setCurrentStep(0); 
    setIsOpen(true); 
    disableBody();
  };

  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const openSettingsModal = useCallback(() => {
    //TODO
    setModal(<UserSettingsModal onClose={closeModal} />),
      [setModal, closeModal];
  });

  const openLogOutModal = useCallback(() => {
    setModal(<LogOutModal onClose={closeModal} />);
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
          {t("settingLink")}
        </li>
        <li className={styles.userBarPopoverListItem} onClick={startTour}>
          <svg className={styles.userBarPopoverIconSettings}>
            <use xlinkHref={svgIcons + "#icon-tour"}></use>
          </svg>
          {t("use")}
        </li>
        <li
          className={`${styles.userBarPopoverListItem} ${styles.userBarPopoverListItemLogOut}`}
          onClick={openLogOutModal}
        >
          <svg className={styles.userBarPopoverIconLogOut}>
            <use xlinkHref={svgIcons + "#icon-log-out"}></use>
          </svg>
          {t("logout")}
        </li>
      </ul>
    </div>
  );
});

export default UserBarPopover;
