import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../features/order/orderSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.order.cartItems);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    console.log(productId)
  };

 

  return (
    <div className="container mx-auto mt-8">

      <h2 className="text-2xl font-bold mb-4">Your Cart ({cartItems.length})</h2>
      <div className="flex items-center justify-between py-3">
              <span className="font-bold">Give More Details</span>
              <span className="text-xl font-bold">
                <Link to="/process-order">
              <button className="bg-red-500 text-white px-2 py-1 rounded">
                Process Order
              </button>
              </Link>
              </span>
            </div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
       <div>
         
         <ul className="list-disc pl-4">
          {cartItems.map(item => (
            <li key={item.product} className="mb-2 border-b pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="mr-2">{item.name} - Quantity: {item.qty}</span>
                  <span className="text-gray-600">${item.price.toFixed(2)}</span>
                </div>
                <div>
                  <button
                    onClick={() => handleRemoveFromCart(item.product)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
          <li className="mt-2">
            <div className="flex items-center justify-between">
              <span className="font-bold">Total:</span>
              <span className="text-xl font-bold">${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}</span>
            </div>
          </li>

        </ul>
        </div>
      )}
    </div>
  );
};

export default Cart;
