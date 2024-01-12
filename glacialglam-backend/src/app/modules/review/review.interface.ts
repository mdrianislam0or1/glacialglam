import { Types } from "mongoose";

export type IReview = {
  _id?: Types.ObjectId;
  productId: Types.ObjectId;
  rating: number;
  review: string;

};
