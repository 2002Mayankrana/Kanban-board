import { configureStore } from "@reduxjs/toolkit";
import { dataSlice } from "./dataSlice";
import { dataSelectSlice } from "./selectDataSlice";

export const store = configureStore({
  reducer: {
    dataSlice,
    dataSelectSlice,
  },
});
