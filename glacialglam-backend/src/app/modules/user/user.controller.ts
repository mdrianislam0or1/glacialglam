import httpStatus from "http-status";
import { UserServices } from "./user.service";
import { TUser } from "./user.interface";
import config from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import { Request, Response } from "express";
import { User } from "./user.model";
import catchAsync from "../../utils/catchAsync";
import { decodeToken } from "../../utils/hashOrDecodePW";
import sendResponse from "../../utils/sendResponse";

const UserController = catchAsync(async (req, res) => {
  try {
    const userData: TUser = req.body;
    const user = await UserServices.createUserIntoDB(userData);

    const responseData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User registered successfully",
      data: responseData,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
      data: null,
    });
  }
});

const userLoginController = catchAsync(async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserServices.loginUserFromDB(username, password);

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      config.jwt_secret as string,
      {
        expiresIn: config.jwt_secret_IN,
      }
    );

    console.log(decodeToken(token, config.jwt_secret as string));
    const responseData = {
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    };

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User login successful",
      data: responseData,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message,
      data: null,
    });
  }
});

const changePasswordController = catchAsync(
  async (req: Request, res: Response) => {
    try {
      const decodedToken = decodeToken(
        req.headers.authorization || "",
        config.jwt_secret as string
      );

      if (!decodedToken) {
        throw new Error("Invalid or missing token");
      }

      const userId = decodedToken._id;

      if (!userId) {
        throw new Error("User ID not found in the token");
      }

      const { currentPassword, newPassword } = req.body;

      await UserServices.changePassword(userId, currentPassword, newPassword);

      const updatedUser = await User.findById(userId);

      const responseData = {
        _id: updatedUser?._id,
        username: updatedUser?.username,
        email: updatedUser?.email,
        role: updatedUser?.role,
        createdAt: updatedUser?.createdAt,
        updatedAt: updatedUser?.updatedAt,
      };

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password changed successfully",
        data: responseData,
      });
    } catch (error: any) {
      let errorMessage = "Password change failed.";

      if (error.statusCode === httpStatus.UNAUTHORIZED) {
        if (error.details && error.details.lastUsedTimestamp !== undefined) {
          errorMessage +=
            ". Ensure the new password is unique and not among the last 2 used (last used on " +
            error.details.lastUsedTimestamp +
            ").";
        } else {
          errorMessage +=
            ". Unexpected error occurred. Ensure the new password meets the requirements. Details: " +
            error.message;
        }
      } else if (error.statusCode === httpStatus.BAD_REQUEST) {
        errorMessage = error.message;
      }

      sendResponse(res, {
        success: false,
        statusCode: error.statusCode || httpStatus.BAD_REQUEST,
        message: errorMessage,
        data: null,
      });
    }
  }
);

export const UserControllers = {
  UserController,
  userLoginController,
  changePasswordController,
};
