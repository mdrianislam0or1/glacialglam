import { IUser } from './user.interface';
import UserModel from './user.model';
// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public

const authUserService = async (
  email: string,
  password: string,
): Promise<IUser | null> => {
  const user = await UserModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return user;
  }

  return null;
};

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public

export const sendResponse = (res: Response, data: any) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
// Function to find a user by email
const findUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    const user = await UserModel.findOne({ email });
    return user;
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
};

export const UserServices = {
  authUserService,
  findUserByEmail,
  // Add other service functions as needed...
};
