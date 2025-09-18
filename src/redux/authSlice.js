// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      const user = res.data.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) {
        return rejectWithValue("Invalid email or password");
      }
      return { id: user.id, name: user.name, email: user.email };
    } catch (err) {
      return rejectWithValue("Something went wrong");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,      // { id, name, email }
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
