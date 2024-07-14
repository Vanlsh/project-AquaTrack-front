// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "./initialState";
import { logIn, logOut, refreshUser, signUp } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      // SIGNUP
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isSuccessfullyRegistered = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccessfullyRegistered = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(signUp.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccessfullyRegistered = false;
        state.isError = false;
        state.error = null;
      })

      // LOGIN
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isSuccessfullyLoggedIn = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        state.isSuccessfullyLoggedIn = false;
      })
      .addCase(logIn.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.isSuccessfullyLoggedIn = false;
      })

      // LOGOUT
      .addCase(logOut.fulfilled, (state) => {
        return INITIAL_STATE;
      })
      .addCase(logOut.rejected, (state) => {
        return INITIAL_STATE;
      })
      .addCase(logOut.pending, (state, action) => {
        state.isLoading = true;
      })

      // REFRESH USER
      .addCase(refreshUser.pending, (state) => {
        state.isLoading = true;
        state.isRefreshing = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
