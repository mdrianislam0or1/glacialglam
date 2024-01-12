import { Types } from "mongoose";

export type IReview = {
  _id?: Types.ObjectId;
  courseId: Types.ObjectId;
  rating: number;
  review: string;

};
