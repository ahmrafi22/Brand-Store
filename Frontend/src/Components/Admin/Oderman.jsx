import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllOrders, updateOrderStatus } from "../../redux/slices/adminOrderSlice";

const OrderMange = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error, updateError } = useSelector((state) => state.adminOrders);
  
  // Status update tracking to provide user feedback
  const [updatingOrderIds, setUpdatingOrderIds] = useState([]);
  
  useEffect(() => {
    if (!user || user.role !== "Admin") {
      navigate("/");
    } else {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, user, navigate]);
  
  const handleStatusChange = (orderId, newStatus) => {
    setUpdatingOrderIds(prev => [...prev, orderId]);
    
    dispatch(updateOrderStatus({ id: orderId, newStatus }))
      .then(() => {

        setUpdatingOrderIds(prev => prev.filter(id => id !== orderId));
      })
      .catch(() => {

        setUpdatingOrderIds(prev => prev.filter(id => id !== orderId));
      });
  };
  

  const isUpdating = (orderId) => updatingOrderIds.includes(orderId);

  if (loading) return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>
      <p className="text-center py-4">Loading orders...</p>
    </div>
  );
  
  if (error) return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>
      <p className="text-center py-4 text-red-500">Error: {error}</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>
      
      {updateError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Failed to update order: {updateError}
        </div>
      )}
      
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <td className="py-3 px-4">Order ID</td>
              <td className="py-3 px-4">Customer</td>
              <td className="py-3 px-4">Total Price</td>
              <td className="py-3 px-4">Status</td>
              <td className="py-3 px-4">Actions</td>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-300 hover:bg-gray-50"
                >
                  <td className="py-4 px-4 font-medium text-gray-900">
                    {order._id.substring(0, 8)}...
                  </td>
                  <td className="p-4">{order.user?.name || "Unknown"}</td>
                  <td className="p-4">${order.totalPrice?.toFixed(2) || "0.00"}</td>
                  <td className="p-4">
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                      value={order.status || "processing"}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      disabled={isUpdating(order._id)}
                    >
                      <option value="processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    {isUpdating(order._id) && (
                      <span className="ml-2 text-blue-500 text-sm">Updating...</span>
                    )}
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleStatusChange(order._id, "Delivered")} 
                      className={`${
                        order.status === "Delivered" || isUpdating(order._id)
                          ? "bg-gray-400"
                          : "bg-green-500 hover:bg-green-600"
                      } text-white px-4 py-2 rounded-sm transition`}
                      disabled={order.status === "Delivered" || isUpdating(order._id)}
                    >
                      {isUpdating(order._id) ? "Updating..." : "Mark as Delivered"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-600">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderMange;