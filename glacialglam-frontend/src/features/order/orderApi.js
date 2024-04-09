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
          Authorization: `${JSON.parse(localStorage.getItem("auth"))?.token}`,
          "Content-Type": "application/json",
        },
      }),
    }),
    getMyAllOrder: builder.query({
      query: () => `/orders/myOrder`,
      headers: {
        Authorization: `${JSON.parse(localStorage.getItem("auth"))?.token}`,
        "Content-Type": "application/json",
      },
      keepUnusedDataFor: 600,
      providesTags: ["Order"],
    }),
    getMyProfile: builder.query({
      query: () => `/auth/myProfile`,
      headers: {
        Authorization: `${JSON.parse(localStorage.getItem("auth"))?.token}`,
        "Content-Type": "application/json",
      },
      keepUnusedDataFor: 600,
      providesTags: ["Order"],
    }),
    getOrderById: builder.query({
      query: (orderId) => `/orders/myOrder/${orderId}`, 
      invalidatesTags: ["Order"],
      headers: {
        Authorization: `${JSON.parse(localStorage.getItem("auth"))?.token}`,
        "Content-Type": "application/json",
      },
      keepUnusedDataFor: 600,
      providesTags: ["Order"],
    }),

    //admin
    getAllOrderByAdmin: builder.query({
      query: () => `/orders/admin/allOrder`,
      headers: {
        Authorization: `${JSON.parse(localStorage.getItem("auth"))?.token}`,
        "Content-Type": "application/json",
      },
      keepUnusedDataFor: 600,
      providesTags: ["Order"],
    }),
  }),
});

export const {
  useAddOrderItemsMutation,
  useGetMyAllOrderQuery,
  useGetMyProfileQuery,
  useGetOrderByIdQuery,

  //admin
  useGetAllOrderByAdminQuery,
} = orderApi;
