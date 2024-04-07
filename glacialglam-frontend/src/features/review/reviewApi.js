import { apiSlice } from "../api/apiSlice";

export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: (review) => ({
        url: "/reviews",
        method: "POST",
        body: review,
        headers: {
          'Authorization': `${getToken()}` // Use Bearer token format
        },
      }),
      invalidatesTags: ["Review"],
    }),

    getReview: builder.query({
      query: (productId) => ({
        url: `/reviews/${productId}`,
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {

  useAddReviewMutation,
  useGetReviewQuery,
} = reviewApi;

// Function to get the token from localStorage
const getToken = () => {
  const authData = JSON.parse(localStorage.getItem("auth"));
  return authData ? authData.token : '';
};

console.log( "review token",getToken)