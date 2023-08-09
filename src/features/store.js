//@ts-nocheck
import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categories/categories-slice";
import productsReducer from "./products/products-slice";
import { apiSlice } from "./api/api-slice";
import userReducer from "./user/user-slice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
  },
  middleware: getMiddleware => getMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

