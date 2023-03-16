import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  clothes: [],
};

export const fetchClothes = createAsyncThunk("fetch/shops", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4000/clothes");
    const clothes = res.json();
    return clothes;
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

export const deleteClothes = createAsyncThunk(
  "delete/clotnes",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/clothes/${id}`, {
        method: "DELETE",
      });
      return res.json();
    } catch (error) {
      return error;
    }
  }
);

export const updateClotnes = createAsyncThunk(
  "updete/clotnes",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/clothes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });
      return res.json();
    } catch (error) {
      return error;
    }
  }
);

export const clothesSlice = createSlice({
  name: "clothes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchClothes.fulfilled, (state, action) => {
      state.clothes = action.payload;
    });

    builder.addCase(addClotnes.fulfilled, (state, action) => {
      state.clothes.push(action.payload);
    });

    builder.addCase(deleteClothes.fulfilled, (state, action) => {
      state.clothes = state.clothes.filter(
        (cart) => cart._id !== action.payload
      );
    });
  },
});

export default clothesSlice.reducer;
