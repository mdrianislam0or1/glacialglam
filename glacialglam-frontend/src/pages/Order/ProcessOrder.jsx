import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../features/order/orderSlice";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import Success from "../../ui/Success";
import { useAddOrderItemsMutation } from "../../features/order/orderApi";
import {toast} from 'sonner'
const ProcessOrder = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.order.cartItems);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const [addOrderItems, { isLoading, isError, isSuccess }] =
    useAddOrderItemsMutation();

  const handlePlaceOrder = async () => {
    try {
      // Prepare order data
      const orderData = {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item.product,
        })),
        shippingAddress: {
          address,
          city,
          postalCode,
          country,
        },
        paymentMethod,
        paymentResult: {}, // Add an empty object for paymentResult
        itemsPrice: cartItems.reduce((total, item) => total + item.price, 0),
        taxPrice: 0, // You can calculate tax on the server if needed
        shippingPrice: 10, // Assuming a fixed shipping price
        totalPrice:
          cartItems.reduce((total, item) => total + item.price, 0) + 10,
        isPaid: false,
        isDelivered: false,
      };

      // Call the mutation to add order items
      const result = await addOrderItems(orderData).unwrap();

      console.log("Order placed successfully:", result);

      // Clear the cart or perform any other necessary actions
      // ...
    } catch (error) {
      console.error("Error placing order:", error);
      console.error( "real msg",);

      toast.error(`${error?.data?.message}` );
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-white shadow-lg rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">
        Process Your Order
      </h2>
      <form>
        {isError && <Error message="    Invalid request. Missing required properties."/>}
        {isLoading && <Spinner />}
        {isSuccess && <Success message="Order successful" />}
        {/* Shipping Address Fields */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Address:
          </label>
          <input
            type="text"
            className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            City:
          </label>
          <input
            type="text"
            className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Postal Code:
          </label>
          <input
            type="text"
            className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Country:
          </label>
          <input
            type="text"
            className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        {/* Payment Method Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Payment Method:
          </label>
          <input
            type="text"
            className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your payment method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>

        {/* Order Items */}
        <h3 className="text-xl font-bold mb-2 text-gray-800">Order Items</h3>
        <ul className="list-disc pl-4">
          {cartItems.map((item) => (
            <li
              key={item.product}
              className="mb-2 border-b pb-2 flex justify-between items-center"
            >
              <div>
                <span className="text-lg text-gray-700">
                  {item.name} - Quantity: {item.qty}
                </span>
                <span className="block text-sm text-gray-500">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.product)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        {/* Total Price */}
        <div className="flex items-center justify-between mt-4">
          <span className="font-bold text-xl text-gray-800">Total:</span>
          <span className="text-xl font-bold text-blue-500">
            ${cartItems
              .reduce((total, item) => total + item.price, 0)
              .toFixed(2)}
          </span>
        </div>

        {/* Place Order Button */}
        <button
          type="button"
          onClick={handlePlaceOrder}
          className="bg-blue-500 text-white px-6 py-3 mt-6 rounded-full focus:outline-none hover:bg-blue-600"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default ProcessOrder;
