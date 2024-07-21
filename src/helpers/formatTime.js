export const formatTime = (date) => {
  const dateObj = new Date(Number(date));
  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  if (hours >= 12) {
    hours = hours % 12;
    hours = hours ? hours : 12;
  }

  const hoursStr = hours.toString().padStart(2, "0");
  const minutesStr = minutes.toString().padStart(2, "0");
  return `${hoursStr}:${minutesStr} ${ampm}`;
};
