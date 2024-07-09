import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
};
const userSlice = createSlice({
  name: "auth",
  initialState,
});

export const userReducer = userSlice.reducer;
