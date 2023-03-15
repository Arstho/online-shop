import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "../features/categorySlice";

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
  },
});
