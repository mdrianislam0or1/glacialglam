import { useEffect, useState } from "react";
import { useGetAllOrderByAdminQuery } from "../../features/order/orderApi";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import axios from "axios";

const GetAllOrder = () => {
  const { data, isLoading, isError, isSuccess, refetch } =
    useGetAllOrderByAdminQuery();
  const [orderIdToUpdate, setOrderIdToUpdate] = useState(null);
  const [currentStatusToUpdate, setCurrentStatusToUpdate] = useState(null);

  const [deleteOrder, setDeleteOrder] = useState(null);

  useEffect(() => {
    const handleDeleteOrder = async () => {
      try {
        if (deleteOrder !== null) {
          const res = await axios.delete(
            `https://glacialglam-backend.vercel.app/api/orders/admin/orders/${deleteOrder}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `${
                  JSON.parse(localStorage.getItem("auth"))?.token
                }`,
              },
            }
          );
          console.log(res.data);
          // Refetch orders after a successful update
          await refetch();
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Call the delivery toggle function when orderIdToUpdate and currentStatusToUpdate change
    handleDeleteOrder();

    const handleDeliveryToggle = async () => {
      try {
        if (orderIdToUpdate !== null && currentStatusToUpdate !== null) {
          const res = await axios.post(
            `https://glacialglam-backend.vercel.app/api/orders/admin/orders/${orderIdToUpdate}/deliver`,
            {
              isDelivered: !currentStatusToUpdate,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `${
                  JSON.parse(localStorage.getItem("auth"))?.token
                }`,
              },
            }
          );
          console.log(res.data);
          // Refetch orders after a successful update
          await refetch();
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Call the delivery toggle function when orderIdToUpdate and currentStatusToUpdate change
    handleDeliveryToggle();
  }, [orderIdToUpdate, currentStatusToUpdate, refetch, deleteOrder]);

  const handleDeleteToggleClick = (orderId) => {
    // Set the orderId and currentStatus to update in the state
    setDeleteOrder(orderId);
  };

  const handleDeliveryToggleClick = (orderId, currentStatus) => {
    // Set the orderId and currentStatus to update in the state
    setOrderIdToUpdate(orderId);
    setCurrentStatusToUpdate(currentStatus);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Error message="Failed to fetch orders" />;
  }

  const orders = data?.data || [];

  return (
    <div className="container mx-auto mt-8  min-h-screen">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>

      {isSuccess && orders.length === 0 && (
        <p className="text-gray-600">No orders found.</p>
      )}

      {isSuccess && orders.length > 0 && (
        <div className="grid  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-lime-100 p-4 rounded-lg shadow-lg mb-4"
            >
              <h3 className="text-xl font-bold mb-2">Order #{order._id}</h3>
              <div className="flex flex-col md:flex-row md:justify-between">
                <div className="text-gray-600">
                  <p>Ordered By: {order.createdBy.username}</p>
                  <p>
                    Order Date: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="text-gray-600 mt-4 md:mt-0">
                  <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
                  <p className="badge badge-accent">Payment: {order.isPaid ? "Paid" : "Not Paid"}</p>
                  <div className="flex items-center">
                    <p className="mr-2">Delivery:</p>
                    <button
                      className={`py-6 px-2 mx-2 rounded text-sm ${
                        order.isDelivered
                          ? "badge badge-warning  gap-2"
                          : "badge badge-warning gap-2"
                      }`}
                      onClick={() =>
                        handleDeliveryToggleClick(order._id, order.isDelivered)
                      }
                    >
                      {order.isDelivered ? "Delivered" : "Not Delivered"}
                    </button>
                    <button
                      onClick={() => handleDeleteToggleClick(order._id)}
                      className="py-6 px-2 mx-2 rounded text-sm badge badge-error gap-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAllOrder;
