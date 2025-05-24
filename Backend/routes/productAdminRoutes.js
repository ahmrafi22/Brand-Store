const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const { protect, admin } = require("../middleware/authMiddleware");
const Products = require("../Models/Products");

router.get("/", protect , admin , async (req, res) => {
    try {
        const products = await Products.find({})
        res.json(products)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error: error.message});
    }
})

module.exports = router