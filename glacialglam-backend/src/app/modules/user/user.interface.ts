import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt?: string;
  updatedAt?: string;
  // extra
  phone?: Number;
  image?: string;
  address?: string;
  about?: string;
  passwordChangeHistory?: {
    password: string;
    timestamp: string;
  }[];
}

export interface UserModel extends Model<TUser> {
  isUserExistById(_id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
