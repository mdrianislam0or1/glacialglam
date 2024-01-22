import { Request, Response } from "express";
import { IReview } from "./review.interface";
import { ReviewServices } from "./review.service";
import sendResponse from "../../utils/sendResponse";

const createReviewController = async (req: Request, res: Response) => {
  try {
    const { productId, rating, review } = req.body;
    const userId = req.user._id;

    const reviewData: IReview = {
      productId,
      rating,
      review,
      createdBy: userId,
    };

    const createdReview = await ReviewServices.createReview(reviewData, userId);

    const response = {
      statusCode: 201,
      success: true,
      message: "Review created successfully",
      data: {
        _id: createdReview._id,
        productId: createdReview.productId,
        rating: createdReview.rating,
        review: createdReview.review,
        createdBy: {
          _id: userId,
          username: req?.user?.username,
          email: req.user.email,
          role: req.user.role,
        },
        createdAt: createdReview.createdAt,
        updatedAt: createdReview.updatedAt,
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
