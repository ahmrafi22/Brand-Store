import { useEffect } from "react";
import { GiClothes } from "react-icons/gi";
import { LuShoppingBag } from "react-icons/lu";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAdminProducts } from "../redux/slices/adminProductSlice";
import { fetchAllOrders } from "../redux/slices/adminOrderSlice";

const AdminHome = () => {
  const dispatch = useDispatch();
  const { products, loading: productsLoading, error: productsError } = useSelector((state) => state.adminProducts);
  
  const { orders, totalOrders, totalSales, loading: orderLoading, error: orderError } = useSelector((state) => state.adminOrders);
  
  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {productsLoading || orderLoading ? (
        <p>Loading...</p>
      ) : productsError || orderError ? (
        <div>
          {productsError && <p>Error fetching Products: {productsError}</p>}
          {orderError && <p>Error fetching Orders: {orderError}</p>}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 shadow-md rounded-lg">
            <div className="inline-flex items-center space-x-2">
              <RiMoneyDollarBoxLine size={25} />
              <h2 className="text-xl font-semibold">Revenue</h2>
            </div>
            <p className="text-2xl">${totalSales ? totalSales.toFixed(2) : "0.00"}</p>
          </div>

          <div className="p-4 shadow-md rounded-lg">
            <div className="inline-flex items-center space-x-2">
              <LuShoppingBag size={25} />
              <h2 className="text-xl font-semibold">Total Orders</h2>
            </div>
            <p className="text-2xl">{totalOrders || 0}</p>
            <Link to="/admin/orders" className="text-blue-500 hover:underline">
              Manage Orders
            </Link>
          </div>

          <div className="p-4 shadow-md rounded-lg">
            <div className="inline-flex items-center space-x-2">
              <GiClothes size={25} />
              <h2 className="text-xl font-semibold">Total Products</h2>
            </div>
            <p className="text-2xl">{products?.length || 0}</p>
            <Link to="/admin/products" className="text-blue-500 hover:underline">
              Manage Products
            </Link>
          </div>
        </div>
      )}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-500">
            <thead className="bg-gray-200 text-xs uppercase text-gray-700">
              <tr>
                <th className="py-3 px-4">Order Id</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.length > 0 ? (
                orders.map((o) => (
                  <tr
                    key={o._id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="p-4">{o._id}</td>
                    <td className="p-4">{o.user?.name || "N/A"}</td>
                    <td className="p-4">${o.totalPrice?.toFixed(2) || "0.00"}</td>
                    <td className="p-4">{o.status || "Processing"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No recent Orders
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;