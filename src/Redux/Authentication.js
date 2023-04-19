import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  response: null,
  error: null,
  isloading: false,
};

// Login
export const checkLogin = createAsyncThunk(
  "authentication/checkLogin",
  async (values) => {
    let { data } = await axios.post(
      `https://route-ecommerce.onrender.com/api/v1/auth/signin`,
      values
    );
    return data;
  }
);

// Register
export const checkRegister = createAsyncThunk(
  "authentication/checkRegister",
  async (values) => {
    let { data } = await axios.post(
      `https://route-ecommerce.onrender.com/api/v1/auth/signup`,
      values
    );
    return data;
  }
);

const authenticationSlice = createSlice({
  name: "athentication",
  initialState,
  reducers: {
    nullResponse: (state) => {
      state.response = null;
    },
  },

  extraReducers: (builder) => {
    // checkLogin
    builder.addCase(checkLogin.pending, (state, action) => {
      state.isloading = true;
      state.error = null;
      state.response = null;
      console.log("pending", action);
    });

    builder.addCase(checkLogin.fulfilled, (state, action) => {
      state.isloading = false;
      state.error = null;
      state.response = action.payload;
      console.log("fulfilled", state.response);
    });

    builder.addCase(checkLogin.rejected, (state, action) => {
      state.isloading = false;
      state.error = "Wrong Email or Password";
      state.response = null;
      console.log("rejected", action);
    });

    // checkRegister
    builder.addCase(checkRegister.pending, (state, action) => {
      state.isloading = true;
      state.error = null;
      state.response = null;
      console.log("pending", action);
    });

    builder.addCase(checkRegister.fulfilled, (state, action) => {
      state.isloading = false;
      state.error = null;
      state.response = action.payload;
      console.log("fulfilled", state.response);
    });

    builder.addCase(checkRegister.rejected, (state, action) => {
      state.isloading = false;
      state.error = "Account already exists";
      state.response = null;
      console.log("rejected", action);
    });
  },
});

export const authenticationReducer = authenticationSlice.reducer;

export const { nullResponse, } = authenticationSlice.actions;
