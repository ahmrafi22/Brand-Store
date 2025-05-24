const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

const Order = require("../Models/Order");



router.get("/", protect , admin , async (req, res) => {
    try {
        const orders = await Order.find({}).populate("user", "name email")
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error: error.message});
    }
})

router.put("/:id", protect , admin , async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (order){
            order.status = req.body.status || order.status
            order.isDelivered = req.body.status === "Delivered" ? true : order.isDelivered
            order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt
            const updateOrder = await  order.save();
            res.json(updateOrder)
        } else {
            res.status(404).json({ message: "oder not found"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error: error.message});
    }
})

router.delete("/:id",protect, admin, async (req, res) =>{
    try {
        const order = await Order.findById(req.params.id).populate("user", "name");
        if (order) {
            await order.deleteOne()
            res.json({ message:"order deleted"});
        } else {
            res.status(404).json({ message:"order not found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error: error.message});
    }
})

module.exports = router


