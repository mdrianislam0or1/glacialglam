import { useGetMyAllOrderQuery, useGetMyProfileQuery } from "../../features/order/orderApi";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import { Link } from "react-router-dom";

const MyOrderProfile = () => {
  const { data: orders, isLoading: orderLoading, isError: orderError, isSuccess: orderSuccess } = useGetMyAllOrderQuery();
  const { data: profile, isLoading: profileLoading, isError: profileError, isSuccess: profileSuccess } = useGetMyProfileQuery();
  const allProfile = profile?.data;
  const allOrder = orders?.data;

  if (orderLoading || profileLoading) {
    return <Spinner />;
  }

  if (orderError || profileError) {
    return <Error message="Something went wrong" />;
  }

  let sidebarContent = null;
  if (profileSuccess) {
    sidebarContent = (
      <div className="bg-lime-100 w-full sm:w-1/4 p-6 overflow-y-auto shadow-sm rounded-lg">
        <div className="text-center">
          <img src={allProfile.image} alt={allProfile.username} className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-white shadow-md" />
          <h2 className="text-xl font-bold mb-2">{allProfile.username}</h2>
          <p className="text-gray-600 mb-4">{allProfile.email}</p>
        </div>
        <hr className="border-gray-300 my-4" />
        <div className="text-gray-600 mb-4">
          <p className="mb-2">
            <span className="font-semibold">Phone:</span> {allProfile.phone}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Address:</span> {allProfile.address}
          </p>
          <p className="mb-2">
            <span className="font-semibold">About:</span> {allProfile.about}
          </p>
        </div>
        <Link to="/profile" className="w-full bg-black text-white py-2 px-4 mt-4 hover:bg-black">Edit Profile</Link>
      </div>

    );
  }

  if (orderSuccess) {
    return (
      <div className="flex flex-col min-h-screen sm:flex-row">
        {/* Sidebar */}
        {sidebarContent}

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">My Orders</h2>
          {allOrder.map((order) => (
            <Link key={order._id} to={`/orders/myOrder/${order._id}`}>
              <div className="mb-8 border rounded-md overflow-hidden shadow-md">
                <div className="bg-lime-100 p-4">
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
                  </ul>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default MyOrderProfile;
