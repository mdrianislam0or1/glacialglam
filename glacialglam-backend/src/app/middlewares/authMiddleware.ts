import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import UserRegistrationModel from '../modules/user/user.model';
import { UserRegistration } from '../modules/user/user.interface';

interface RequestWithUser extends Request {
  user?: UserRegistration;
}

// User must be authenticated
const protect = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    let token: string | undefined;

    // Read JWT from the 'authToken' property in the request body
    token = req.body.authToken;

    if (token) {
      try {
        const decoded: any = jwt.verify(
          token,
          process.env.JWT_SECRET as string,
        );

        req.user = (await UserRegistrationModel.findById(decoded.userId).select(
          '-password',
        )) as UserRegistration | undefined;

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

// User must be an admin
const admin = (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
