import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.service';

//create product

const createProduct = catchAsync(async (req, res) => {
  const productData = req.body;

  const newProduct = await ProductServices.createProduct(productData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product created successfully',
    data: newProduct,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const products = await ProductServices.getAllProducts();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All products retrieved successfully',
    data: products,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const product = await ProductServices.getSingleProductById(productId);
  if (!product) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Product not found',
      data: undefined,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully',
    data: product,
  });
});

const updateSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const updatedProductData = req.body;

  const updatedProduct = await ProductServices.updateSingleProductById(
    productId,
    updatedProductData,
  );

  if (!updatedProduct) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Product not found or could not be updated',
      data: undefined,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: updatedProduct,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const isProductDeleted = await ProductServices.deleteProductById(productId);

  if (!isProductDeleted) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Product not found or could not be deleted',
      data: undefined,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully',
    data: undefined,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteProduct,
};
