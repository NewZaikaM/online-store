import { configureStore, createReducer } from "@reduxjs/toolkit";
import categoriesReducer from "./categories/categories-slice";
import productsReducer from "./products/products-slice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
  },
  devTools: true,
});

export const selectors = {
  selectCategoriesList: (state) => state.categories.list,
  selectProductsState: (state) => state.products,
}