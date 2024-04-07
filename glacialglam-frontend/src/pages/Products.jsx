/* eslint-disable no-unused-vars */
// Products.jsx
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../features/product/productApi';
import { addToCart } from '../features/order/orderSlice';
import Spinner from '../ui/Spinner';
import { useState } from 'react';
import QuantityModal from '../components/Order/QuantityModal';

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cartItems = useSelector((state) => state?.order?.cartItems);
  console.log('Cart Items:', cartItems);
  const { data, isLoading, isError } = useGetProductsQuery();
  const dispatch = useDispatch();

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error loading products</div>;

  const allProducts = data?.data?.products || [];

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  // const handleAddToCart = (product, quantity) => {
  //   console.log('Adding to cart:', product, quantity);
  //   dispatch(
  //     addToCart({
  //       name: product.name,
  //       qty: quantity,
  //       price: product.price,
  //       product: product._id,
  //       // Add other relevant details from the product
  //     })
  //   );
  // };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Product Page</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allProducts.map((product) => (
          <div key={product._id} className="shadow relative">
            <div
              style={{ backgroundImage: `url(${product.image})` }}
              className="bg-cover bg-center bg-no-repeat h-96 m-10"
            ></div>
            <div className="p-4 bg-white">
              <h3 className="text-xl font-bold mb-4">{product.name}</h3>
              <p className="text-black mb-4">

                {product.description.length > 50 ?
                  product.description.substring(0, 50) + "..." :
                  product.description
                }

              </p>
              <p className="text-black mb-2">
                <span className="font-bold">Brand:</span>

                {product.brand}
              </p>
              <p className="text-black mb-2">
                <span className="font-bold">Price:</span> ${product.price}
              </p>
              <button
                onClick={() => openModal(product)}
                className="bg-indigo-500 text-white px-4 py-2 rounded mt-4"
              >
                Add to Cart
              </button>
              <Link
                to={`/products/${product._id}/reviews`}
                className="text-indigo-500 hover:underline block mt-2"
              >
                View Reviews
              </Link>
              <Link
                to={`/admin/update-products/${product._id}`}
                className="text-indigo-500 hover:underline block mt-2"
              >
                Update by Admin
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Render the QuantityModal */}
      <QuantityModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        product={selectedProduct}
      />
    </div>

  );
};

export default Products;
