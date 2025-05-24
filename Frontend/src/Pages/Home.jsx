import { useDispatch, useSelector } from "react-redux";
import Hero from "../Components/Layout/Hero";
import FeatureCollection from "../Components/Products/FeaturedCollection";
import FeaSection from "../Components/Products/FeatureSection";
import Gencollection from "../Components/Products/GEncollect";
import NewArrivals from "../Components/Products/NewArrivals";
import ProductDetails from "../Components/Products/ProductDetails";
import ProductGrid from "../Components/Products/ProductGrid";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchProductsbyFilters } from "../redux/slices/productsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    dispatch(
      fetchProductsbyFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );

    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-sellers`
        );
        // console.log("Best seller API response:", response.data);
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error("Error fetching best seller:", error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);
  return (
    <div>
      <Hero />
      <Gencollection />
      <NewArrivals />
      <h2 className="text-3xl text-center font-bold mb-4"> Best Sellers</h2>
      {bestSellerProduct && bestSellerProduct._id ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Best seller product Loading....</p>
      )}
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <FeatureCollection />
      <FeaSection />
    </div>
  );
};

export default Home;
