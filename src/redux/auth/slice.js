import { createSlice } from "@reduxjs/toolkit";
import { signUp, logIn, logOut, refreshUser } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        // state.refreshToken = action.payload.refreshToken;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        // state.refreshToken = action.payload.refreshToken;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
