import { createReducer } from "@reduxjs/toolkit";

export const dataSelectSlice = createReducer(
  {},
  {
    dataSelectRequest: (state) => {
      state.loading = true;
      state.dataSelected = [];
    },
    dataSelectSuccess: (state, action) => {
      state.loading = false;
      state.dataSelected = action.payload.dataSelected;
      state.user = action.payload.user;
    },
    dataSelectFailure: (state, action) => {
      state.loading = false;
      state.dataSelected = [];
      state.message = action.payload.message;
    },
  }
);
