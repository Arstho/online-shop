import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  clotnes: [],
};

const fetchClotnes = createAsyncThunk("fetch/shops", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4000/clotnes");
    const clotnes = res.json();
    return clotnes;
  } catch (error) {
    return error;
  }
});

const addClotnes = createAsyncThunk(
  "add/clotnes",
  async (clotnes, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/clotnes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clotnes),
      });
      const clotnes = res.json();
      return clotnes;
    } catch (error) {
      return error;
    }
  }
);

const deleteClotnes = createAsyncThunk(
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

const updateClotnes = createAsyncThunk(
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
    });

    builder.addCase(deleteClotnes.fulfilled, (state, action) => {
      state.clotnes = state.clotnes.filter(
        (cart) => cart._id !== action.payload
      );
    });
  },
});

export default clotnesSlice.reducer;
