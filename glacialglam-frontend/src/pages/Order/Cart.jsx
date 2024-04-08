import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../features/order/orderSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.order.cartItems);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="container mx-auto mt-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Your Cart ({cartItems.length})</h2>
      
      <div className="flex items-center justify-between py-3">
        <span className="font-bold">Give More Details</span>
        <span className="text-xl font-bold">
          <Link to="/process-order">
            <button className="btn btn-red">
              Process Order
            </button>
          </Link>
        </span>
      </div>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul className="divide-y divide-gray-200">
            {cartItems.map(item => (
              <li key={item.product} className="py-4 flex justify-between items-center">
                <div className="flex items-center">
                  <span className="font-bold mr-2">{item.name}</span>
                  <span className="text-gray-600">- Quantity: {item.qty}</span>
                </div>
                <div>
                  <span className="text-gray-600">${item.price.toFixed(2)}</span>
                  <button
                    onClick={() => handleRemoveFromCart(item.product)}
                    className="btn btn-red ml-4"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
            <li className="py-4 flex justify-between items-center">
              <span className="font-bold">Total:</span>
              <span className="text-xl font-bold">${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Cart;
