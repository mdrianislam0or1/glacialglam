/* eslint-disable no-unused-vars */
// productApi.js
import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["Product"],
    }),
    getFilterProducts: builder.query({
      query: (options) => {
        const { sortBy, sortOrder, minPrice, maxPrice, tags, manufacturingDate, expireDate, level } = options;
        let queryString = "/products?";
        
        // Append query parameters
        if (sortBy !== undefined && sortOrder !== undefined) {
          queryString += `sortBy=${sortBy}&sortOrder=${sortOrder}&`;
        }
        if (minPrice !== undefined && maxPrice !== undefined) {
          queryString += `minPrice=${minPrice}&maxPrice=${maxPrice}&`;
        }
        if (tags !== undefined) {
          if (Array.isArray(tags)) {
            queryString += `tags=${tags.join(',')}&`;
          } else {
            queryString += `tags=${tags}&`;
          }
        }
        if (manufacturingDate !== undefined) {
          queryString += `manufacturingDate=${manufacturingDate}&`;
        }
        if (expireDate !== undefined) {
          queryString += `expireDate=${expireDate}&`;
        }
        if (level !== undefined) {
          queryString += `level=${level}&`;
        }
        
        // Remove trailing '&' if exists
        queryString = queryString.replace(/&$/, "");
        
        return queryString;
      },
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
  useGetFilterProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  //admin
  useGetAdminAllProductQuery
} = productApi;

console.log("productApi.js", `${JSON.parse(localStorage.getItem("auth"))?.token}`);
