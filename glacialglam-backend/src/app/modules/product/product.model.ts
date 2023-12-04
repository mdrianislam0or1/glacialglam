import mongoose, { Schema } from 'mongoose';
import { Product } from './product.interface';

export type ProductDocument = Product & mongoose.Document;

const reviewSchema = new Schema({
  username: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    sizes: [{ type: String }],
    colors: [{ type: String }],
    material: { type: String },
    features: [{ type: String }],
    images: [{ type: String }],
    reviews: [reviewSchema],
    availability: { type: Boolean, default: true },
    relatedProducts: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true },
);

const ProductModel = mongoose.model<ProductDocument>('Product', productSchema);

export default ProductModel;
