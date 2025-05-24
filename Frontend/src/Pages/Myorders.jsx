import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/slices/orderSlice";

const MyOrder = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { orders , loading , error } = useSelector((state) => state.orders)

  useEffect(() => {
    dispatch(fetchUserOrders())
  },[dispatch])

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`)
  }
  if (loading) return <p>Loading .... </p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">MY Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-sm uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3 whitespace-nowrap">Order ID</th>
              <th className="py-2 px-4 sm:py-3 whitespace-nowrap">Created</th>
              <th className="py-2 px-4 sm:py-3 whitespace-nowrap">Shipping</th>
              <th className="py-2 px-4 sm:py-3 whitespace-nowrap">Items</th>
              <th className="py-2 px-4 sm:py-3 whitespace-nowrap">Price</th>
              <th className="py-2 px-4 sm:py-3 whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id) }
                  className="border-b hover:border-gray-50 cursor-pointer"
                >
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt="Order"
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 whitespace-nowrap">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "Not Found"}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">{order.orderItems.length}</td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 whitespace-nowrap">
                    ${order.totalPrice}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <span
                      className={`${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "text-red-700 bg-red-100"
                      } py-2 px-2 text-sm font-medium rounded-md`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                  You have no orders right now.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
