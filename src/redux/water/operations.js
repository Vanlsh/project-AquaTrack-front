import { createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  createWater,
  updateWater,
  deleteWater,
  getDayWater,
  getMonthWater,
} from "../../api/water.js";

// axios.defaults.baseURL = "https://...";

//=================== TOAST SETTINGS ==================
//* create a separate file for configuring the toast

// const toastSettings = {
//   position: "top-center",
//   autoClose: 3000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
// };

//===================== ADD WATER =====================

export const addWater = createAsyncThunk(
  "water/addWater",
  async (formData, thunkAPI) => {
    try {
      const response = await createWater(formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//=================== UPDATE WATER ====================

export const updateWaterIntakeRecord = createAsyncThunk(
  "water/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await updateWater(id, formData);
      console.log(response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//=================== DELETE WATER ====================

export const deleteWaterIntakeRecord = createAsyncThunk(
  "water/deleteWater",
  async (id, thunkAPI) => {
    try {
      const response = await deleteWater(id);
      console.log(response);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// //================= GET MONTHLY WATER =================

// export const fetchMonthlyWater = createAsyncThunk(
//   "water/fetchWaters",
//   async (formData, thunkAPI) => {
//     try {
//       const response = await getMonthlyWaterIntake(formData);
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

//================== GET DAILY WATER ==================

export const fetchDailyWater = createAsyncThunk(
  "water/fetchDay",
  async (date, thunkAPI) => {
    try {
      const response = await getDayWater(date);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
