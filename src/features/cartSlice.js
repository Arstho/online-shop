import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  loading: false
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async ({
  Name,
  ItemImage,
  ItemCount,
  ItemPrice,
  Total,
  Discount }, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4000/cart", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Name,
        ItemImage,
        ItemCount,
        ItemPrice,
        Total,
        Discount
      }),
    });
    const data = await res.json();
    if (data.message) {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const getCart = createAsyncThunk("cart/getCart",
  async (id, thunkApi) => {
    try {
      const res = await fetch(`http://localhost:4000/cart/${id}`);
      return res.json();
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getCart.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default cartSlice.reducer;