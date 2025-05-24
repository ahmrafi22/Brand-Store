const express = require("express");
const Checkout = require("../Models/Checkout");
const Cart = require("../Models/Cart");
const Product = require("../Models/Products");
const order = require("../Models/Order");
const { protect } = require("../middleware/authMiddleware");
const Order = require("../Models/Order");
const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items in Checkout" });
  }

  try {
    const newCheckOut = await Checkout.create({
      user: req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });
    console.log(`checkout created for ${req.user._id} `);
    res.status(201).json(newCheckOut);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error });
  }
});

router.put("/:id/pay", protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout Not found" });
    }

    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      await checkout.save();
      res.status(201).json(checkout);
    } else {
      res.status(400).json({ message: "Invalid payment" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error });
  }
});

router.post("/:id/finalize", protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout Not found" });
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });

      (checkout.isFinalized = true), (checkout.finalizedAt = Date.now());
      await checkout.save();

      await Cart.findOneAndDelete({ user: checkout.user });
      res.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
      return res.status(400).json({ message: "Checkout already finalized" });
    } else {
      return res.status(400).json({ message: "Checkout not paid" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error });
  }
});

module.exports= router