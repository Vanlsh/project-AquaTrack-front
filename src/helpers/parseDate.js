export const parseDateTime = (dateMS) => {
  const ms = parseInt(dateMS);
  if (!ms || ms < 1 || ms > Date.now()) return new Date();
  return new Date(ms);
};
