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
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// //=================== UPDATE WATER ====================

// export const updateWater = createAsyncThunk(
//   "water/update",
//   async (formData, thunkAPI) => {
//     try {
//       const response = await updateWaterIntakeRecord(formData);
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// //=================== DELETE WATER ====================

// export const deleteWater = createAsyncThunk(
//   "water/deleteWater",
//   async (formData, thunkAPI) => {
//     try {
//       const response = await deleteWaterIntakeRecord(formData);
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

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
  async (formData, thunkAPI) => {
    try {
      const response = await getDayWater(formData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
