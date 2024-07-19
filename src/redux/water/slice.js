import { createSlice } from "@reduxjs/toolkit";
import {
  addWater,
  deleteWaterIntakeRecord,
  updateWaterIntakeRecord,
  fetchDailyWater,
  fetchMonthlyWater,
} from "./operations";

import { WATER_INITIAL_STATE } from "./initialState";

const handleDailyPending = (state) => {
  state.waterDaily.errorMessage = null;
  state.waterDaily.successMessage = null;
};

const handleDailyRejected = (state, action) => {
  state.waterDaily.isLoading = false;
  state.waterDaily.errorMessage = action.payload.data.message;
};

const roundToTwoDecimals = (num) => parseFloat(num.toFixed(2));

const waterSlice = createSlice({
  name: "water",
  initialState: WATER_INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      //=================== fetchDailyWater ===================
      .addCase(fetchDailyWater.pending, (state) => {
        state.waterDaily.isLoading = true;
        state.waterDaily.errorMessage = null;
        state.waterDaily.successMessage = null;
      })
      .addCase(fetchDailyWater.fulfilled, (state, action) => {
        const { dailyAmount, dailyPercentage, data, message } = action.payload;

        state.waterDaily.isLoading = false;
        state.waterDaily.successMessage = message;

        state.waterDaily.amount = dailyAmount;
        state.waterDaily.percentage = dailyPercentage;
        state.waterDaily.data = data;
      })
      .addCase(fetchDailyWater.rejected, (state, action) => {
        state.waterDaily.isLoading = false;
        state.waterDaily.errorMessage = action.payload.data.message;
      })

      //================== fetchMonthlyWater ==================
      .addCase(fetchMonthlyWater.pending, (state) => {
        state.waterMonthly.isLoading = true;
        state.waterMonthly.errorMessage = null;
        state.waterMonthly.successMessage = null;
      })
      .addCase(fetchMonthlyWater.fulfilled, (state, action) => {
        state.waterMonthly.isLoading = false;
        state.waterMonthly.successMessage = action.payload.message;
        state.waterMonthly.data = action.payload.data;
      })
      .addCase(fetchMonthlyWater.rejected, (state, action) => {
        state.waterMonthly.isLoading = false;
        state.waterMonthly.errorMessage = action.payload.data.message;
      })

      //======================= addWater ======================
      .addCase(addWater.pending, handleDailyPending)
      .addCase(addWater.fulfilled, (state, action) => {
        const newRecord = action.payload.data;
        state.waterDaily.successMessage = action.payload.message;

        state.waterDaily.data.push(newRecord);

        state.waterDaily.data.sort((a, b) => {
          return new Date(a.date * 1000) - new Date(b.date * 1000);
        });

        state.waterDaily.amount += newRecord.amount;
        state.waterDaily.percentage = roundToTwoDecimals(
          state.waterDaily.percentage + newRecord.percentage
        );

        const monthlyRecordIndex = state.waterMonthly.data.findIndex(
          (record) => record.date === newRecord.date
        );

        if (monthlyRecordIndex !== -1) {
          state.waterMonthly.data[monthlyRecordIndex].amount +=
            newRecord.amount;
          state.waterMonthly.data[monthlyRecordIndex].percentage =
            roundToTwoDecimals(
              state.waterMonthly.data[monthlyRecordIndex].percentage +
                newRecord.percentage
            );
        }
      })
      .addCase(addWater.rejected, handleDailyRejected)

      //====================== editWater ======================
      .addCase(updateWaterIntakeRecord.pending, handleDailyPending)
      .addCase(updateWaterIntakeRecord.fulfilled, (state, action) => {
        const updatedRecord = action.payload.data;

        state.waterDaily.successMessage = action.payload.message;

        const dailyIndex = state.waterDaily.data.findIndex(
          (record) => record.id === updatedRecord.id
        );

        if (dailyIndex !== -1) {
          const oldRecord = state.waterDaily.data[dailyIndex];

          state.waterDaily.data[dailyIndex] = updatedRecord;

          const totalAmount = state.waterDaily.data.reduce(
            (sum, record) => sum + record.amount,
            0
          );
          state.waterDaily.amount = totalAmount;

          const totalPercentage = state.waterDaily.data.reduce(
            (sum, record) => sum + record.percentage,
            0
          );
          state.waterDaily.percentage = roundToTwoDecimals(totalPercentage);

          const monthlyIndex = state.waterMonthly.data.findIndex(
            (record) =>
              new Date(record.date * 1000).getTime() ===
              new Date(oldRecord.date * 1000).getTime()
          );

          if (monthlyIndex !== -1) {
            state.waterMonthly.data[monthlyIndex].amount +=
              updatedRecord.amount - oldRecord.amount;
            state.waterMonthly.data[monthlyIndex].percentage =
              roundToTwoDecimals(
                state.waterMonthly.data[monthlyIndex].percentage +
                  updatedRecord.percentage -
                  oldRecord.percentage
              );
          }
        }
      })
      .addCase(updateWaterIntakeRecord.rejected, handleDailyRejected)

      //===================== deleteWater =====================
      .addCase(deleteWaterIntakeRecord.pending, handleDailyPending)
      .addCase(deleteWaterIntakeRecord.fulfilled, (state, action) => {
        const recordId = action.payload.data.id;

        const dailyIndex = state.waterDaily.data.findIndex(
          (record) => record.id === recordId
        );

        if (dailyIndex !== -1) {
          const [removedRecord] = state.waterDaily.data.splice(dailyIndex, 1);
          state.waterDaily.amount -= removedRecord.amount;
          state.waterDaily.percentage -= removedRecord.percentage;

          const monthlyIndex = state.waterMonthly.data.findIndex(
            (record) => record.date === removedRecord.date
          );

          if (monthlyIndex !== -1) {
            state.waterMonthly.data[monthlyIndex].amount -=
              removedRecord.amount;
            state.waterMonthly.data[monthlyIndex].percentage -=
              removedRecord.percentage;
          }
        }
      })
      .addCase(deleteWaterIntakeRecord.rejected, handleDailyRejected);
  },
});

export const waterReducer = waterSlice.reducer;
