// apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://glacialglam-backend.vercel.app/api",
  prepareHeaders: async (headers, { getState }) => {
    const accessToken = getState()?.auth?.token;
    if (accessToken) {
      headers.set("Authorization", `${accessToken}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
      api.dispatch(userLoggedOut());
      localStorage.clear();
    }
    return result;
  },
  endpoints: () => ({}),
});

export const { useGetProductsQuery } = apiSlice;
