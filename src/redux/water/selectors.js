export const selectWaterDailyAmount = (state) => state.water.waterDaily.amount;
export const selectWaterDailyRecord = (state) => state.water.waterDaily.data;
export const selectWaterDailyPercentage = (state) => state.water.waterDaily.percentage;

export const selectWaterMonthlyRecord = (state) => state.water.waterMonthly.data;

export const selectDailyIsLoading = (state) => state.water.waterDaily.isLoading;
export const selectDailyIsError = (state) => state.water.waterDaily.isError;

export const selectMonthlyIsLoading = (state) => state.water.waterMonthly.isLoading;
export const selectMonthlyIsError = (state) => state.water.waterMonthly.isError;
