import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import axios from "axios";

const CheckOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  // Debug log to see what's in the cart
  useEffect(() => {
    console.log("Cart in checkout:", cart);
  }, [cart]);

  // Fix: Removed automatic redirect, will handle empty cart differently
  // This is to prevent incorrect redirections

  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check both properties since we don't know which one is correct
    const cartProducts = cart?.products || cart?.Products;
    
    if (cartProducts && cartProducts.length > 0) {
      const formattedAddress = {
        address: shippingAddress.address,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country,
      };

      // Check both properties for total price
      const totalPrice = (cart?.totalPrice || cart?.TotalPrice || 0) + 69;

      const res = await dispatch(
        createCheckout({
          checkoutItems: cartProducts,
          shippingAddress: formattedAddress,
          paymentMethod: "Paypal",
          totalPrice: totalPrice,
        })
      );
      
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
      }
    }
  };

  const handleCheckout = async () => {
    try {
      // Check both properties for total price
      const totalPrice = (cart?.totalPrice || cart?.TotalPrice || 0) + 69;
      
      // First, mark the checkout as paid
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: "paid",
          paymentDetails: {
            method: "PayPal",
            transactionId: `PAYPAL-${Date.now()}`,
            amount: totalPrice,
          }
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      // Then, finalize the checkout to create the order
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      navigate("/order-done");
    } catch (error) {
      console.log(error);
    }
  };

  // Handle loading state
  if (loading) return <p className="text-center py-12">Loading cart...</p>;
  
  // Handle error state
  if (error) return <p className="text-center py-12 text-red-500">Error: {error}</p>;
  
  // Check if cart is completely missing
  if (!cart) return <p className="text-center py-12">Loading checkout...</p>;

  // Extract product information, checking both capitalized and lowercase properties
  const products = cart?.products || cart?.Products || [];
  const totalPrice = cart?.totalPrice || cart?.TotalPrice || 0;
  const hasProducts = products.length > 0;

  // If no products found, show message but don't redirect
  if (!hasProducts) {
    return (
      <div className="text-center py-12">
        <p>Your cart is empty</p>
        <button 
          onClick={() => navigate("/")}
          className="mt-4 bg-black text-white px-6 py-2 rounded-sm"
        >
          Go to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase m-6 text-center">Checkout</h2>
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg mb-4"></h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={user?.email}
              className="w-full p-2 border border-gray-300 rounded-sm"
              disabled
            />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-sm"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                required
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-sm"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              required
              className="w-full p-2 border border-gray-300 rounded-sm"
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-sm"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Postal Code</label>
              <input
                type="number"
                value={shippingAddress.postalCode}
                required
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-sm"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Country</label>
            <input
              type="text"
              value={shippingAddress.country}
              required
              className="w-full p-2 border border-gray-300 rounded-sm"
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={shippingAddress.phone}
              required
              className="w-full p-2 border border-gray-300 rounded-sm"
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-sm"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full bg-blue-500 text-white py-3 rounded-sm"
                >
                  Pay with PayPal
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
      <div className="bg-gray-200/70 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order summary</h3>
        <div className="border-t border-gray-400 py-4 mb-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-2 border-b border-gray-300"
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt="product image"
                  className="w-20 h-2/4 object-cover mt-2 mr-4"
                />
                <div>
                  <h3 className="text-xl">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                </div>
              </div>
              <p className="text-xl">${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal:</p>
          <p>${totalPrice.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Shipping:</p>
          <p>$69</p>
        </div>
        <div className="flex justify-between items-center text-lg mb-4 border-t border-gray-600 pt-4">
          <p>Total:</p>
          <p>${(totalPrice + 69).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;