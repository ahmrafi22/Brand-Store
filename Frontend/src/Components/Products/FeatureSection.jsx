import { HiOutlineCreditCard, HiShoppingBag } from "react-icons/hi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";

const FeaSection = () => {
    return ( 
        <section className="py-16 px-4 bg-white">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                    <div className="p-4 rounded-full mb-4">
                        <HiShoppingBag  className="text-xl w-6 h-6"/>
                    </div>
                    <h4 className="tracking-tighter mb-2">
                        Free int Shipping 
                    </h4>
                    <p className="text-gray-600 text-sm tracking-tighter">
                        On all orders over $400
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="p-4 rounded-full mb-4">
                        <HiArrowPathRoundedSquare  className="text-xl w-6 h-6"/>
                    </div>
                    <h4 className="tracking-tighter mb-2">
                        7 Days Return
                    </h4>
                    <p className="text-gray-600 text-sm tracking-tighter">
                    Money Back guarantee
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="p-4 rounded-full mb-4">
                        <HiOutlineCreditCard  className="text-xl w-6 h-6"/>
                    </div>
                    <h4 className="tracking-tighter mb-2">
                       Secure Checkout
                    </h4>
                    <p className="text-gray-600 text-sm tracking-tighter">
                    100% safe with out partners
                    </p>
                </div>
            </div>
        </section>
     );
}
 
export default FeaSection;