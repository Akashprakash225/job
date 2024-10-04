import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      console.log("Saving user:", action.payload); // Debugging
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    clearUser: (state) => {
      console.log("Clearing user"); // Debugging
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    setError: (state, action) => {
      console.log("Setting error:", action.payload); // Debugging
      state.error = action.payload;
    },
  },
});

export const { saveUser, clearUser, setError } = userSlice.actions;

export default userSlice.reducer;
