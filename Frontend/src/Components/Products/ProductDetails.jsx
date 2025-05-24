import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productsSlice";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );

  const { user, guestId } = useSelector((state) => state.auth);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonOff, setIsButtonOff] = useState(false);

  const productFetchId = productId || id;
  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId)),
        dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);
  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantitityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleColorSelect = (color) => {
    setSelectedColor((prevColor) => (prevColor === color ? "" : color));
  };

  const handleSizeSelect = (size) => {
    setSelectedSize((prevSize) => (prevSize === size ? "" : size));
  };

  const handleaddtoCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select a size and color before adding to cart", {
        duration: 1000,
      });
      return;
    }

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Product added to the cart", { duration: 1000 });
      })
      .finally(() => {
        setIsButtonOff(false);
      });
  };

  if (loading) {
    return <p>Loading....</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Add this right after your useSelector call

  return (
    <div className="p-6">
      {selectedProduct && (
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
          <div className="flex flex-col md:flex-row">
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct.images.map((image, index) => (
                <img
                  onClick={() => setMainImage(image.url)}
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className="w-20 h-20 object-cover rounded-[12px] cursor-pointer border border-gray-300"
                />
              ))}
            </div>
            <div className="md:w-1/2">
              <div className="mb-4">
                <img
                  src={mainImage}
                  alt="Main Products"
                  className="w-full h-auto object-cover rounded-[12px]"
                />
              </div>
            </div>
            <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className="w-20 h-20 object-cover rounded-[12px] cursor-pointer border border-gray-300"
                />
              ))}
            </div>
            <div className="md:w-1/2 md:ml-10">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                {selectedProduct.name}
              </h1>
              <p className="text-lg text-gray-600 mb-1 line-through">
                ${selectedProduct.originalPrice}
              </p>
              <p className="text-xl text-gray-500 mb-2">
                ${selectedProduct.price}
              </p>
              <p className="mb-4">{selectedProduct.description}</p>
              <div className="mb-4">
                <p className="text-gray-700">Colors:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => handleColorSelect(color)}
                      className={`w-10 h-10 rounded-full transition-all ${
                        selectedColor === color
                          ? "ring-2 ring-offset-2 ring-black"
                          : "ring-1 ring-gray-200"
                      }`}
                      style={{
                        backgroundColor: color.toLowerCase(),
                      }}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <p className="text-gray-700">Size:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      onClick={() => handleSizeSelect(size)}
                      key={size}
                      className={`px-4 py-2 text-sm font-medium rounded border transition-colors ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => handleQuantitityChange("minus")}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <span className="sr-only">Decrease quantity</span>
                    <span className="text-xl">−</span>
                  </button>
                  <span className="text-lg font-medium w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantitityChange("plus")}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <span className="sr-only">Increase quantity</span>
                    <span className="text-xl">+</span>
                  </button>
                </div>
              </div>
              <button
                onClick={handleaddtoCart}
                disabled={isButtonOff}
                className={`bg-black text-white px-6 py-2 w-full mb-4 rounded-sm ${
                  isButtonOff
                    ? "cursor-not-allowed bg-black/30"
                    : "hover:bg-gray-900"
                }`}
              >
                {isButtonOff ? "Adding..." : "Add to Cart"}
              </button>
              <div className="mt-10 text-gray-700">
                <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
                <table className="w-full text-left text-sm text-gray-600">
                  <tbody>
                    <tr>
                      <td className="py-1">Brand</td>
                      <td className="py-1">{selectedProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Material</td>
                      <td className="py-1">{selectedProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mt-20 ">
            <h2 className="text-2xl text-center font-medium mb-4">
              {" "}
              You may also Like
            </h2>
            <ProductGrid
              products={similarProducts || []}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
