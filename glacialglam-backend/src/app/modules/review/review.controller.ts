// review.controller.ts

import { Request, Response } from "express";
import { ReviewServices } from "./review.service";
import sendResponse from "../../utils/sendResponse";
import { IReview } from "./review.interface";

const createReviewController = async (req: Request, res: Response) => {
  try {
    const { courseId, rating, review } = req.body;
    // No need to extract userId from req.user since there is no authentication middleware
    const reviewData: IReview = {
      _id: undefined,
      courseId,
      rating,
      review,
    };

    const createdReview = await ReviewServices.createReviewFromDB(reviewData);

    const response = {
      statusCode: 201,
      success: true,
      message: "Review created successfully",
      data: {
        _id: createdReview._id,
        courseId: createdReview.courseId,
        rating: createdReview.rating,
        review: createdReview.review,
      },
    };

    sendResponse(res, response);
  } catch (error: any) {
    const response = {
      statusCode: 500,
      success: false,
      message: "Internal Server Error",
      errorMessage: error.message,
      errorDetails: error.errorDetails,
      stack: error.stack,
    };

    sendResponse(res, response);
  }
};

export const ReviewControllers = {
  createReviewController,
};
