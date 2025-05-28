import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import register from "../assets/register.webp";
import { registerUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

  const handelSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true);
    try {
      await dispatch(registerUser({name, email, password}))
    } finally {
      setIsLoading(false);
    }
  }

  return ( 
    <div className="flex mb-5 mt-5">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form onSubmit={handelSubmit} className="w-full max-w-md bg-white p-8 rounded-lg ">
          <div className="flex justify-center mb-6">
            <h2 className="font-black font-[i_Ivy_Dangerous] text-[4em]">ST0RE</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">
            Hey there! 🙋‍♂️
          </h2>
          <p className="text-center min-h-6 mb-4">
            Enter your Your name and password to Login
          </p>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 ring-1 ring-gray-400"
              placeholder="Enter your Name"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 ring-1 ring-gray-400"
              placeholder="Enter your Email"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 ring-1 ring-gray-400"
              placeholder="Enter your password"
              disabled={isLoading}
            />
          </div>
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white p-2 font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin mr-2" />
                Signing up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
          <p className="mt-6 text-center text-sm">
             have an account ? {"  "}
            <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-blue-500">
              Log in
            </Link>
          </p>
        </form>
      </div>
      <div className="hidden md:block w-1/2 ">
        <div className="h-full flex flex-col justify-center items-center">
          <img src={register} alt="login image" className="h-[850px] w-[90%] object-cover rounded-[12px] ring-2 ring-gray-400 ring-offset-2" />
        </div>
      </div>
    </div>
  );
}
 
export default Register;