/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import TextArea from "../../ui/TextArea";

const CreateReview = () => {
  const { token, user } = useSelector((state) => state.auth) || {};
  const { productId } = useParams();
  const [rating, setRating] = useState(3); // Default rating, you can set it to 0 if needed
  const [review, setReview] = useState("");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your logic to submit the review here
    console.log("Submitting Review:", { productId, rating, review, userId: user?._id });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-md shadow-md">
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
        <button type="submit" color="indigo">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default CreateReview;
