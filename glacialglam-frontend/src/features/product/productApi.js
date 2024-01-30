// productApi.js
import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["Product"],
    }),
    getAdminAllProduct: builder.query({
      query: () => "/admin/products",
      providesTags: ["Product"],
      headers: { 'Authorization': `${JSON.parse(localStorage.getItem("auth"))?.token}` },
    }),
    getProduct: builder.query({
      query: (productId) => `products/${productId}/reviews`,
      providesTags:( productId)=>[{type:"product", productId}]
    }),
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/product",
        method: "POST",
        body: formData,
        headers: { 'Authorization': `${JSON.parse(localStorage.getItem("auth"))?.token}` },
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, ...data }) => ({
        url: `/products/${productId}`,
        method: "PUT",
        body: data,
        headers: { 'Authorization': `${JSON.parse(localStorage.getItem("auth"))?.token}`},
      }),
      invalidatesTags:["Product"]
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  //admin
  useGetAdminAllProductQuery
} = productApi;


console.log("productApi.js", `${JSON.parse(localStorage.getItem("auth"))?.token}`)