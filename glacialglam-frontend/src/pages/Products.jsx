/* eslint-disable no-unused-vars */
// Products.jsx
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../features/product/productApi';
import { addToCart } from '../features/order/orderSlice';
import Spinner from '../ui/Spinner';
import { useState } from 'react';
import QuantityModal from '../components/Order/QuantityModal';
import CommonButton from '../ui/Button';

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

     // Use a more specific selector to access user data
     const { token, user } = useSelector((state) => state.auth) || {};

     // Check if user data is available
     const isUserAvailable = !!token && !!user;
  

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {allProducts.map((product) => (
           <div key={product._id} className="shadow-sm p-4">
              
           <Link
               to={`/products/${product._id}/reviews`}
             >
           <div className=' bg-lime-100'>
             <img src={product.image} style={{backgroundSize:"cover", backgroundPosition:"center", width:"100%",}} className=' h-96 object-fill' alt="" />
           </div>

         </Link>
           <div className='flex justify-between align-middle py-4'>
             <div>
               <div className="font-semibold  text-sm">{product.name}</div>
               <div className="text-gray-700 text-sm">Brand: {product.brand}</div>
               <div className="text-gray-700 text-sm">Price: ${product.price}</div>

               <Link
               to={`/products/${product._id}/reviews`}
             >
            <button className="btn btn-xs">Details</button>
             </Link>
             </div>
             <div >
             <CommonButton
               onClick={() => openModal(product)}
             >
               Add to Cart
             </CommonButton>
            
             
           
            {isUserAvailable && user.role ==="admin" && (
              <Link
              to={`/admin/update-products/${product._id}`}
              className="text-indigo-500 hover:underline block mt-2"
            >
             <CommonButton>
             Update by Admin
             </CommonButton>
            </Link>)
           }
           
           </div>
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
