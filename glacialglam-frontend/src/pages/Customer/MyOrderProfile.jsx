import { useGetMyAllOrderQuery } from "../../features/order/orderApi";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import { Link } from "react-router-dom";

const MyOrderProfile = () => {
  const { data: orders, isLoading, isError, isSuccess } = useGetMyAllOrderQuery();
  const allOrder = orders?.data;

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Error message="Something went wrong" />;
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto mt-8  min-h-screen">
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
        {allOrder.map((order) => (
          <Link key={order._id}  to={`/orders/myOrder/${order._id}`}>
               <div className="mb-8 border p-4 rounded">
            <h3 className="text-xl font-bold mb-2">Order Details</h3>
            <ul className="list-disc pl-4">
              <li>
                <strong>Order ID:</strong> {order._id}
              </li>
              <li>
                <strong>Order Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </li>
              <li>
                <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
              </li>
              <li>
                <strong>Payment Method:</strong> {order.paymentMethod}
              </li>
              <li>
                <strong>Shipping Address:</strong>{" "}
                {`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}
              </li>
              {/* Add more details based on your requirements */}
            </ul>
          </div>
          </Link>
        ))}
      </div>
    );
  }

  return <div>MyOrderProfile</div>;
};

export default MyOrderProfile;
