import { createSlice } from "@reduxjs/toolkit";
import {
  addWater,
  deleteWater,
  updateWater,
  fetchDailyWater,
  fetchMonthlyWater,
} from "./operations";

const initialState = {
  waterDaily: [],
  isLoading: false,
  isError: null,
};

// const handlePending = (state) => {
//   state.isLoading = true;
// };

// const handleRejected = (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// };

const waterSlice = createSlice({});

export const waterReducer = waterSlice.reducer;