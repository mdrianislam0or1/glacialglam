import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser, UserModel>({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  passwordChangeHistory: [
    {
      password: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.findByCredentials = async function (
  username: string,
  password: string
) {
  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    throw new Error("Invalid login credentials");
  }

  const isPasswordMatched = await User.isPasswordMatched(
    password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new Error("Invalid login credentials");
  }

  return user;
};

userSchema.statics.isUserExistById = async function (_id: string) {
  return await User.findOne({ _id }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashPassword: string
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;

  return passwordChangedTime > jwtIssuedTimestamp;

  return false;
};

userSchema.methods.isPasswordMatched = async function (
  enteredPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

export const User = model<TUser, UserModel>("User", userSchema);
