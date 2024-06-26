import { Types } from "mongoose";

export type IReview = {
  _id?: Types.ObjectId;
  productId: Types.ObjectId;
  rating: number;
  review: string;
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
