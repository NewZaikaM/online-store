//@ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { ENDIPOINTS } from '../../utils/constants';
import { shuffle } from '../../utils/common';

const initialState = {
	list: [],
	filtered: [],
	related: [],
	isPending: false,
};

export const getProducts = createAsyncThunk(
	'products/getProducts',
	async (_, thankAPI) => {
		try {
			const response = await axios(ENDIPOINTS.FOR_PRODUCTS);
			return response.data;
		} catch (error) {
			console.error(error);
			return thankAPI.rejectWithValue(error);
		}
	},
);

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		filterByPrice: (state, { payload }) => {
			state.filtered = state.list.filter(({ price }) => price < payload);
		},
		getRelatedProducts: (state, { payload }) => {
			const list = state.list.filter(({ category: { id } }) => id === payload);
			state.related = shuffle(list);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getProducts.pending, (state) => {
			state.isPending = true;
		});
		builder.addCase(getProducts.rejected, (state) => {
			state.isPending = false;
		});
		builder.addCase(getProducts.fulfilled, (state, { payload }) => {
			state.list = payload;
			state.isPending = false;
		});
	},
});

export const { filterByPrice, getRelatedProducts } = productsSlice.actions;
export default productsSlice.reducer;
