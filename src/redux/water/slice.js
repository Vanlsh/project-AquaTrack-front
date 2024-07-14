import { createSlice } from "@reduxjs/toolkit";
import {
  addWater,
  deleteWaterIntakeRecord,
  updateWaterIntakeRecord,
  fetchDailyWater,
  // fetchMonthlyWater,
} from "./operations";

const INITIAL_STATE = {
  waterDaily: [],
  isLoading: false,
  isError: null,
};

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
      // fetchDailyWater
      .addCase(fetchDailyWater.pending, handlePending)
      .addCase(fetchDailyWater.fulfilled, (state, action) => {
        state.waterDaily = action.payload;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(fetchDailyWater.rejected, handleRejected)

      // addWater
      .addCase(addWater.pending, handlePending)
      .addCase(addWater.fulfilled, (state, action) => {
        const newRecord = action.payload.data;

        state.isLoading = false;

        state.waterDaily.push(newRecord);

        state.waterDaily.sort((a, b) => {
          return new Date(a.date * 1000) - new Date(b.date * 1000);
        });

        console.log(state.waterDaily);
      })
      .addCase(addWater.rejected, handleRejected)

      //  editWater
      .addCase(updateWaterIntakeRecord.pending, handlePending)
      .addCase(updateWaterIntakeRecord.fulfilled, (state, action) => {
        const updatedRecord = action.payload;
        state.isLoading = false;

        const index = state.waterDaily.findIndex(
          (record) => record.id === updatedRecord.id
        );

        console.log(state.waterDaily);

        if (index !== -1) {
          state.waterDaily[index] = updatedRecord;
        }
      })
      .addCase(updateWaterIntakeRecord.rejected, handleRejected)

      // deleteWater
      .addCase(deleteWaterIntakeRecord.pending, handlePending)
      .addCase(deleteWaterIntakeRecord.fulfilled, (state, action) => {
        const recordId = action.payload;
        console.log(action.payload);

        state.isLoading = false;

        const index = state.waterDaily.findIndex(
          (record) => record._id === recordId
        );

        state.waterDaily.splice(index, 1);
      })
      .addCase(deleteWaterIntakeRecord.rejected, handleRejected);
  },
});

export const waterReducer = waterSlice.reducer;
