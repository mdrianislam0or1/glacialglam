import { Schema, Types, model } from "mongoose";
import { IProduct } from "./product.interface";

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true,unique:true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: { type: Number, required: true },
  tags: [{ name: { type: String, required: true }, isDeleted: { type: Boolean, required: true } }],
  manufacturingDate: { type: String, required: true },
  expireDate: { type: String, required: true },
  countInStock: { type: Number, required: true },
  details: {
    level: { type: String, enum: ["old", "new", "special"], required: true },
    description: { type: String, required: true },
  },
  createdBy: { 
    type: Schema.Types.ObjectId, ref: "User", required: true  }, 
},
{
  timestamps: true,
}

);

const ProductModel = model<IProduct>('Product', ProductSchema);

export default ProductModel;
