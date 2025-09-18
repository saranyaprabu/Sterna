import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";       // ✅ not ./redux/authSlice
import locationReducer from "./locationSlice"; // ✅ not ./redux/locationSlice

export const store = configureStore({
  reducer: {
    auth: authReducer,
    locations: locationReducer,
  },
});
