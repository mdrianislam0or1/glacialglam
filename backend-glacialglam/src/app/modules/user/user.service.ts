import { IUser } from './user.interface';
import UserModel from './user.model';

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
  findUserByEmail,
  // Add other service functions as needed...
};
