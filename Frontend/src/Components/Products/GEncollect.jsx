import men from "../../assets/mens-collection.webp"
import women from "../../assets/womens-collection.webp"
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
const Gencollection = () => {
    return ( <section className="py-16 px-4 lg:px-0">
        <div className="container mx-auto flex flex-col md:flex-row gap-8">
            <div className=" relative flex-1">
                <img src={women} alt="women"
                className="w-full h-[700px] object-cover" />
                <div className="absolute bottom-8 left-8 p-4 bg-white/60">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Women's Collection
                </h2>
                <Link to ='/collections/all?gender=Women'
                className="underline flex items-center gap-1.5 text-gray-700 "> Shop Now <MdArrowOutward /> </Link>
                </div>
            </div>
            <div className=" relative flex-1">
                <img src={men} alt="womencol"
                className="w-full h-[700px] object-cover" />
                <div className="absolute bottom-8 left-8 p-4 bg-white/60">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Men's Collection
                </h2>
                <Link to ='/collections/all?gender=Men'
                className="underline flex items-center gap-1.5 text-gray-700 "> Shop Now <MdArrowOutward /> </Link>
                </div>
            </div>
        </div>
    </section> );
}
 
export default Gencollection;