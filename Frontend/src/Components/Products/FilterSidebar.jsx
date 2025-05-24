import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });
  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];
  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle",
  ];
  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice ? Number(params.minPrice) : 0,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : 100,
    });

    setPriceRange([0, params.maxPrice ? Number(params.maxPrice) : 100]);
  }, [searchParams]);

  const handelfilterChnage = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = {...filters}
    if (type === "checkbox") {
        if (checked) {
            newFilters[name] = [...(newFilters[name]  || []) , value]
        } else {
            newFilters[name] = newFilters[name].filter((item) => item !==value)
        } 
    } else {
        newFilters[name] = value
    }

    setFilters(newFilters)
    updateURL(newFilters)
  }

  const updateURL = (newFilters) => {
    const params = new URLSearchParams()
    Object.keys(newFilters).forEach((key) => {
        if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
            params.append(key, newFilters[key].join(","));
        } else if (newFilters[key]) {
            params.append(key, newFilters[key])
        }
         
    });
    setSearchParams(params)
    navigate(`?${params.toString()}`)
  }

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0,newPrice])
    const newFilters = {...filters, minPrice:0, maxPrice:newPrice}
    setFilters(filters);
    updateURL(newFilters)
  }

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filters</h3>

      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              checked = {filters.category === category}
              onChange={handelfilterChnage}
              className="m-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Genders</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              value={gender}
              checked = {filters.gender === gender}
              onChange={handelfilterChnage}
              className="m-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>


      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={handelfilterChnage}
              className={`w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer transition hover:scale-105 ${filters.color === color ? "ring-offset-1 ring-gray-700 " : ""} `}
              style={{ backgroundColor: color.toLocaleLowerCase() }}
            ></button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Sizes</label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="size"
              value={size}
              onChange={handelfilterChnage}
              checked={filters.size.includes(size)}
              className="mr-2 h-4 w-4 accent-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">
          Materials
        </label>
        {materials.map((mat) => (
          <div key={mat} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="material"
              value={mat}
              onChange={handelfilterChnage}
              checked={filters.material.includes(mat)}


              className="mr-2 h-4 w-4 accent-yellow-400 focus:ring-yellow-400 border-gray-300"
            />
            <span className="text-gray-700">{mat}</span>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Brands</label>
        {brands.map((bnd) => (
          <div key={bnd} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              value={bnd}
              onChange={handelfilterChnage}
              checked={filters.brand.includes(bnd)}


              className="mr-2 h-4 w-4 accent-green-400 focus:ring-green-400 border-gray-300"
            />
            <span className="text-gray-700">{bnd}</span>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">
          Price Range
        </label>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 accent-cyan-500 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 ">
            <span>$0</span>
            <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
