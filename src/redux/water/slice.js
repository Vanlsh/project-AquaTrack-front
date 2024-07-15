import { createSlice } from "@reduxjs/toolkit";
import {
  addWater,
  deleteWaterIntakeRecord,
  updateWaterIntakeRecord,
  fetchDailyWater,
  fetchMonthlyWater,
} from "./operations";

import { INITIAL_STATE } from "./initialState";

const handlePending = (state) => {
  state.isLoading = true;
  state.isError = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.isError = action.payload;
};

const waterSlice = createSlice({
  name: "water",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      //=================== fetchDailyWater ===================
      .addCase(fetchDailyWater.pending, handlePending)
      .addCase(fetchDailyWater.fulfilled, (state, action) => {
        const { dailyAmount, dailyPercentage, data } = action.payload;

        state.isLoading = false;
        state.isError = null;

        state.waterDaily.Amount = dailyAmount;
        state.waterDaily.Percentage = dailyPercentage;
        state.waterDaily.Record = data;
      })
      .addCase(fetchDailyWater.rejected, handleRejected)

      //================== fetchMonthlyWater ==================
      .addCase(fetchMonthlyWater.pending, handlePending)
      .addCase(fetchMonthlyWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.waterMonthlyRecord = action.payload;
      })
      .addCase(fetchMonthlyWater.rejected, handleRejected)

      //======================= addWater ======================
      .addCase(addWater.pending, handlePending)
      .addCase(addWater.fulfilled, (state, action) => {
        const newRecord = action.payload.data;
        state.isLoading = false;

        state.waterDaily.Record.push(newRecord);

        state.waterDaily.Record.sort((a, b) => {
          return new Date(a.date * 1000) - new Date(b.date * 1000);
        });

        state.waterDaily.Amount += action.payload.data.amount;
        state.waterDaily.Percentage += action.payload.data.percentage;

        console.log(state.waterDaily.Record);
      })
      .addCase(addWater.rejected, handleRejected)

      //====================== editWater ======================
      .addCase(updateWaterIntakeRecord.pending, handlePending)
      .addCase(updateWaterIntakeRecord.fulfilled, (state, action) => {
        const updatedRecord = action.payload;
        state.isLoading = false;

        const index = state.waterDaily.Record.findIndex(
          (record) => record.id === updatedRecord.id
        );

        console.log(state.waterDaily.Record);

        if (index !== -1) {
          state.waterDaily.Record[index] = updatedRecord;
        }
      })
      .addCase(updateWaterIntakeRecord.rejected, handleRejected)

      //! Need to fix
      //===================== deleteWater =====================
      .addCase(deleteWaterIntakeRecord.pending, handlePending)
      .addCase(deleteWaterIntakeRecord.fulfilled, (state, action) => {
        const recordId = action.payload.id;
        state.isLoading = false;

        // console.log(state.waterDaily.Record); //!

        const index = state.waterDaily.Record.findIndex(
          (record) => record.id === recordId
        );

        state.waterDaily.Record.splice(index, 1);

        state.waterDaily.Amount -= action.payload.amount;
        state.waterDaily.Percentage -= action.payload.percentage;
      })
      .addCase(deleteWaterIntakeRecord.rejected, handleRejected);
  },
});

export const waterReducer = waterSlice.reducer;
