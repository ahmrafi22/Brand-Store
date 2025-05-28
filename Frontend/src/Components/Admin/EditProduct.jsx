import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails, updateProduct } from "../../redux/slices/productsSlice";
import axios from "axios";

const EditProduct = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { selectedProduct, loading, error } = useSelector((state) => state.products)
  const [productData, setproductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: [],
    gender: "",
    images: [
    ],
  });

  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id))
    }
  },[dispatch, id])

  useEffect(() => {
    if (selectedProduct){
      setproductData(selectedProduct)
    }
  },[selectedProduct])

  const handlechange = (e) => {
    const { name, value } = e.target;
    setproductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file)

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      setproductData((perv) => ({
        ...perv, 
        images: [...perv.images, { url: data.imageUrl, altText: "productImg" }]
      }))
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Image upload failed. Please try again.");
      setUploading(false)
    }
  };
  
  const handleSUbmit =(e) => {
    e.preventDefault();
    dispatch(updateProduct({id, productData}))
    navigate("/admin/products")
    
  }

  if (loading) return <p>Loading....</p>

  if (error) return <p>Something went Wrong....</p>
  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSUbmit}>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handlechange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none "
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2">Discription</label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2"
            rows={4}
            required
            onChange={handlechange}
            name="description"
            value={productData.description}
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handlechange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none "
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2">Count in Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handlechange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none "
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2">Sku</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handlechange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none "
          />

          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Sizes (comma sperated){" "}
            </label>
            <input
              type="text"
              name="sizes"
              value={productData.sizes.join(", ")}
              onChange={(e) =>
                setproductData({
                  ...productData,
                  sizes: e.target.value.split(",").map((size) => size.trim()),
                })
              }
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none "
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Colors (comma sperated){" "}
            </label>
            <input
              type="text"
              name="colors"
              value={productData.colors.join(", ")}
              onChange={(e) =>
                setproductData({
                  ...productData,
                  colors: e.target.value
                    .split(",")
                    .map((color) => color.trim()),
                })
              }
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none "
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">Upload Image</label>
            <input
              className="px-2 py-2 w-fit border border-gray-400"
              type="file"
              onChange={handleUpload}
            />
            {uploading && <p className="text-green-500">Uploading image...</p>}
            <div className="flex gap-4 mt-4">
              {productData.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image.url}
                    alt="productimg"
                    className="w-20 h-20 object-cover rounded-md shadow-md"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
