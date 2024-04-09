import { Link, useParams } from "react-router-dom";
import { useGetProductQuery } from "../features/product/productApi";
import { useGetReviewQuery } from "../features/review/reviewApi"; // Import useGetReviewQuery hook
import QuantityModal from "../components/Order/QuantityModal";
import { useState } from "react";
import Spinner from "../ui/Spinner";
import Error from "../ui/Error";

const ProductDetails = () => {

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0); // Initialize rating state with default value

  const { productId } = useParams();
  const { data: productData, isLoading: productLoading, isError: productError } = useGetProductQuery(productId);
  const { data: reviewData, isLoading: reviewLoading, isError: reviewError } = useGetReviewQuery(productId); // Fetch reviews for the product

  if (productLoading || reviewLoading) return 

    <Spinner/>

  ;
  if (productError) return 
  <>
    <Error message="Failed to fetch product details" />
  </>
  if (reviewError) return <>
  <Error message="Failed to fetch product review" />
  </>;

  const productWithReview = productData?.data;

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

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
        <div className="p-3 my-10">
          <div className="flex justify-between align-middle">
            <div className="py-2">
              <h2 className="text-2xl font-bold mb-4">{productWithReview.product.name}</h2>
            </div>

            <div className="py-2">
              <p className="text-black font-semibold">Price: ${productWithReview.product.price}</p>
            </div>
          </div>
          <div className="flex justify-between align-middle">
            <div className="py-2">
              <p className="text-black">Brand: {productWithReview.product.brand}</p>
            </div>

            <div className="py-2">
              <p className="text-black">Level: {productWithReview.product.details?.level}</p>
            </div>
          </div>

          <div className="flex justify-between align-middle">
            <div className="py-2">
              <p className="text-black">Expire Date: {productWithReview.product.expireDate}</p>
            </div>

            <div className="py-2">
              <p className="text-black">In Stock: {productWithReview.product.countInStock}</p>
            </div>
          </div>
         <div className="py-4">
         <p className="text-black text-xl mb-4">{productWithReview.product.description}</p>
         </div>


          <div>
           
            <Link to={`/products/review/${productId}`}>
              <button   className=" w-full bg-black text-white py-2 px-4 mt-4 hover:bg-black">
                Review
              </button>
            </Link>

            <button
            className=" w-full border  py-2 px-4 mt-4 border-black"
               onClick={() => openModal( productWithReview.product)}
             >
               Add to Cart
             </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Reviews</h3>
        {reviewData?.data.map(review => (
       <div key={review._id} className="grid grid-cols-3 gap-4">
       <div className="border border-black p-4 mb-4 rounded">
         <div className="rating">
           {[1, 2, 3, 4, 5].map((star) => (
             <input
               key={star}
               type="radio"
               name="rating"
               className={`mask mask-star-2 bg-orange-400 ${star <= rating ? "checked" : ""}`}
               onChange={() => handleRatingChange(star)}
             />
           ))}
         </div>
         <p>Review: {review.review}</p>
         <p>Author: {review.createdBy.username}</p>
         
         <p>Created At: {new Date(review.createdAt).toLocaleString()}</p>
       </div>
     </div>
        ))}
      </div>

      <QuantityModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default ProductDetails;
