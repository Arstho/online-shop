import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

export const fetchCategories = createAsyncThunk(
  "fetch/categories",
  async (_, thunkApi) => {
    try {
      const res = await fetch("http://localhost:4000/category");
      return res.json();
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const addCategory = createAsyncThunk(
  "add/category",
  async (category, thunkApi) => {
    try {
      const addedCategory = await fetch("http://localhost:4000/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
        }),
      });
      return addedCategory.json();
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      });
  },
});

export default categoriesSlice.reducer;
