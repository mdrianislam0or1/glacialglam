/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/order/orderSlice';
import CommonButton from '../../ui/Button';
import CommonInput from '../../ui/CommonInput';

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
        image: product.image,
        // Add other relevant details from the product
      })
    );
    onRequestClose();
  };


  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? '' : 'hidden'
        }`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onRequestClose}
      ></div>
      <div className="bg-white p-8 w-96 mx-auto  shadow-md z-50">
        <h2 className="text-xl font-bold mb-4">Enter Quantity</h2>
        <CommonInput
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
        />

        <div className="flex justify-end">
          <CommonButton
            onClick={handleAddToCart}
          >
            Add to Cart
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default QuantityModal;
