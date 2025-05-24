const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();
const Products = require("../Models/Products");

router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
    } = req.body;

    const product = new Products({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error });
  }
});

router.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
    } = req.body;

    const product = await Products.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.sku = sku || product.sku;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error });
  }
});

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error });
  }
});

//search query
router.get("/", async (req, res) => {
  try {
    const {
      collections,
      sizes,
      colors,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    if (collections && collections.toLocaleLowerCase() !== "all") {
      query.collections = collections;
    }
    if (collections && collections.toLocaleLowerCase() !== "all") {
      query.category = category;
    }

    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    if (material) {
      query.material = { $in: material.split(",") };
    }
    if (sizes) {
      query.sizes = { $in: sizes.split(",") };
    }

    if (colors) {
      query.colors = { $in: [colors] };
    }

    if (gender) {
      query.gender = gender;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    let sort = {}
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = {rating : -1}
          break
      }
    }

    let products = await Products.find(query).sort(sort).limit(Number(limit) || 0);
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message })
  }
});

// SPECIFIC ROUTES FIRST (before /:id)
//best seller 
router.get("/best-sellers", async (req, res) => {
  try {
    const bestSeller = await Products.findOne().sort({rating: -1})
    if (bestSeller) {
      res.json(bestSeller)
    } else {
      res.status(404).json({ message: "Best seller not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message })
  }
});

//new arrivals 
router.get("/new-arrivals", async (req, res) => {
  try {
    const newArrival = await Products.find().sort({createdAt: -1}).limit(8)
    if (newArrival) {
      res.json(newArrival)
    } else {
      res.status(404).json({ message: "New arrivals not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message })
  }
});

//similar products
router.get("/similar/:id", async (req, res) => {
  const {id} = req.params
  try {
    const product = await Products.findById(id)

    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    const similarProduct = await Products.find({
      _id: {$ne: id},
      gender: product.gender,
      category: product.category
    }).limit(4);

    res.json(similarProduct)
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message })
  }
});

// GENERAL PARAMETER ROUTE LAST
//get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message })
  }
});

module.exports = router;