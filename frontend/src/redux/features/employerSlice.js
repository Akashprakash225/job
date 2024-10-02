import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEmployerExist: false,
  employer: {},
};

export const employerSlice = createSlice({
  name: "employer",
  initialState,
  reducers: {
    saveEmployer: (state, action) => {
      state.isEmployerExist = true;
      state.employer = action.payload;
    },
    clearEmployer: (state) => {
      state.isEmployerExist = false;
      state.employer = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveEmployer, clearEmployer } = employerSlice.actions;

export default employerSlice.reducer;
