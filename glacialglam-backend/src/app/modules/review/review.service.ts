import httpStatus from "http-status";
import { IReview } from "./review.interface";
import ReviewModel from "./review.model";
import ApplicationError from "../../errorHandler/ApplicationError";

const createReviewFromDB = async (reviewData: IReview): Promise<IReview> => {
  try {
    const createdReview = await ReviewModel.create(reviewData);

    if (!createdReview) {
      throw new ApplicationError(
        httpStatus.NOT_FOUND,
        "Failed to create review"
      );
    }

    return createdReview;
  } catch (error: any) {
    throw new ApplicationError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      error
    );
  }
};

export const ReviewServices = {
  createReviewFromDB,
};
