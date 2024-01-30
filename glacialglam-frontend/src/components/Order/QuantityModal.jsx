/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/order/orderSlice';

const QuantityModal = ({ isOpen, onRequestClose, product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        name: product.name,
        qty: parseInt(quantity, 10), // Convert to number
        price: product.price,
        product: product._id,
        // Add other relevant details from the product
      })
    );
    onRequestClose();
  };
  

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onRequestClose}
      ></div>
      <div className="bg-white p-8 max-w-md mx-auto rounded shadow-md z-50">
        <h2 className="text-xl font-bold mb-4">Enter Quantity</h2>
        <input
  type="number"
  value={quantity}
  onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
  className="border border-gray-300 p-2 mb-4 w-full"
/>

        <div className="flex justify-end">
          <button
            onClick={handleAddToCart}
            className="bg-indigo-500 text-white px-4 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuantityModal;
