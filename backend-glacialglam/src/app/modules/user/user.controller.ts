import { Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import UserModel from './user.model';
import generateToken from '../../utils/generateToken';

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'User already exists',
      data: undefined,
    });
  }

  const user = await UserModel.create({
    name,
    email,
    password,
  });

  if (user) {
    // Generate and set authentication token as an HTTP-only cookie
    const authToken = generateToken(res, user._id.toString());

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'User registered successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Invalid user data',
      data: undefined,
    });
  }
});

// You can add other controllers here...

export const UserControllers = {
  registerUser,
  // Add other controller functions as needed...
};
