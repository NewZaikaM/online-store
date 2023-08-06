import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ENDIPOINTS } from "../../utils/constants";
import axios from "axios";

const initialState = {
  list: [],
  isPending: false,
  error: null,
};

export const getCategories = createAsyncThunk('categories/getCategories', async (_, thankAPI) => {
  try {
    const response = await axios(ENDIPOINTS.FOR_CATEGORIES);
    return response.data;
  } catch (error) {
    console.error(error);
    return thankAPI.rejectWithValue(error)
  }
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.isPending = false;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isPending = false;
    });
  },
});

export default categoriesSlice.reducer;
