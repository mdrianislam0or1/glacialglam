/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useGetFilterProductsQuery } from '../../features/product/productApi';
import { Link } from 'react-router-dom';
import QuantityModal from '../../components/Order/QuantityModal';
import CommonButton from '../../ui/Button';
import { useSelector } from 'react-redux';
import CommonInput from '../../ui/CommonInput';
import Spinner from '../../ui/Spinner';

const AllProduct = () => {

  // Use a more specific selector to access user data
  const { token, user } = useSelector((state) => state.auth) || {};

  // Check if user data is available
  const isUserAvailable = !!token && !!user;


  console.log("Redux state:", { token, user });

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  // const [level, setLevel] = useState('');

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const { data, error, isLoading, refetch } = useGetFilterProductsQuery({
    minPrice,
    maxPrice,
    // level,
  });

  const handleSearch = () => {
    // Trigger the API call with the updated filter parameters
    refetch();
  };

  if (isLoading) return <Spinner/>;
  if (error) return <div>Error: {error.message}</div>;

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto  min-h-screen">
      <div className="flex justify-center my-4 ">
        <div className='px-4'>
          <CommonInput
            type="number"
            placeholder="Min Price"

            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className='px-4'>
          <CommonInput
            type="number"
            placeholder="Max Price"

            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        {/* <input
          type="text"
          placeholder="Level"
          className="mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        /> */}
        <div className="mt-1">
        <button
          className="px-4 py-2  border-none bg-black text-white "
          onClick={handleSearch}
        >
          Search
        </button>
        </div>

      </div>

      <div>
        <h1 className='text-center text-6xl uppercase'>All Product</h1>
        {data?.data?.products?.length > 0 ? (
          <div className="text-center">
            <small className='text-sm'>{data.data.products.length} Result</small>
             </div>
        ) : (
          <div>

          </div>
        )}
        
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.data?.products?.length > 0 ? (
          data.data.products.map((product) => (
            <div key={product._id} className="shadow-sm p-4">

              <Link
                to={`/products/${product._id}/reviews`}
              >
                <div className=' bg-lime-100'>
                  <img src={product.image} style={{ backgroundSize: "cover", backgroundPosition: "center", width: "100%", }} className=' h-96 object-fill' alt="" />
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



                  {isUserAvailable && user.role === "admin" && (
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
          ))
        ) : (
          <div className="text-center">
            
          </div>
        )}
      </div>

      <QuantityModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default AllProduct;
