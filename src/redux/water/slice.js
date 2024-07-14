import { createSlice } from "@reduxjs/toolkit";
import {
  // addWater,
  // deleteWater,
  // updateWater,
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
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDailyWater.rejected, handleRejected);
    // addWater
  },
});

export const waterReducer = waterSlice.reducer;
