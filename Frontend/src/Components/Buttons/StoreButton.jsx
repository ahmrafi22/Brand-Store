import { BiSolidRightTopArrowCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function StButton({bgb=false}) {
  return (
    <Link
      to="#"
      className={`group relative mx-auto  flex items-center justify-center ${bgb ? "text-white bg-black":"bg-white text-black"}  font-semibold text-sm px-6 py-3 rounded-full overflow-hidden transition-all duration-300 ease-out shadow-lg hover:shadow-xl  w-40 `}
    >
      <div className="relative flex items-center justify-center h-5 w-full">
        {/* Original text (moves up) */}
        <span className="absolute flex items-center gap-2 transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:opacity-0">
          Shop Now <BiSolidRightTopArrowCircle className="h-4 w-4" />
        </span>

        {/* Cloned text (comes from bottom) */}
        <span className="absolute flex items-center gap-2 transition-all duration-300 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          Shop Now <BiSolidRightTopArrowCircle className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
