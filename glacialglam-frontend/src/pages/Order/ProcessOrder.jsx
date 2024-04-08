import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../features/order/orderSlice";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import Success from "../../ui/Success";
import { useAddOrderItemsMutation } from "../../features/order/orderApi";
import { toast } from 'sonner'
import CommonInput from "../../ui/CommonInput";
import { Link } from "react-router-dom";
const ProcessOrder = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.order.cartItems);
  console.log("Cart Items:", cartItems);
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
      console.error("real msg",);

      toast.error(`${error?.data?.message}`);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4 min-h-screen">
      <h2 className="text-6xl font-bold uppercase mb-6 text-center ">
        CHEckout Process
      </h2>
      <p className="text-sm text-center  font-bold mb-2 py-2">
       Are you allready have an account? 
       <Link to="/login" className=" underline px-1">
       Please login
       </Link>
      </p>
      <form>
        {isError && <Error message="    Invalid request. Missing required properties." />}
        {isLoading && <Spinner />}
        {isSuccess && <Success message="Order successful" />}
        {/* Shipping Address Fields */}
        <div className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">
                    Address:
                  </label>
                  <CommonInput
                    type="text"

                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">
                    City:
                  </label>
                  <CommonInput
                    type="text"
                    className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Enter your city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Postal Code:
                    </label>
                    <CommonInput
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
                    <CommonInput
                      type="text"
                      className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
                      placeholder="Enter your country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>



            {/* Payment Method Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Payment Method:
              </label>
              <CommonInput
                type="text"
                className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your payment method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div>
              {/* Order Items */}
              <h3 className="text-xl uppercase font-bold mb-2 text-gray-800">
                Your Basket
              </h3>
              <ul className="list-disc pl-4">
                {cartItems.map((item) => (
                  <li
                    key={item.product}
                    className="mb-2 border-b pb-2 flex justify-between items-center"
                  >
                    <div className=" grid grid-cols-2 gap-10">
                      <div className="">
                        <img  className="bg-lime-100 object-contain h-20 w-20" src={item.image} alt="" />
                      </div>
                     <div>
                     <div className="text-lg text-black">
                        Name: {item.name} 
                      </div>
                     <div className="text-lg text-black">
                         Quantity: {item.qty}
                      </div>
                      <div className="block text-sm text-black">
                         Price: ${item.price.toFixed(2)}
                      </div>
                     </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.product)}
                      className="bg-lime-300  px-3 py-1 border-none"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>

              {/* Total Price */}
              <div className="flex items-center justify-between mt-4">
                <span className="font-bold text-xl text-black">Total:</span>
                <span className="text-xl font-bold">${cartItems.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2)}</span>
              </div>

              {/* Place Order Button */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                className=" w-full bg-black text-white py-2 px-4 mt-4 hover:bg-black"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>


      </form>
    </div>
  );
};

export default ProcessOrder;
