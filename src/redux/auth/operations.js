import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  logInUser,
  logOutUser,
  registerUser,
  requestRefreshUser,
  requestUserInfo,
  updateUserInfo,
  updateUserPhoto,
} from "../../api/auth.js";

import { clearAuthHeader, setAuthHeader } from "../../axios.js";

//====================== SIGN UP ======================

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (userData, thunkAPI) => {
    try {
      const res = await registerUser(userData);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

//====================== SIGN IN ======================

export const logIn = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const res = await logInUser(userData);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (err) {
      //TODO reject with message
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
      clearAuthHeader();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

//=================== REFRESH USER =====================

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (token, thunkAPI) => {
    try {
      const res = await requestRefreshUser();
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        status: err.response?.status,
        message: err.message,
      });
    }
  },
);

//================= USER INFORMATION ===================

export const getUserInfo = createAsyncThunk(
  "users/info",
  async (token, thunkAPI) => {
    try {
      const response = await requestUserInfo(token);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

//================== UPDATE PROFILE ====================

export const updateUserProfile = createAsyncThunk(
  "users/update",
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
