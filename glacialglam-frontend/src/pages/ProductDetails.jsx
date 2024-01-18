import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../features/product/productApi";

const ProductDetails = () => {
  const { productId } = useParams();
  const { data, isLoading, isError } = useGetProductQuery(productId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading product details</div>;

  const productWithReview = data?.data;
  console.log(JSON.parse(localStorage.getItem("auth"))?.token);
  return (
    <div className="container mx-auto p-8">
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
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Reviews</h3>
        {productWithReview.reviews.map((review) => (
          <div key={review._id} className="border-b border-gray-300 py-4">
            <p className="text-gray-800 font-semibold">Rating: {review.rating}</p>
            <p className="text-gray-600">{review.review}</p>
            <p className="text-gray-700 mt-2">By: {review.createdBy.username}</p>
            <p className="text-gray-700">Email: {review.createdBy.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
