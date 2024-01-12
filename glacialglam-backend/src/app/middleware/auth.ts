// auth.ts
import { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/user/user.interface";
import ApplicationError from "../errorHandler/ApplicationError";
import httpStatus from "http-status";
import config from "../config";
import { User } from "../modules/user/user.model";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      return next(new ApplicationError(httpStatus.UNAUTHORIZED, "Unauthorized"));
    }

    try {
      const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;
      const { role, _id, username } = decoded;

      const user = await User.isUserExistById(_id);

      if (!user) {
        return next(new ApplicationError(httpStatus.NOT_FOUND, "User not found"));
      }

      if (requiredRole.length > 0 && !requiredRole.includes(role)) {
        return sendResponse(res, {
          success: false,
          statusCode: httpStatus.UNAUTHORIZED,
          message: "Unauthorized",
          errorMessage: "You do not have the necessary permissions to access this resource.",
          errorDetails: null,
          stack: null,
        });
      }

      req.user = { ...decoded, username } as JwtPayload;
      next();
    } catch (error) {
      return next(new ApplicationError(httpStatus.UNAUTHORIZED, "Unauthorized"));
    }
  });
};

export default auth;
