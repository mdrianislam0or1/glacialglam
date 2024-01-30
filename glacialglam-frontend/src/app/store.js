// store.js
import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer, {
  loadAuthDataFromStorage,
} from "../features/auth/authSlice";
import productSliceReducer from "../features/product/productSlice";
import { apiSlice } from "../features/api/apiSlice";
import orderSliceReducer from "../features/order/orderSlice";
import reviewSliceReducer from "../features/review/reviewSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    product: productSliceReducer,
    order: orderSliceReducer,
    review: reviewSliceReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});

// Load authentication data from local storage when the store is created
store.dispatch(loadAuthDataFromStorage());
