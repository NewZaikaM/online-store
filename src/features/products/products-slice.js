import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { ENDIPOINTS } from "../../utils/constants";


const initialState = {
  list: [],
  // filtered: [], 
  // related: [],
  isPending: false,
};

export const getProducts = createAsyncThunk('products/getProducts', async (_, thankAPI) => {
  try {
    const response = await axios(ENDIPOINTS.FOR_PRODUCTS);
    return response.data;
  } catch (error) {
    console.error(error);
    return thankAPI.rejectWithValue(error);
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isPending = false;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isPending = false;
    });
  },
});

export default productsSlice.reducer;
