const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "DURATION",
];

export const getDateMonthString = (date) => {
  const dateNow = new Date();
  const isToday =
    dateNow.getFullYear() === date.getFullYear() &&
    dateNow.getMonth() === date.getMonth() &&
    dateNow.getDate() === date.getDate();
  if (isToday) {
    return "Today";
  } else {
    return `${date.getDate()}, ${months[date.getMonth()]}`;
  }
};
