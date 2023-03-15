import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  clothes: [],
};

const fetchClothes = createAsyncThunk("fetch/shops", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4000/clothes");
    const clothes = res.json();
    return clothes;
  } catch (error) {
    return error;
  }
});

const addClothes = createAsyncThunk(
  "add/clothes",
  async (clothes, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/clothes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({clothes}),
      });
      return res.json();
    } catch (error) {
      return error;
    }
  }
);

const deleteClothes = createAsyncThunk(
  "delete/clothes",
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

const updateClothes = createAsyncThunk(
  "updete/clothes",
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

    builder.addCase(addClothes.fulfilled, (state, action) => {
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
