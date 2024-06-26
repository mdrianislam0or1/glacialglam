import { z } from "zod";

export const validateReview = z.object({
  productId: z.string().min(1),
  rating: z.number().min(1).max(5),
  review: z.string().min(1),
});
