/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../features/order/orderApi";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const MyOrder = () => {
  const { orderId } = useParams();
  const { data: myOrder, isLoading, isError } = useGetOrderByIdQuery(orderId);
  const [stripeToken, setStripeToken] = useState(null);

  useEffect(() => {
    // Fetch additional order details or perform other side effects here if needed

    // Cleanup function if necessary
    return () => {
      // Cleanup logic here
    };
  }, [orderId]); // Make sure to include all dependencies

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Error message="Failed to fetch order details" />;
  }

  const {
    shippingAddress,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    isDelivered,
    createdAt,
    createdBy,
  } = myOrder.data;

  const handleToken = async (token) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/orders/payment/${orderId}`,
        {
          tokenId: token.id,
          amount: totalPrice,
        }
      );

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      <StripeCheckout
        name="Glacial Glam"
        description="Payment"
        amount={1000}
        token={handleToken}
        billingAddress
        shippingAddress
        stripeKey="pk_test_51OYVnlBwNKl8486SjlHjmZptbHtCDjWMVVjXl1z6HYuVlZhBlU2oHHuHMi6nf8lqSNCulNJ3WyUwqJltkenzeOvO00heNpyi44"
      >
        <button className="bg-black py-2 px-2 text-white">Payment</button>
      </StripeCheckout>

      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Shipping Address</h3>
        <p>Address: {shippingAddress.address}</p>
        <p>City: {shippingAddress.city}</p>
        <p>Postal Code: {shippingAddress.postalCode}</p>
        <p>Country: {shippingAddress.country}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Order Items</h3>
        <ul className="list-disc pl-4">
          {orderItems.map((item) => (
            <li key={item._id} className="mb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="mr-2">
                    {item.name} - Quantity: {item.qty}
                  </span>
                  <span className="text-gray-600">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Payment Details</h3>
        <p>Payment Method: {paymentMethod}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Order Summary</h3>
        <p>Items Price: ${itemsPrice.toFixed(2)}</p>
        <p>Tax Price: ${taxPrice.toFixed(2)}</p>
        <p>Shipping Price: ${shippingPrice.toFixed(2)}</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Order Status</h3>
        <p>Payment: {isPaid ? "Paid" : "Not Paid"}</p>
        <p>Delivery: {isDelivered ? "Delivered" : "Not Delivered"}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Order Information</h3>
        <p>Order ID: {orderId}</p>
        <p>Order Date: {new Date(createdAt).toLocaleString()}</p>
        <p>Ordered By: {createdBy.username}</p>
        <p>Contact Email: {createdBy.email}</p>
      </div>
    </div>
  );
};

export default MyOrder;
