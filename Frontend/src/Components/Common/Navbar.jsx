import { HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Search from "./Searchbar";
import CartDrawer from "../Layout/Cardrawer";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [drwrOpen, setDrawerOpen] = useState(false);
  const [nawDraw, setNvDraw] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state)=> state.auth)

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  const toggleDrawer = () => {
    setDrawerOpen(!drwrOpen);
  };

  const toggleNaavD = () => {
    setNvDraw(!nawDraw);
  };
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <div>
          <Link to="/" className="text-4xl font-black font-[i_Ivy_Dangerous]">
            ST0RE
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link
            to="/collection/all"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            All
          </Link>
          <Link
            to="collection/all?gender=Men"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            MEN
          </Link>
          <Link
            to="collection/all?gender=Women"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to="collection/all?category=Top Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Top Wear
          </Link>
          <Link
            to="collection/all?category=Bottom Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Bottom wear
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {user && user.role === "Admin" && (
            <Link
              to="/admin"
              className="block bg-black px-2 rounded-sm text-sm text-white"
            >
              Admin
            </Link>
          )}

          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>
          <button onClick={toggleDrawer} className="relative hover:text-black">
            <HiOutlineShoppingBag className="w-6 h-6 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 bg-red-500 text-xs text-white rounded-bl-full px-2 py-0.5">
                {cartItemCount}
              </span>
            )}
          </button>
          <div className="overflow-hidden">
            <Search />
          </div>
          <button className="md:hidden">
            <HiBars3BottomLeft
              onClick={toggleNaavD}
              className="h-6 w-6 text-gray-700"
            />
          </button>
        </div>
      </nav>
      <CartDrawer drwrOpen={drwrOpen} toggleDrawer={toggleDrawer} />

      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 h-full border-r border-gray-300 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          nawDraw ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNaavD}>
            <IoMdClose className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">MENU</h2>
          <nav className="space-y-4">
            <Link
              onClick={toggleNaavD}
              to="/collection/all"
              className="block text-gray-600 hover:text-black"
            >
              All
            </Link>
            <Link
              to="collection/all?gender=Men"
              onClick={toggleNaavD}
              className="block text-gray-600 hover:text-black"
            >
              Men
            </Link>
            <Link
              to="collection/all?gender=Women"
              onClick={toggleNaavD}
              className="block text-gray-600 hover:text-black"
            >
              Women
            </Link>
            <Link
              to="collection/all?category=Top Wear"
              onClick={toggleNaavD}
              className="block text-gray-600 hover:text-black"
            >
              Upper
            </Link>
            <Link
              to="collection/all?category=Bottom Wear"
              onClick={toggleNaavD}
              className="block text-gray-600 hover:text-black"
            >
              Bottom
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
