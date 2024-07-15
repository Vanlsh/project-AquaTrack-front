export const selectWaterDailyAmount = (state) => state.water.waterDaily.Amount;
export const selectWaterDailyRecord = (state) => state.water.waterDaily.Record;
export const selectWaterDailyPercentage = (state) => state.water.waterDaily.Percentage;

export const selectWaterMonthlyRecord = (state) => state.water.MonthlyRecord;

export const selectIsLoading = (state) => state.water.isLoading;
export const selectIsError = (state) => state.water.isError;
