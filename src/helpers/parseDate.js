export const parseDateTime = (dateMS) => {
  const ms = Number(dateMS);

  if (!ms || ms < 1 || ms > Date.now()) return new Date();
  const millisecondsInOneYear = 365.25 * 24 * 60 * 60 * 1000;
  const millisecondsInThreeYears = millisecondsInOneYear * 3;
  const lowerDate = Date.now() - millisecondsInThreeYears;
  if (lowerDate > ms) return new Date(lowerDate);
  return new Date(ms);
};
