import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Registration is created succesfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users are retrieved successfully',
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const authToken = await UserServices.loginUser(email, password);

  if (!authToken) {
    return sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Invalid email or password',
      data: undefined,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successful',
    data: { authToken },
  });
});

//Get Single User
const getSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const user = await UserServices.getSingleUserById(userId);

  if (!user) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'User not found',
      data: undefined,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User found successfully',
    data: user,
  });
});

//update user

const updateSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const updatedUserData = req.body;

  const updatedUser = await UserServices.updateSingleUserById(
    userId,
    updatedUserData,
  );

  if (!updatedUser) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'User not found or could not be updated',
      data: undefined,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: updatedUser,
  });
});

//Delete a user
const deleteSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const isUserDeleted = await UserServices.deleteSingleUserById(userId);

  if (!isUserDeleted) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'User not found or could not be deleted',
      data: undefined,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: undefined,
  });
});
export const UserControllers = {
  createUser,
  getAllUsers,
  login,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
