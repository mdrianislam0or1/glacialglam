// store.js
import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer, { loadAuthDataFromStorage } 
from "../features/auth/authSlice";
import productSliceReducer from "../features/product/productSlice";
import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    product: productSliceReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});

// Load authentication data from local storage when the store is created
store.dispatch(loadAuthDataFromStorage());
