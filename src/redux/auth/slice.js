// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "./initialState";
import { logIn, logOut, signUp } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logOutReducer: () => {
      return INITIAL_STATE;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
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

    //TODO RequestInfo
    //TODO UpdateUser
  },
});

export const authReducer = authSlice.reducer;
export const { setToken, logOutReducer, setLoggedIn } = authSlice.actions;
