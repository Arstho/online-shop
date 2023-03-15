import { configureStore } from '@reduxjs/toolkit'
import { clotnesSlice } from '../features/shopSlice'

export const store = configureStore({     
  reducer: {
    clotnesSlice
  },
})    