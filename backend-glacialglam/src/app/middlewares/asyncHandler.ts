import { Request, Response, NextFunction, RequestHandler } from 'express';

const asyncHandler =
  <P = any, ResBody = any, ReqBody = any>(
    fn: (
      req: Request<P, ResBody, ReqBody>,
      res: Response<ResBody>,
      next: NextFunction,
    ) => Promise<void>,
  ): RequestHandler<P, ResBody, ReqBody> =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
