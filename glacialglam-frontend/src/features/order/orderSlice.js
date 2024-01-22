// orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: "",
    paymentResult: {},
    itemsPrice: 0,
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
    isPaid: false,
    isDelivered: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.product === newItem.product
      );

      if (existingItem) {
        existingItem.qty += newItem.qty;
      } else {
        state.cartItems.push(newItem);
      }

      // Recalculate order totals
      recalculateOrderTotals(state);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== productId
      );

      // Recalculate order totals
      recalculateOrderTotals(state);
    },
    // other order-related reducers
  },
});

// Directly dispatch actions within the slice file
const recalculateOrderTotals = (state) => {
  const { cartItems } = state;

  // Implement your logic for calculating prices here
  const itemsPrice = cartItems.reduce((total, item) => total + item.price, 0);
  const taxPrice = itemsPrice * 0.1; // 10% tax
  const shippingPrice = 5; // Assuming a fixed shipping price
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  // Dispatch actions to update the order totals in the Redux state
  state.itemsPrice = itemsPrice;
  state.taxPrice = taxPrice;
  state.shippingPrice = shippingPrice;
  state.totalPrice = totalPrice;
};

export const { addToCart, removeFromCart } = orderSlice.actions;

export default orderSlice.reducer;
