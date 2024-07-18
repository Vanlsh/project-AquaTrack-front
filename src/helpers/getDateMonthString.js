import { monthsName } from "../constants.js";

export const getDateMonthString = (date) => {
  const dateNow = new Date();
  const isToday =
    dateNow.getFullYear() === date.getFullYear() &&
    dateNow.getMonth() === date.getMonth() &&
    dateNow.getDate() === date.getDate();
  return { isToday, day: date.getDate(), month: monthsName[date.getMonth()] };
};
