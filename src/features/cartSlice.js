import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ data }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get('email'),
          number: data.get('number'),
          country: data.get('country'),
          citi: data.get('citi'),
          street: data.get('street'),
          home: data.get('home'),
          flat: data.get('flat'),
          localStorageItems: data.get('localStorageItems')
        }),
    });
      const response = await res.json();
      if (response.message) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const addItemToLocalStorage = createAsyncThunk(
  "cart/addItemToLocalStorage",
  async ({ data }, thunkAPI) => {
    try {
      const response = await JSON.stringify({
        image: data.get('image'),
        name: data.get("name"),
        size: data.get("size"),
        price: data.get("price"),
        total: data.get("total"),
        count: data.get("count"),
        color: data.get("color"),
      });
      localStorage.setItem('items', [])
      if (response.message) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (id, thunkApi) => {
    try {
      const res = await fetch(`http://localhost:4000/cart/${id}`);
      return res.json();
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getAllCarts = createAsyncThunk(
  "cart/getAllCarts",
  async (_, thunkApi) => {
    try {
      const res = await fetch("http://localhost:4000/cart");
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
        state.items.push(action.payload);
        localStorage.removeItem('items')
      })
      .addCase(fetchCart.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addItemToLocalStorage.fulfilled, (state, action) => {
        state.items.push(action.payload);
        localStorage.setItem("items", `[${state.items}]`);
        // const testStr = localStorage.getItem("items");
        // console.log("testStr", testStr);
        // const parsedStr = JSON.parse(localStorage.getItem("items"));
        // console.log("parsedStr", parsedStr);
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
      .addCase(getAllCarts.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default cartSlice.reducer;
