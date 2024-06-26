import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.service';

const createProductController = catchAsync(
  async (req: Request, res: Response) => {
    try {
      const product = await ProductServices.createProductDB(req.file, req.body);
      console.log(req.file);
      console.log(req.body);

      return res.status(httpStatus.CREATED).json({
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'product created successfully',
        data: product,
      });
    } catch (error: any) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
        data: null,
      });
    }
  },
);

const getProductController = catchAsync(async (req, res) => {
  const result = await ProductServices.getProductsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'products retrieved successfully',
    meta: result.meta,
    data: {
      products: result.data,
    },
  });
});

const updateProductController = async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const updateData = req.body;

  try {
    const updateProduct = await ProductServices.updateProductFromDB(
      productId,
      updateData,
    );

    if (updateProduct) {
      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Product updated successfully',
        data: updateProduct,
      });
    } else {
      sendResponse(res, {
        success: false,
        statusCode: 404,
        message: 'Product not found',
      });
    }
  } catch (error: any) {
    if (error.message.includes('Cast to ObjectId failed')) {
      const errorDetails = {
        stringValue: productId,
        valueType: 'string',
        kind: 'ObjectId',
        value: productId,
        path: '_id',
        reason: {},
        name: 'CastError',
        message: `Cast to ObjectId failed for value '${productId}' (type string) at path '_id' for model 'Product'`,
      };

      sendResponse(res, {
        success: false,
        statusCode: 400,
        message: 'Invalid ID',
        errorMessage: `${productId} is not a valid ID!`,
        errorDetails,
        stack: error.stack || '',
      });
    }

    sendResponse(res, {
      success: false,
      statusCode: 500,
      message: 'Internal Server Error',
      errorMessage: error.message,
      stack: error.stack || '',
    });
  }
};

const getReviewWithProductController = async (req: Request, res: Response) => {
  const productId = req.params.productId;

  try {
    const ProductWithReviews =
      await ProductServices.getReviewByProductId(productId);

    if (ProductWithReviews) {
      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Product with reviews retrieved successfully',
        data: ProductWithReviews,
      });
    } else {
      sendResponse(res, {
        success: false,
        statusCode: 404,
        message: 'Product not found',
      });
    }
  } catch (error: any) {
    if (error.message.includes('Cast to ObjectId failed')) {
      const errorDetails = {
        stringValue: productId,
        valueType: 'string',
        kind: 'ObjectId',
        value: productId,
        path: '_id',
        reason: {},
        name: 'CastError',
        message: `Cast to ObjectId failed for value '${productId}' (type string) at path '_id' for model 'Product'`,
      };

      sendResponse(res, {
        success: false,
        statusCode: 400,
        message: 'Invalid ID',
        errorMessage: `${productId} is not a valid ID!`,
        errorDetails,
        stack: error.stack || '',
      });
    }

    sendResponse(res, {
      success: false,
      statusCode: 500,
      message: 'Internal Server Error',
      errorMessage: error.message,
      stack: error.stack || '',
    });
  }
};

const getBestProductController = async (req: Request, res: Response) => {
  try {
    const bestProduct = await ProductServices.getBestProduct();

    if (bestProduct) {
      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Best product retrieved successfully',
        data: bestProduct,
      });
    } else {
      sendResponse(res, {
        success: false,
        statusCode: 404,
        message: 'No Products found',
      });
    }
  } catch (error: any) {
    sendResponse(res, {
      success: false,
      statusCode: 500,
      message: 'Internal Server Error',
      errorMessage: error.message,
      stack: error.stack || '',
    });
  }
};

// admin delete
const deleteProductController = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await ProductServices.deleteProductById(productId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product deleted successfully',
      data: deletedProduct,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: error.statusCode || httpStatus.BAD_REQUEST,
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// admin get all products

const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const products = await ProductServices.getAllProducts();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Products retrieved successfully',
      data: products,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: error.statusCode || httpStatus.BAD_REQUEST,
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const ProductControllers = {
  createProductController,
  getProductController,
  updateProductController,
  getReviewWithProductController,
  getBestProductController,

  //admin
  deleteProductController,
  getAllProductsController,
};
