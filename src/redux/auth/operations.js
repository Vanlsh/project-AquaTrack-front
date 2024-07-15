import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  logInUser,
  logOutUser,
  registerUser,
  requestUserInfo,
  updateUserInfo,
  updateUserPhoto,
} from "../../api/auth.js";

//====================== SIGN IN ======================

export const logIn = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const res = await logInUser(userData);
      return res.data;
    } catch (err) {
      //TODO reject with message
      console.log(err);
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.data.data,
      });
    }
  },
);

//====================== SIGN UP ======================

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (userData, thunkAPI) => {
    try {
      const resSignUp = await registerUser(userData);
      const resSignIn = await logInUser(userData);
      return resSignIn.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

//====================== LOG OUT =======================

export const logOut = createAsyncThunk(
  "auth/logout",
  async (token, thunkAPI) => {
    try {
      await logOutUser(token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

//================= USER INFORMATION ===================

export const getUserInfo = createAsyncThunk(
  "auth/info",
  async (token, thunkAPI) => {
    try {
      const response = await requestUserInfo(token);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

//================== UPDATE PROFILE ====================

export const updateUserProfile = createAsyncThunk(
  "auth/update",
  async (userData, thunkAPI) => {
    try {
      const response = await updateUserInfo(userData);
      return response.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

//=================== UPLOAD PHOTO =====================

export const uploadUserPhoto = createAsyncThunk(
  "users/photo",
  async (userData, thunkAPI) => {
    try {
      const response = await updateUserPhoto(userData);
      return response.photo;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

//=====================================================

//TODO: export const googleLogIn = createAsyncThunk();

//=====================================================

//TODO: export const forgetPassword = createAsyncThunk();

//=====================================================

//TODO: export const resetPassword = createAsyncThunk();
