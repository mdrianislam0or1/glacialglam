/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import TextArea from "../../ui/TextArea";
import { useAddReviewMutation } from "../../features/review/reviewApi";

const CreateReview = () => {
  const { token, user } = useSelector((state) => state.auth) || {};
  const { productId } = useParams();
  const [rating, setRating] = useState(3); // Default rating, you can set it to 0 if needed
  const [review, setReview] = useState("");
  const [addReviewMutation, { isError, isLoading, isSuccess }] = useAddReviewMutation(); // Initialize the mutation hook

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addReviewMutation({
        productId,
        rating,
        review,
      });
      if (response.error) {
        console.error("Error submitting review:", response.error);
      } else {
        console.log("Review submitted:", response.data);
        // Optionally, you can reset the form or show a success message
        setRating(3); // Reset the rating to default
        setReview(""); // Reset the review text
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
  
    <div className=" container px-10 mx-auto min-h-screen">
        <div className="max-w-md mx-auto mt-10 p-4 bg-white  shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="rating">Rating</label>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <input
                key={star}
                type="radio"
                name="rating"
                className={`mask mask-star-2 bg-orange-400 ${
                  star <= rating ? "checked" : ""
                }`}
                onChange={() => handleRatingChange(star)}
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="review">Review</label>
          <TextArea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review..."
          />
        </div>
        <button type="submit" disabled={isLoading} className="
         w-full bg-black text-white py-2 px-4 mt-4 hover:bg-black
        ">
          {isLoading ? "Submitting..." : "Submit Review"}
        </button>
        {isSuccess && <div className="text-green-600">Review submitted successfully!</div>}
        {isError && <div className="text-red-600">Error submitting review. Please try again later.</div>}
      </form>
    </div>
    </div>
  );
};

export default CreateReview;
