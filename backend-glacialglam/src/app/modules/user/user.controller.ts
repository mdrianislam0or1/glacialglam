import { Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import UserModel from './user.model';
import generateToken from '../../utils/generateToken';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public

const authUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // Generate and set authentication token as an HTTP-only cookie
    const authToken = generateToken(res, user._id.toString());

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Authentication successful',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: authToken,
      },
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Invalid email or password',
      data: undefined,
    });
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (res: Response) => {
  // Set JWT as an HTTP-Only cookie with an expiry date in the past
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  // Send a response indicating successful logout
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Logged out successfully',
    data: undefined,
  });
};

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

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = catchAsync(async (req, res) => {
  // Use req.user._id instead of req.params._id
  const user = await UserModel.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = catchAsync(async (req, res) => {
  const user = await UserModel.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User profile updated successfully',
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      },
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'User not found',
      data: undefined,
    });
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = catchAsync(async (req, res) => {
  const users = await UserModel.find({});
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully',
    data: users,
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin

const deleteUser = catchAsync(async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: 'User not found',
      data: undefined,
    });
  }

  console.log('req.user.isAdmin:', req.user.isAdmin); // Add this line

  if (req.user.isAdmin) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: 'Cannot delete admin user',
      data: undefined,
    });
  }

  await UserModel.deleteOne({ _id: user._id });
  return res.status(httpStatus.OK).json({
    success: true,
    message: 'User deleted successfully',
    data: undefined,
  });
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = catchAsync(async (req, res) => {
  const user = await UserModel.findById(req.params.id).select('-password');
  if (user) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User fetched successfully',
      data: user,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'User not found',
      data: undefined,
    });
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin

const updateUser = catchAsync(async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    const updatedUser = await user.save();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully',
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      },
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'User not found',
      data: undefined,
    });
  }
});

// You can add other controllers here...

export const UserControllers = {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
  // Add other controller functions as needed...
};
