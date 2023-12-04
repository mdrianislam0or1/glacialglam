import { z } from 'zod';

export const ProductValidation = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(2000),
  price: z.number().positive(),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  material: z.string(),
  features: z.array(z.string()),
  images: z.array(z.string()),
  reviews: z.array(
    z.object({
      username: z.string().min(1).max(255),
      rating: z.number().min(1).max(5),
      comment: z.string().min(1).max(1000),
    }),
  ),
  availability: z.boolean(),
  relatedProducts: z.array(z.string()), // Assuming relatedProducts are represented by their IDs
});

export type ProductValidationType = z.infer<typeof ProductValidation>;
