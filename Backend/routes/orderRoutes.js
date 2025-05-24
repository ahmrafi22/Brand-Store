const express = require("express");
const router = express.Router();
const Order = require("../Models/Order");
const { protect } = require("../middleware/authMiddleware");




router.get("/my-orders", protect, async (req, res) => {
    try {
        
        const orders = await Order.find({user: req.user._id}).sort({
            createdAt:-1,
        })
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
})

router.get("/:id", protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error: error.message});
    }
} )

module.exports = router

