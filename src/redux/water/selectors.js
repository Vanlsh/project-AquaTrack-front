export const selectWaterDailyAmount = (state) => state.water.waterDaily.amount;
export const selectWaterDailyRecord = (state) => state.water.waterDaily.data;
export const selectWaterDailyPercentage = (state) =>
  state.water.waterDaily.percentage;

export const selectWaterMonthlyRecord = (state) =>
  state.water.waterMonthly.data;

export const selectDailyIsLoading = (state) => state.water.waterDaily.isLoading;
export const selectDailyErrorMessage = (state) =>
  state.water.waterDaily.errorMessage;
export const selectDailySuccessMessage = (state) =>
  state.water.waterDaily.successMessage;

export const selectMonthlyIsLoading = (state) =>
  state.water.waterMonthly.isLoading;
export const selectMonthlyErrorMessage = (state) =>
  state.water.waterMonthly.errorMessage;
export const selectMonthlySuccessMessage = (state) =>
  state.water.waterMonthly.successMessage;
