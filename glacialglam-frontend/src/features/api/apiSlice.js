import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl:`http://localhost:5000/api`,
  prepareHeaders: async (headers, { getState, endpoint }) => {
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
    tagTypes: [],
    endpoints: (builder) => ({}),
});