import ReviewModel from "../review/review.model";
import { IProduct } from "./product.interface";
import QueryBuilder from "../../Query/Query";
import { IReview } from "../review/review.interface";
import ProductModel from "./product.model";

const createProductDB = async (productData: IProduct): Promise<IProduct> => {
  const createProduct = await ProductModel.create({
    ...productData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return createProduct;
};


const getProductsFromDB = async (query: Record<string, unknown>) => {
  const {
    page = 1,
    limit = 10,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    tags,
    manufacturingDate,
    expireDate,
    level,
  } = query;

  const filter: Record<string, unknown> = {};

  if (minPrice !== undefined && maxPrice !== undefined) {
    filter.price = { $gte: minPrice, $lte: maxPrice };
  }

  if (tags !== undefined) {
    filter["tags.name"] = { $in: Array.isArray(tags) ? tags : [tags] };
  }

  if (manufacturingDate !== undefined && expireDate !== undefined) {
    filter.manufacturingDate = { $gte: manufacturingDate };
    filter.expireDate = { $lte: expireDate };
  }

  if (level !== undefined) {
    filter["details.level"] = level;
  }

  const productQuery = new QueryBuilder(
    ProductModel.find(filter).populate({
      path: "createdBy",
      select: "-password -passwordChangeHistory -createdAt -updatedAt",
    }),
    query
  )
    .sort()
    .paginate()
    .fields();

  const data = await productQuery.modelQuery;
  const meta = {
    page: Number(page),
    limit: Number(limit),
    total: data.length,
  };

  return { data, meta };
};


const updateProductFromDB = async (
  productId: string,
  update: Partial<IProduct>
): Promise<IProduct | undefined> => {
  try {
    const existingProduct = await ProductModel.findById(productId).populate({
      path: "createdBy",
      select: "-password -passwordChangeHistory",
    });

    if (!existingProduct) {
      return null || undefined;
    }

    const ismanufacturingDateUpdated =
      update.manufacturingDate !== undefined &&
      update.manufacturingDate !== new Date(existingProduct.manufacturingDate).toISOString();
    const isexpireDateUpdated =
      update.expireDate !== undefined &&
      update.expireDate !== new Date(existingProduct.expireDate).toISOString();

    if (ismanufacturingDateUpdated || isexpireDateUpdated) {
      if (ismanufacturingDateUpdated) {
        existingProduct.manufacturingDate = new Date(update.manufacturingDate!).toISOString();
      }
      if (isexpireDateUpdated) {
        existingProduct.expireDate = new Date(update.expireDate!).toISOString();
      }

      const manufacturingDate = new Date(existingProduct.manufacturingDate);
      const expireDate = new Date(existingProduct.expireDate);
    }

    if (update.tags !== undefined && Array.isArray(update.tags)) {
      existingProduct.tags = existingProduct.tags.filter(
        (existingTag) =>
          !(update.tags ?? []).some(
            (updatedTag) =>
              updatedTag.name === existingTag.name &&
              updatedTag.isDeleted === true
          )
      );
      existingProduct.tags = [
        ...existingProduct.tags,
        ...(update.tags ?? []).filter((tag) => !tag.isDeleted),
      ];

      delete update.tags;
    }

    if (update.details !== undefined) {
      existingProduct.details = {
        ...existingProduct.details,
        ...update.details,
      };

      if (update.details.level !== undefined) {
        existingProduct.details.level = update.details.level;
      }
      if (update.details.description !== undefined) {
        existingProduct.details.description = update.details.description;
      }
    }

    for (const [key, value] of Object.entries(update)) {
      if (
        key !== "details" &&
        key !== "manufacturingDate" &&
        key !== "expireDate" &&
        key !== "tags"
      ) {
        (existingProduct as any)[key] = value;
      }
    }

    const updateProduct = await existingProduct.save();

    return updateProduct;
  } catch (error:any) {
    throw error;
  }
};

const getReviewByProductId = async (
  productId: string
): Promise<{ product: IProduct; reviews: IReview[] } | null> => {
  try {
    const product = await ProductModel.findById(productId)
      .select("-createdAt -updatedAt -__v")
      .populate({
        path: "createdBy",
        select: "-password -passwordChangeHistory",
      });

    if (!product) {
      return null;
    }

    const reviews = await ReviewModel.find({ productId })
      .select("-createdAt -updatedAt -__v")
      .populate({
        path: "createdBy",
        select: "-password -passwordChangeHistory",
      });

    return { product, reviews };
  } catch (error) {
    throw error;
  }
};



const getBestProduct = async (): Promise<{
  product: IProduct;
  averageRating: number;
  reviewCount: number;
} | null> => {
  try {
    const bestProduct = await ProductModel.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "productId",
          as: "reviews",
        },
      },
      {
        $addFields: {
          averageRating: { $avg: "$reviews.rating" },
          reviewCount: { $size: "$reviews" },
        },
      },
      {
        $sort: {
          averageRating: -1,
          reviewCount: -1,
        },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          _id: 1,
          name: 1,
          instructor: 1,
          categoryId: 1,
          price: 1,
          tags: 1,
          manufacturingDate: 1,
          expireDate: 1,
          countInStock: 1,
          details: 1,
          averageRating: 1,
          reviewCount: 1,
        },
      },
    ]);

    if (bestProduct.length === 0) {
      return null;
    }

    return {
      product: bestProduct[0],
      averageRating: bestProduct[0].averageRating || 0,
      reviewCount: bestProduct[0].reviewCount || 0,
    };
  } catch (error) {
    throw error;
  }
};

export const ProductServices = {
  createProductDB,
  getProductsFromDB,
  updateProductFromDB,
  getReviewByProductId,
  getBestProduct,
};
