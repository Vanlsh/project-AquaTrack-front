import axios from "axios"; //!!!

import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  signUpUser,
  logInUser,
  logOutUser,
  requestRefreshUser,
  requestUserInfo,
  updateUserInfo,
  updateUserPhoto,
} from "../../api/auth.js";

// axios.defaults.baseURL = "https://...";

//=================== TOAST SETTINGS ==================
//* create a separate file for configuring the toast

const toastSettings = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

//=============== SET/CLEAR AUTH HEADER ===============

export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

//====================== SIGN UP ======================

export const signUp = createAsyncThunk(
  "auth/signUp", // !!!
  async (userData, thunkAPI) => {
    try {
      const res = await signUpUser(userData);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error(
          "This email is already in use.",
          {
            ...toastSettings,
          }
        );
      }
      return thunkAPI.rejectWithValue(err.message);
    }
  }
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
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

//====================== LOG OUT =======================

export const logOut = createAsyncThunk("auth/logout", async (token, thunkAPI) => {
  try {
    await logOutUser(token);
    clearAuthHeader();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

//=================== REFRESH USER =====================

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    // Reading the token from the state via getState()
    const reduxState = thunkAPI.getState();
    const savedToken = reduxState.auth.token;

    if (savedToken === null) {
      // If there is no token, exit without performing any request
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      // If there is a token, add it to the HTTP header and perform the request
      setAuthHeader(savedToken);
      const res = await requestRefreshUser(); //??
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
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
  }
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
  }
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
  }
);

//=====================================================

//TODO: export const googleLogIn = createAsyncThunk();

//=====================================================

//TODO: export const forgetPassword = createAsyncThunk();

//=====================================================

//TODO: export const resetPassword = createAsyncThunk();
