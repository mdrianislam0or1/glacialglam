import { apiSlice } from "../api/apiSlice";

export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
        query: (review) => ({
          url: "/reviews",
          method: "POST",
          body: review,
          headers: { 'Authorization': `${JSON.parse(localStorage.getItem("auth"))?.token}` },
        }),
        invalidatesTags: ["Review"],
      }),

  }),
});

export const {
    useAddReviewMutation,
    
} = reviewApi;

