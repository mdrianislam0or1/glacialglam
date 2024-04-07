import express from 'express';
import { ReviewControllers } from './review.controller';
import auth from '../../middleware/auth';
import { validateReview } from './review.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.post(
  '/reviews',
  auth('user'),
  validateRequest(validateReview),
  ReviewControllers.createReviewController,
);

// Get reviews by product
router.get(
  '/reviews/:productId',
  ReviewControllers.getReviewsByProductController,
);

export const ReviewRouters = router;
