import { Types } from "mongoose";

export type ITag = {
  name: string;
  isDeleted: boolean;
};

export type IDetails = {
  level: "old" | "new" | "special";
  description: string;
};

export type IProduct = {
  _id: Types.ObjectId;
  name: string;
  image: string;
  brand: string;
  description: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: ITag[];
  manufacturingDate: string;
  expireDate: string;
  countInStock: number;
  details: IDetails;
  createdBy: Types.ObjectId;
};
