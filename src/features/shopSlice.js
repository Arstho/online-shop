import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  clotnes: [],
};

export const fetchClotnes = createAsyncThunk("fetch/shops", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4000/clotnes");
    const clotnes = res.json();
    return clotnes;
  } catch (error) {
    return error;
  }
});

export const addClotnes = createAsyncThunk(
  "add/clotnes",
  async ({ name, image, category, sizes, color, price }, thunkAPI) => {
    try {
      const addedCloth = await fetch("http://localhost:4000/clothes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          image,
          category,
          sizes,
          color,
          price,
        }),
      });
      return addedCloth.json();
    } catch (error) {
      return error;
    }
  }
);

export const deleteClotnes = createAsyncThunk(
  "delete/clotnes",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/clotnes/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return error;
    }
  }
);

export const updateClotnes = createAsyncThunk(
  "updete/clotnes",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/clotnes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });
      return id;
    } catch (error) {
      return error;
    }
  }
);

export const clotnesSlice = createSlice({
  name: "clotnes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchClotnes.fulfilled, (state, action) => {
      state.clotnes = action.payload;
    });

    builder.addCase(addClotnes.fulfilled, (state, action) => {
      state.clotnes.push(action.payload);
      console.log(action.payload);
    });

    builder.addCase(deleteClotnes.fulfilled, (state, action) => {
      state.clotnes = state.clotnes.filter(
        (cart) => cart._id !== action.payload
      );
    });
  },
});

export default clotnesSlice.reducer;
