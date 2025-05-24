import { FaSquareFacebook, FaSquareXTwitter } from "react-icons/fa6";
import { FiPhoneCall } from "react-icons/fi";
import { RiInstagramFill } from "react-icons/ri";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto grid grid-cols-1  md:grid-cols-4 gap-8 px-4 lg:px-0">
        <div>
          <h1 className="text-lg text-gray-800 mb-4"> Newsletter</h1>
          <p className="text-gray-500 mb-4">
            Be the first to hear about our deals
          </p>
          <p className="font-medium text-gray-600 mb-6 tracking-tighter">
            Signup to get 10% off your first order{" "}
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 focus:border-gray-500 transition-all"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
        <div>
          <h3 className="text-lg text-gray-800 mb-4"> Shop</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Men's wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Women's wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Top wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Bottom wear
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg text-gray-800 mb-4"> Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Contacs
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Terms and Conditons
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg text-gray-800 mb-4"> Follow us</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaSquareFacebook className="w-5 h-5.5" />
            </a>
            <a
             href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <RiInstagramFill className="w-6 h-5.5 " />
            </a>
            <a
              href="https://www.x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaSquareXTwitter className="w-5 h-5.5 " />
            </a>
          </div>
          <p className="text-gray-500">Call US</p>
          <p>
            <FiPhoneCall className="inline-block w-6 h-6 mt-2 mr-1" /> +8801******
          </p>
        </div>
      </div>
      <div className=" container text-center mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-400 tracking-tight">
            This is just a sample &&
        </p>
      </div>
    </footer>
  );
};

export default Footer;
