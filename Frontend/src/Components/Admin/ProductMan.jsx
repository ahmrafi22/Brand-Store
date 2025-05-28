import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, fetchAdminProducts } from "../../redux/slices/adminProductSlice";

const ProductManage = () => {
  const dispatch = useDispatch()
  const { products , loading, error } = useSelector( (state) => state.adminProducts)

  useEffect(() => {
    dispatch(fetchAdminProducts())
  },[dispatch])

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  }

  if (loading) return <p>Loading ...</p>
  if (error) return <p>Something went Wrong ...</p>

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 "> Product Management</h2>
      <div className="min-w-full text-left text-gray-500">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <td className="py-3 px-4">Name</td>
              <td className="py-3 px-4">Price</td>
              <td className="py-3 px-4">Sku</td>
              <td className="py-3 px-4">Actions</td>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product}
                  className="border-b border-gray-300 cursor-pointer"
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="p-4 ">${product.price}</td>
                  <td className="p-4 ">${product.sku}</td>
                  <td className="p-4 flex  gap-2 ">
                    <Link to={`/admin/product/${product._id}/edit`} 
                    className="bg-yellow-500 text-white rounded-sm py-2 px-[15px] mr-2 hover:bg-yellow-600"> Edit </Link>
                    <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white rounded-sm py-1.5 px-2 hover:bg-red-600"> Delete </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500"> No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManage;
