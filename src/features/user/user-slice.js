//@ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ENDIPOINTS } from '../../utils/constants';
import axios from 'axios';

const initialState = {
	currentUser: null,
	cart: [],
	favorites: [],
	formType: 'signup',
	isShownForm: false,
};

export const createUser = createAsyncThunk(
	'user/createUser',
	async (payload, thankAPI) => {
		try {
			const response = await axios.post(ENDIPOINTS.FOR_CREATING_USER, payload);
			return response.data;
		} catch (error) {
			console.error(error);
			return thankAPI.rejectWithValue(error);
		}
	},
);
export const loginUser = createAsyncThunk(
	'user/loginUser',
	async (payload, thankAPI) => {
		try {
			const response = await axios.post(ENDIPOINTS.FOR_LOGIN_USER, payload);
			const login = await axios(ENDIPOINTS.FOR_ACCESS_USER, {
				headers: {
					Authorization: `Bearer ${response.data.access_token}`,
				},
			});
			return login.data;
		} catch (error) {
			console.error(error);
			return thankAPI.rejectWithValue(error);
		}
	},
);
export const updateUser = createAsyncThunk(
	'user/updateUser',
	async (payload, thankAPI) => {
		try {
			const response = await axios.put(ENDIPOINTS.FOR_UPDATING_USER(payload.id), payload);
			return response.data;
		} catch (error) {
			console.error(error);
			return thankAPI.rejectWithValue(error);
		}
	},
);

const addCurrentUser = (state, { payload }) => {
	state.currentUser = payload;
};
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addItemToCart: (state, { payload }) => {
			let newCart = [...state.cart];
			const found = state.cart.find(({ id }) => id === payload.id);

			if (found) {
				newCart = newCart.map((item) => {
					return item.id === payload.id
						? { ...item, quantity: payload.quantity || item.quantity + 1 }
						: item;
				});
			} else {
				newCart.push({ ...payload, quantity: 1 });
			}

			state.cart = newCart;
		},
		addItemToFavorites: (state, { payload }) => {
			let newFavorites = [...state.favorites];
			const found = state.favorites.find(({ id }) => id === payload.id);

			if (found) return;

			newFavorites.push({ ...payload });

			state.favorites = newFavorites;
		},
		removeItemFromCart: (state, {payload}) => {
			state.cart = state.cart.filter(({id}) => id !== payload);
		},
		toggleForm: (state, { payload }) => {
			state.isShownForm = payload;
		},
		toggleFormType: (state, { payload }) => {
			state.formType = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(createUser.fulfilled, addCurrentUser);
		builder.addCase(updateUser.fulfilled, addCurrentUser);
		builder.addCase(loginUser.fulfilled, addCurrentUser);
	},
});

export const { addItemToCart, addItemToFavorites, removeItemFromCart, toggleForm, toggleFormType } =
	userSlice.actions;
export default userSlice.reducer;
