import clothesSlice from '../features/shopSlice'
import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "../features/categorySlice";
import authReducer from "../features/authSlice";
import cartSlice from "../features/cartSlice";


export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    clothes: clothesSlice,
    authReducer,
    cart: cartSlice
  },
});
