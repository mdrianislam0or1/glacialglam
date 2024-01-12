// auth.ts
import { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import ApplicationError from "../errorHandler/ApplicationError";
import httpStatus from "http-status";
import config from "../config";
import { User } from "../modules/user/user.model";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { TUserRole } from "../modules/user/user.interface";

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      return next(new ApplicationError(httpStatus.UNAUTHORIZED, "Unauthorized"));
    }

    try {
      const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;
      console.log("Decoded JWT Payload:", decoded);

      const { role, _id, username } = decoded;
      const user = await User.isUserExistById(_id);

      if (!user) {
        console.error("User not found in database");
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
      console.log("User Details from Authentication Middleware:", req.user);
      next();
    } catch (error) {
      console.error("JWT Verification Error:", error);
      return next(new ApplicationError(httpStatus.UNAUTHORIZED, "Unauthorized"));
    }
  });
};

export default auth;
