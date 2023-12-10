import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from './asyncHandler'; // Assuming asyncHandler.ts
import UserModel from '../modules/user/user.model';

interface RequestWithUser extends Request {
  user?: any; // You can replace 'any' with your user model type
}

// ...

// ...

const protect = asyncHandler(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    let token: string | undefined;

    // Read JWT from the 'jwt' cookie
    token = req.cookies.jwt;

    if (token) {
      try {
        const decoded: any = jwt.verify(
          token,
          process.env.JWT_SECRET as string,
        );

        req.user = {
          _id: decoded.userId,
          isAdmin: decoded.isAdmin, // Make sure 'isAdmin' is correctly present
        };

        console.log('Decoded Token:', decoded);

        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    } else {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  },
);

// ...

// ...

// User must be an admin
const admin = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.user && req.user._id) {
      const user = await UserModel.findById(req.user._id);

      if (user && user.isAdmin) {
        next();
      } else {
        res.status(401).json({
          success: false,
          message: 'Not authorized as an admin',
          data: undefined,
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: 'Not authorized as an admin',
        data: undefined,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      data: undefined,
    });
  }
};

export { protect, admin };
