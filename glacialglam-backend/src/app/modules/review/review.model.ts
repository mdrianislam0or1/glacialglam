import { model, Schema } from "mongoose";
import { IReview } from "./review.interface";

const ReviewSchema = new Schema<IReview>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
  },
  { timestamps: true }
);

const ReviewModel = model<IReview>("Review", ReviewSchema);

export default ReviewModel;
