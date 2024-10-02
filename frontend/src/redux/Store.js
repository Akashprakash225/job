import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/features/userSlice";
import employerReducer from "../redux/features/employerSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    employer: employerReducer,
  },
});
