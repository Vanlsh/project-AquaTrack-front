import { createSlice } from "@reduxjs/toolkit";
import {
  addWater,
  deleteWaterIntakeRecord,
  updateWaterIntakeRecord,
  fetchDailyWater,
  fetchMonthlyWater,
} from "./operations";

import { WATER_INITIAL_STATE } from "./initialState";

const handlePending = (state) => {
  state.waterDaily.isLoading = true;
  state.waterDaily.isError = null;
};

const handleRejected = (state, action) => {
  state.waterDaily.isLoading = false;
  state.waterDaily.isError = action.payload;
};

const waterSlice = createSlice({
  name: "water",
  initialState: WATER_INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      //=================== fetchDailyWater ===================
      .addCase(fetchDailyWater.pending, handlePending)
      .addCase(fetchDailyWater.fulfilled, (state, action) => {
        const { dailyAmount, dailyPercentage, data } = action.payload;

        state.waterDaily.isLoading = false;
        state.waterDaily.isError = null;

        state.waterDaily.amount = dailyAmount;
        state.waterDaily.percentage = dailyPercentage;
        state.waterDaily.data = data;
      })
      .addCase(fetchDailyWater.rejected, handleRejected)

      //================== fetchMonthlyWater ==================
      .addCase(fetchMonthlyWater.pending, (state) => {
        state.waterMonthly.isLoading = true;
        state.waterMonthly.isError = null;
      })
      .addCase(fetchMonthlyWater.fulfilled, (state, action) => {
        state.waterMonthly.isLoading = false;
        state.waterMonthly.isError = null;
        state.waterMonthly.data = action.payload;
      })
      .addCase(fetchMonthlyWater.rejected, (state, action) => {
        state.waterMonthly.isLoading = false;
        state.waterMonthly.isError = action.payload;
      })

      //======================= addWater ======================
      .addCase(addWater.pending, handlePending)
      .addCase(addWater.fulfilled, (state, action) => {
        const newRecord = action.payload.data;
        state.waterDaily.isLoading = false;

        state.waterDaily.data.push(newRecord);

        state.waterDaily.data.sort((a, b) => {
          return new Date(a.date * 1000) - new Date(b.date * 1000);
        });

        state.waterDaily.amount += newRecord.amount;
        state.waterDaily.percentage += newRecord.percentage;

        const monthlyRecordIndex = state.waterMonthly.data.findIndex(
          (record) => record.date === newRecord.date
        );

        if (monthlyRecordIndex !== -1) {
          state.waterMonthly.data[monthlyRecordIndex].amount +=
            newRecord.amount;
          state.waterMonthly.data[monthlyRecordIndex].percentage +=
            newRecord.percentage;
        }
      })
      .addCase(addWater.rejected, handleRejected)

      //====================== editWater ======================
      .addCase(updateWaterIntakeRecord.pending, handlePending)
      .addCase(updateWaterIntakeRecord.fulfilled, (state, action) => {
        const updatedRecord = action.payload;
        state.waterDaily.isLoading = false;

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
          state.waterDaily.percentage = totalPercentage;

          const monthlyIndex = state.waterMonthly.data.findIndex(
            (record) =>
              new Date(record.date * 1000).getTime() ===
              new Date(oldRecord.date * 1000).getTime()
          );

          if (monthlyIndex !== -1) {
            state.waterMonthly.data[monthlyIndex].amount +=
              updatedRecord.amount - oldRecord.amount;
            state.waterMonthly.data[monthlyIndex].percentage +=
              updatedRecord.percentage - oldRecord.percentage;
          }
        }
      })
      .addCase(updateWaterIntakeRecord.rejected, handleRejected)

      //===================== deleteWater =====================
      .addCase(deleteWaterIntakeRecord.pending, handlePending)
      .addCase(deleteWaterIntakeRecord.fulfilled, (state, action) => {
        const recordId = action.payload.id;
        state.waterDaily.isLoading = false;

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
      .addCase(deleteWaterIntakeRecord.rejected, handleRejected);
  },
});

export const waterReducer = waterSlice.reducer;
