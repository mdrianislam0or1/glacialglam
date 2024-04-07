// review.service.ts
import { IReview } from './review.interface';
import ReviewModel from './review.model';

const createReview = async (
  reviewData: IReview,
  userId: string,
): Promise<IReview> => {
  const newReview = new ReviewModel({
    ...reviewData,
    createdBy: userId,
  });

  const createdReview = await newReview.save();
  return createdReview;
};

const getReviewsByProduct = async (productId: string): Promise<IReview[]> => {
  const reviews = await ReviewModel.find({ productId }).populate(
    'createdBy',
    '_id username email role',
  );
  return reviews;
};

export const ReviewServices = {
  createReview,
  getReviewsByProduct,
};
