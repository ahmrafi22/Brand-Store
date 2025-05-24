import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";

const CartContent = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };
  return (
    <div>
      {cart.products.map((item, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b border-gray-200"
        >
          <div className="flex items-start justify-between py-4 ">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-24 object-center object-cover mr-4 rounded-[12px]"
            />
            <div>
              <h3> {item.name} </h3>
              <p className="text-sm text-gray-500">
                Size : {item.size} | Color : {item.color}{" "}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    handleAddToCart(
                      item.productId,
                      -1,
                      item.quantity,
                      item.size,
                      item.color
                    )
                  }
                  className="border border-gray-300  rounded-sm px-2 py-1 text-xl font-medium"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity} </span>
                <button
                  onClick={() =>
                    handleAddToCart(
                      item.productId,
                      1,
                      item.quantity,
                      item.size,
                      item.color
                    )
                  }
                  className="border border-gray-500 rounded-sm px-2 py-1 text-xl font-medium"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-medium">$ {item.price.toLocaleString()}</p>
            <button
              onClick={() =>
                handleRemoveFromCart(item.productId, item.size, item.color)
              }
            >
              <RiDeleteBin3Line className="w-6 h-6 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;
