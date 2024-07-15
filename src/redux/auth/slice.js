// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "./initialState";
import { logIn, logOut, signUp } from "./operations";

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
        state.error = action.payload.status;
        state.errorMessage = action.data.message;
      })
      .addCase(signUp.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccessfullyRegistered = false;
        state.errorMessage = null;
        state.error = null;
      })

      // LOGIN
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isSuccessfullyLoggedIn = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload.message;
        state.error = action.payload.status;
        state.isSuccessfullyLoggedIn = false;
      })
      .addCase(logIn.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = null;
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
      });

    // REFRESH USER
    // .addCase(refreshToken.pending, (state) => {
    //   state.isError = false;
    //   state.error = null;
    // })
    // .addCase(refreshToken.fulfilled, (state, action) => {
    //   state.isLoggedIn = true;
    // })
    // .addCase(refreshToken.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.errorMessage = action.payload.message;
    //   state.error = action.payload.error;
    // });
    //TODO RequestInfo
    //TODO UpdateUser
  },
});

export const authReducer = authSlice.reducer;
