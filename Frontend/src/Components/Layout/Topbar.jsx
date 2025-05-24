import { IoLogoInstagram } from "react-icons/io";
import { RiMessengerLine, RiTwitterXLine } from "react-icons/ri";

const Topbar = () => {
    return ( 
        <div className="bg-red-500 text-white">
            <div className="container mx-auto flex justify-between items-center px-3 py-4">
                <div className="hidden md:flex items-center space-x-4">
                    <a href="#" className="hover:text-gray-300"> <RiMessengerLine className="w-6 h-6"/> </a>
                    <a href="#" className="hover:text-gray-300"> <IoLogoInstagram className="w-6 h-6"/> </a>
                    <a href="#" className="hover:text-gray-300"> <RiTwitterXLine className="w-6 h-6"/> </a>
                </div>
                <div className="text-sm text-center grow">
                    <span> We ship anywhere ! - Fast and reliable shipping</span>
                </div>
                <div className="text-sm hidden md:block ">
                    <a className="hover:text-gray-300" href="tel:01776685110"> Phone </a>

                </div>

            </div>

        </div>
     );
}
 
export default Topbar;