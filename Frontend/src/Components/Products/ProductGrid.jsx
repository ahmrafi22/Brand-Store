import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return <p>Loading Products....</p>;
  }

  if (error) {
    return <p>Error Something went wrong</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <Link key={index} to={`/product/${product._id}`} className="block">
          <div className="bg-white p-4 rounded-[12px]">
            <div className="w-full h-96 mb-4 overflow-hidden rounded-[12px]">
              <img
                src={product.images[0].url}
                alt="product"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 rounded-[12px]"
              />
            </div>
            <h3 className="text-sm mb-2">{product.name}</h3>
            <p className="text-gray-500 font-medium text-sm tracking-tighter">
              ${product.price}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
