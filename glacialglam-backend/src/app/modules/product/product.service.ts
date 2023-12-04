import ProductModel, { ProductDocument } from './product.model';
import { Product } from './product.interface';

//create product
const createProduct = async (
  productData: Product,
): Promise<ProductDocument> => {
  try {
    const newProduct = await ProductModel.create(productData);
    return newProduct;
  } catch (error) {
    // Handle the error, e.g., log it or throw a custom error
    console.error('Error creating product:', error);
    throw error;
  }
};

const getAllProducts = async (): Promise<ProductDocument[]> => {
  try {
    const products = await ProductModel.find();
    return products;
  } catch (error) {
    console.error('Error getting all products:', error);
    throw error;
  }
};

const getSingleProductById = async (
  productId: string,
): Promise<ProductDocument | null> => {
  try {
    const product = await ProductModel.findById(productId);
    return product;
  } catch (error) {
    console.error('Error getting single product by ID:', error);
    throw error;
  }
};

const updateSingleProductById = async (
  productId: string,
  updatedProductData: Product,
): Promise<ProductDocument | null> => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }, // Return the updated product
    );
    return updatedProduct;
  } catch (error) {
    console.error('Error updating single product by ID:', error);
    throw error;
  }
};

const deleteProductById = async (productId: string): Promise<boolean> => {
  try {
    const result = await ProductModel.findByIdAndDelete(productId);
    return !!result;
  } catch (error) {
    console.error('Error deleting product by ID:', error);
    throw error;
  }
};

export const ProductServices = {
  createProduct,
  getAllProducts,
  getSingleProductById,
  updateSingleProductById,
  deleteProductById,
};
