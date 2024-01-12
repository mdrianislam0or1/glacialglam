
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import sendResponse from '../../utils/sendResponse';

export const validateReview = z.object({
  courseId: z.string().min(1),
  rating: z.number().min(1).max(5),
  review: z.string().min(1),
});

export const validateRequest = <T>(validator: z.ZodObject<any, any, any>, field: any = 'body') => {
  return async (req: Request<any, any, T>, res: Response, next: NextFunction) => {
    try {
        if (!(field in req)) {
            throw new Error(`Field '${field}' does not exist on the Request object.`);
        }

        const validatedData = validator.parse((req as any)[field as keyof T]);
        (req as any)[field as keyof T] = validatedData;
        next();
    } catch (error: any) {
      const response = {
        statusCode: 400,
        success: false,
        message: 'Bad Request',
        errorMessage: error.errors || error.message,
      };
      sendResponse(res, response);
    }
  };
};
