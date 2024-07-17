export const convertToLiters = (ml) => {
  if (ml >= 1000) {
    return ml / 1000 + " L";
  } else {
    return ml + " ml";
  }
};
