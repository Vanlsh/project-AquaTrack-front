// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "./initialState";
import { getUserInfo, logIn, logOut, signUp } from "./operations";

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
      ////////////////////////////////////////////////////
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.successMessage = "Successfully registered";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.status;
        state.errorMessage = action.data.message;
      })
      .addCase(signUp.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
        state.token = null;
      })
      ////////////////////////////////////////////////////
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.successMessage = "Successfully logged in";
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(logIn.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
        state.errorMessage = null;
      })
      ////////////////////////////////////////////////////
      .addCase(logOut.fulfilled, (state) => {
        return INITIAL_STATE;
      })
      .addCase(logOut.rejected, (state) => {
        return INITIAL_STATE;
      })
      .addCase(logOut.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
      })

      //GET USERINFO
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = true;
        state.user = action.payload;
      })
      .addCase(getUserInfo.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "Something went wrong, try again later";
      });

    //TODO UpdateUser
  },
});

export const authReducer = authSlice.reducer;
export const { setToken, logOutReducer, setLoggedIn } = authSlice.actions;
