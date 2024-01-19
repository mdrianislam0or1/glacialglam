import bcrypt from "bcrypt";
import { Types } from "mongoose";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";
import { isPasswordChangeValid } from "./user.utils";
import ApplicationError from "../../errorHandler/ApplicationError";
import { sendImageToCloudinary } from "../../utils/sendImageInCloudinary";

const createUserIntoDB = async (file:any,userData: TUser): Promise<TUser> => {
  
  const imageName = `${userData._id}${userData?.username}`;
  const path = file?.path;
  const { secure_url } = (await sendImageToCloudinary(
    imageName,
    path,
  )) as any;
  userData.image = secure_url;

  const user = new User({
    username: userData.username,
    email: userData.email,
    password: userData.password,
    phone: userData.phone || null,
  image: userData.image || null,
  address: userData.address || null,
  about: userData.about || null,
    role: userData.role || "user",
  });

  return user.save();
};

// get my profile
const getMyProfile = async (userId: string): Promise<TUser | null> => {
  try {
    const user = await User.findById(userId).select("-password -passwordChangeHistory");
    return user;
  } catch (error) {
    throw error;
  }
};

//admin get all users
const getAllUsers = async (): Promise<TUser[]> => {
  try {
    const users = await User.find().select("-password -passwordChangeHistory");
    return users;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (userId: string): Promise<TUser | null> => {
  try {
    const user = await User.findById(userId).select("-password -passwordChangeHistory");
    return user;
  } catch (error) {
    throw error;
  }
};

const deleteUserById = async (userId: string): Promise<void> => {
  try {
    await User.findByIdAndDelete(userId);
  } catch (error) {
    throw error;
  }
};

// admin end


//update user common
const updateUserProfile = async (userId: string, updatedProfile: Partial<TUser>): Promise<TUser | null> => {
  try {
    const user = await User.findByIdAndUpdate(userId, updatedProfile, { new: true });
    return user;
  } catch (error) {
    throw error;
  }
};



// login
const loginUserFromDB = async (username: string, password: string) => {
  try {
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      throw new Error("Invalid login credentials");
    }
    const isPasswordMatched = await User.isPasswordMatched(
      password,
      user.password
    );
    if (!isPasswordMatched) {
      throw new ApplicationError(
        httpStatus.UNAUTHORIZED,
        "Invalid login credentials"
      );
    }
    return user;
  } catch (error) {
    throw new ApplicationError(
      httpStatus.UNAUTHORIZED,
      "Invalid login credentials"
    );
  }
};

const changePassword = async (
  userIdFromToken: string,
  currentPassword: string,
  newPassword: string
) => {
  try {
    const user = await User.findById(userIdFromToken).select(
      "+password +passwordChangeHistory"
    );

    if (!user) {
      console.error("User not found for userId:", userIdFromToken);
      throw new ApplicationError(httpStatus.UNAUTHORIZED, "User not found");
    }

    const isCurrentPasswordMatched = await User.isPasswordMatched(
      currentPassword,
      user.password
    );

    if (!isCurrentPasswordMatched) {
      console.error(
        "Current password is incorrect for userId:",
        userIdFromToken
      );
      throw new ApplicationError(
        httpStatus.UNAUTHORIZED,
        "Current password is incorrect"
      );
    }

    const newPasswordIsValid = await isPasswordChangeValid(user, newPassword);

    if (!newPasswordIsValid) {
      console.error(
        "New password does not meet the requirements for userId:",
        userIdFromToken
      );
      let lastUsedTimestamp: string | null = null;

      if (user.passwordChangeHistory && user.passwordChangeHistory.length > 0) {
        lastUsedTimestamp = new Date(
          user.passwordChangeHistory[
            user.passwordChangeHistory.length - 1
          ].timestamp
        ).toISOString();
      }

      throw new ApplicationError(
        httpStatus.BAD_REQUEST,
        "Password change failed. Ensure the new password is unique and not among the last 2 used" +
          (lastUsedTimestamp
            ? " (last used on " + lastUsedTimestamp + ")."
            : ".")
      );
    }

    user.password = newPassword;

    if (!user.passwordChangeHistory) {
      user.passwordChangeHistory = [];
    }

    user.passwordChangeHistory.push({
      password: newPassword,
      timestamp: new Date().toISOString(),
    });

    if (user.passwordChangeHistory.length > 3) {
      user.passwordChangeHistory.shift();
    }

    await user.save();

    console.log("Password changed successfully for userId:", userIdFromToken);
  } catch (error: any) {
    console.error(
      "Error changing password for userId:",
      userIdFromToken,
      "Error:",
      error.message
    );
    throw error;
  }
};

export const UserServices = {
  createUserIntoDB,
  loginUserFromDB,
  changePassword,
  getMyProfile,
  updateUserProfile,

  // admin
  getAllUsers,
  getUserById,
  deleteUserById,
};
