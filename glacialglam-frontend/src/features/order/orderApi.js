// orderApi.js
import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addOrderItems: builder.mutation({
      query: (orderData) => ({
        url: "/orders/addOrder",
        method: "POST",
        body: orderData,
        headers: {
          'Authorization': `${JSON.parse(localStorage.getItem("auth"))?.token}`,
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useAddOrderItemsMutation } = orderApi;
