import { Link, useParams } from "react-router-dom";
import { useGetProductQuery } from "../features/product/productApi";
import { useGetReviewQuery } from "../features/review/reviewApi"; // Import useGetReviewQuery hook

const ProductDetails = () => {
  const { productId } = useParams();
  const { data: productData, isLoading: productLoading, isError: productError } = useGetProductQuery(productId);
  const { data: reviewData, isLoading: reviewLoading, isError: reviewError } = useGetReviewQuery(productId); // Fetch reviews for the product

  if (productLoading || reviewLoading) return <div>Loading...</div>;
  if (productError) return <div>Error loading product details</div>;
  if (reviewError) return <div>Error loading reviews</div>;

  const productWithReview = productData?.data;

  return (
    <div className="container mx-auto p-8  min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={productWithReview.product.image}
            alt={productWithReview.product.name}
            className="w-full h-auto rounded-md"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">{productWithReview.product.name}</h2>
          <p className="text-gray-600 mb-4">{productWithReview.product.description}</p>
          <p className="text-gray-800 font-semibold">Price: ${productWithReview.product.price}</p>
          <p className="text-gray-800">Brand: {productWithReview.product.brand}</p>
          <p className="text-gray-800">Category: {productWithReview.product.categoryId}</p>
          <p className="text-gray-800">In Stock: {productWithReview.product.countInStock}</p>
          <p className="text-gray-800">Manufacturing Date: {productWithReview.product.manufacturingDate}</p>
          <p className="text-gray-800">Expire Date: {productWithReview.product.expireDate}</p>
          <div>
            What to give rating:
            <Link to={`/products/review/${productId}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Review
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Reviews</h3>
        {reviewData?.data.map(review => (
          <div key={review._id} className="border border-gray-200 p-4 mb-4 rounded">
            <p>Rating: {review.rating}</p>
            <p>Review: {review.review}</p>
            <p>Created By: {review.createdBy.username}</p>
            <p>Created At: {review.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
