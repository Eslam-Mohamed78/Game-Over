import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  response: null,
  error: null,
  isloading: false,
};

const headers = {
  "X-RapidAPI-Key": "8fca27e16amshe999b9d42d38332p1b35c6jsn1bf3212e569a",
  "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
};

// getAllGames
export const getAllGames = createAsyncThunk("appData/getAllGames", async () => {
  const { data } = await axios.get(
    "https://free-to-play-games-database.p.rapidapi.com/api/games",
    { headers }
  );
  return data;
});

const options = {
  method: 'GET',
  headers: headers
};

export const getSpecificGame = createAsyncThunk(
  "appData/getSpecificGame",
  async (endPoint) => {
    const data = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/${endPoint}`,
      options
    );
    const response = await data.json()
    return response
  }
);

const appDataSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    nullResponse: (state) => {
      state.response = null;
    },
  },
  extraReducers: (builder) => {
    // getAllGames
    builder.addCase(getAllGames.pending, (state, action) => {
      state.isloading = true;
      state.error = null;
      state.response = null;
      console.log("pending", action);
    });

    builder.addCase(getAllGames.fulfilled, (state, action) => {
      state.isloading = false;
      state.error = null;
      state.response = action.payload;
      console.log("fulfilled", state.response);
    });

    builder.addCase(getAllGames.rejected, (state, action) => {
      state.isloading = false;
      state.error = "Missing Data ...";
      state.response = null;
      console.log("rejected", action);
    });

    // getSpecificGame

    builder.addCase(getSpecificGame.pending, (state, action) => {
      state.isloading = true;
      state.error = null;
      state.response = null;
      console.log("pending", action);
    });

    builder.addCase(getSpecificGame.fulfilled, (state, action) => {
      state.isloading = false;
      state.error = null;
      state.response = action.payload;
      console.log("fulfilled", state.response);
    });

    builder.addCase(getSpecificGame.rejected, (state, action) => {
      state.isloading = false;
      state.error = "Missing Data ...";
      state.response = null;
      console.log("rejected", action);
    });
  },
});

export const appDataReducer = appDataSlice.reducer;

export const { nullResponse, } = appDataSlice.actions;

