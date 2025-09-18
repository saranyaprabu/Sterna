// src/redux/locationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch locations from API
export const fetchLocations = createAsyncThunk(
  "locations/fetchLocations",
  async () => {
    const res = await axios.get("http://localhost:5000/locations");
    return res.data;
  }
);

// Add location via API (POST)
export const addLocationAsync = createAsyncThunk(
  "locations/addLocationAsync",
  async (newLocation) => {
    const locationWithDefaults = {
      ...newLocation,
      locks: []  // default value
    };

    const res = await axios.post(
      "http://localhost:5000/locations",
      locationWithDefaults // <- send the object with default locks
    );

    return res.data;
  }
);


const locationSlice = createSlice({
  name: "locations",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch locations
      .addCase(fetchLocations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add location
      .addCase(addLocationAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default locationSlice.reducer;
