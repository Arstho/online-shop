import  clothes  from '../features/shopSlice'
import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "../features/categorySlice";
import authReducer from "../features/authSlice";


export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    clothes,
    authReducer,  
  },
});
