import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { IReview } from "./review.interface";
import { ReviewServices } from "./review.service";

const createReviewController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId, rating, review }: IReview = req.body;

    // Add any additional validation logic here

    const createdReview = await ReviewServices.createReview({ productId, rating, review });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Review created successfully",
      data: createdReview,
    });
  }
);


export const ReviewControllers = {
  createReviewController,
}
