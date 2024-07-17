import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { LOCALS } from "../../i18n/constants";
import { useState } from "react";
import css from "./LanguageSwitcher.module.css";
import { useLocation } from "react-router-dom";

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLanguageChange = (lng) => {
    i18next.changeLanguage(lng);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const isShortForm = location.pathname === "/";
  return (
    <div className={css.languageSwitcher}>
      <button onClick={toggleDropdown} className={css.currentLanguage}>
        {isShortForm ? i18next.language.toUpperCase() : t("language")}
      </button>
      {isDropdownOpen && (
        <div className={css.languageDropdown}>
          <button
            disabled={i18next.language === LOCALS.EN}
            onClick={() => handleLanguageChange(LOCALS.EN)}
            className={css.languageOption}
          >
            {isShortForm ? "En" : "English"}
          </button>
          <button
            disabled={i18next.language === LOCALS.DE}
            onClick={() => handleLanguageChange(LOCALS.DE)}
            className={css.languageOption}
          >
            {isShortForm ? "De" : "Deutsch"}
          </button>
          <button
            disabled={i18next.language === LOCALS.UK}
            onClick={() => handleLanguageChange(LOCALS.UK)}
            className={css.languageOption}
          >
            {isShortForm ? "Uk" : "Українська"}
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;

{
  /* <svg
  xmlns="http://www.w3.org/2000/svg"
  id="flag-icons-de"
  viewBox="0 0 512 512"
>
  <path fill="#fc0" d="M0 341.3h512V512H0z" />
  <path fill="#000001" d="M0 0h512v170.7H0z" />
  <path fill="red" d="M0 170.7h512v170.6H0z" />
</svg>; */
}
{
  /* <svg
  xmlns="http://www.w3.org/2000/svg"
  id="flag-icons-ua"
  viewBox="0 0 512 512"
>
  <g fill-rule="evenodd" stroke-width="1pt">
    <path fill="gold" d="M0 0h512v512H0z" />
    <path fill="#0057b8" d="M0 0h512v256H0z" />
  </g>
</svg>; */
}
{
  /* <svg
  xmlns="http://www.w3.org/2000/svg"
  id="flag-icons-gb"
  viewBox="0 0 512 512"
>
  <path fill="#012169" d="M0 0h512v512H0z" />
  <path
    fill="#FFF"
    d="M512 0v64L322 256l190 187v69h-67L254 324 68 512H0v-68l186-187L0 74V0h62l192 188L440 0z"
  />
  <path
    fill="#C8102E"
    d="m184 324 11 34L42 512H0v-3zm124-12 54 8 150 147v45zM512 0 320 196l-4-44L466 0zM0 1l193 189-59-8L0 49z"
  />
  <path fill="#FFF" d="M176 0v512h160V0zM0 176v160h512V176z" />
  <path fill="#C8102E" d="M0 208v96h512v-96zM208 0v512h96V0z" />
</svg>; */
}
