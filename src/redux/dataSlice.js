import { createReducer } from "@reduxjs/toolkit";

export const dataSlice = createReducer(
  {},
  {
    dataRequest: (state) => {
      state.loading = true;
    },
    dataSuccess: (state, action) => {
      state.loading = false;
      state.tickets = action.payload.tickets;
      state.users = action.payload.users;
    },
    dataFailure: (state) => {
      state.loading = false;
      state.tickets = [];
      state.users = [];
    },
  }
);
