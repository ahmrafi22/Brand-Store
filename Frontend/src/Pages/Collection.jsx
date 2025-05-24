import { useCallback, useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import FilterSidebar from "../Components/Products/FilterSidebar";
import SorOptions from "../Components/Products/SortOptions";
import ProductGrid from "../Components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsbyFilters } from "../redux/slices/productsSlice";

const Collections = () => {
  const {collections} = useParams()
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()

  const {products , loading , error } = useSelector((state) => state.products)

  const queryParams = Object.fromEntries([...searchParams])

  useEffect(() => {
    dispatch(fetchProductsbyFilters({collections, ...queryParams}))
  },[dispatch, collections, searchParams])

  const Sidebar = useRef(null);
  const [SideOpen, setOpen] = useState(false);
  const toggleSidebar = () => {
    setOpen(!SideOpen);
  };

  const handlesidebarClickout = useCallback((e) => {
    if (Sidebar.current && !Sidebar.current.contains(e.target)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handlesidebarClickout);
    return () => {
      document.removeEventListener("mousedown", handlesidebarClickout);
    };
  }, []);
  return (
    <div className="flex flex-col lg:flex-row">
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2 " />
      </button>

      <div
        ref={Sidebar}
        className={`${
          SideOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>
      <div className="grow p-4">
        <h2 className="text-2xl uppercase mb-4 "> All collection</h2>
        <SorOptions  />
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default Collections;
