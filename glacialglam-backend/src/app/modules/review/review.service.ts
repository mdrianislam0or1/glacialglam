import { IReview } from "./review.interface";
import ReviewModel from "./review.model";

const createReview = async (reviewData: IReview): Promise<IReview> => {
  const newReview = new ReviewModel(reviewData);
  return await newReview.save();
};

export const ReviewServices = {
  createReview,
}