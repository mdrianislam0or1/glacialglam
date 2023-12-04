import { UserRegistration } from './user.interface';
import UserRegistrationModel, { RegisteredUser } from './user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// creating USER for Registration

const createUserIntoDB = async (payload: UserRegistration) => {
  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(payload.password, 10); // Adjust the saltRounds as needed

  // Create the user with the hashed password
  const result = await UserRegistrationModel.create({
    ...payload,
    password: hashedPassword,
  });

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserRegistrationModel.find().populate('shippingAddress');
  return result;
};

//Login User

const generateAuthToken = (user: RegisteredUser): string => {
  // You can customize the token payload based on your needs
  return jwt.sign({ userId: user._id, email: user.email }, 'your-secret-key', {
    expiresIn: '1h', // Set the expiration time as needed
  });
};

const loginUser = async (
  email: string,
  password: string,
): Promise<string | null> => {
  // Find the user by email
  const user = await UserRegistrationModel.findOne({ email });

  if (!user) {
    return null; // User not found
  }

  // Validate the password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null; // Incorrect password
  }

  // Generate and return the authentication token
  return generateAuthToken(user);
};

//get Single User
const getSingleUserById = async (
  userId: string,
): Promise<RegisteredUser | null> => {
  try {
    const user = await UserRegistrationModel.findById(userId);
    return user;
  } catch (error) {
    // Handle the error, e.g., log it or throw a custom error
    console.error('Error fetching user by ID:', error);
    return null;
  }
};

//update single user
// api/users/:userId
// put request
const updateSingleUserById = async (
  userId: string,
  updatedUser: UserRegistration,
): Promise<RegisteredUser | null> => {
  try {
    const user = await UserRegistrationModel.findByIdAndUpdate(
      userId,
      updatedUser,
      { new: true }, // Return the updated user
    );
    return user;
  } catch (error) {
    // Handle the error, e.g., log it or throw a custom error
    console.error('Error updating user by ID:', error);
    return null;
  }
};

//delete user
// api/users/:userId
const deleteSingleUserById = async (userId: string): Promise<boolean> => {
  try {
    const result = await UserRegistrationModel.findByIdAndDelete(userId);
    return !!result; // Return true if the user was found and deleted, false otherwise
  } catch (error) {
    // Handle the error, e.g., log it or throw a custom error
    console.error('Error deleting user by ID:', error);
    return false;
  }
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  loginUser,
  getSingleUserById,
  updateSingleUserById,
  deleteSingleUserById,
};
