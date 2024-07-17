import i18next from "i18next";
import { useRef, useState } from "react";
import css from "./LanguageSwitcher.module.css";
import clsx from "clsx";
import svgIcons from "../../assets/icons.svg";
import LanguageSwitcherBar from "../LanguageSwitcherBar/LanguageSwitcherBar";
import { LOCALS } from "../../i18n/constants";
const LanguageSwitcher = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const barPopoverRef = useRef(null);

  const lanString = (lan) => {
    const langs = Object.values(LOCALS);
    const isExist = langs.includes(lan);
    const langRes = isExist ? lan : "en";
    return langRes.toUpperCase();
  };
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClose = (e) => {
    if (barPopoverRef.current && !barPopoverRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className={css.languageSwitcher}>
      <button
        onClick={toggleDropdown}
        className={css.currentLanguage}
        name="openPopover"
      >
        {lanString(i18next.language)}
        <svg className={clsx(css.icon, { [css.isOpen]: isDropdownOpen })}>
          <use xlinkHref={svgIcons + "#icon-chevron-down"}></use>
        </svg>
      </button>
      {isDropdownOpen && (
        <LanguageSwitcherBar onClose={handleClose} ref={barPopoverRef} />
      )}
    </div>
  );
};

export default LanguageSwitcher;
