const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const Products = require("../Models/Products");
const Cart = require("../Models/Cart");

const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
};

router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    const product = await Products.findById(productId);
    if (!product) return res.status(404).json({ message: "product not found" });

    let cart = await getCart(userId, guestId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += Number(quantity);
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(201).json(cart);
    } else {
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error });
  }
});

router.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "cart not found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cat.products.splice(productIndex, 1);
      }
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not  found in cart" });
    }
  } catch {
    res.status(500).json({ message: "Server Error", error: error });
  }
});

// delete cart
router.delete("/", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: " cart not  found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size == size &&
        p.color === color
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not  found in cart" });
    }
  } catch {
    res.status(500).json({ message: "Server Error", error: error });
  }
});

router.get("/", async (req, res) => {
  const { userId, guestId } = req.query;

  try {
    const cart = await getCart(userId, guestId);
    if (cart) {
      res.json(cart);
    } else {
      return es.status(404).json({ message: "cart Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error });
  }
});

//merge
router.post("/merge", async (req, res) => {
  const { guestId } = req.body;
  try {
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.userId });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: "cart empty" });
      }

      if (userCart) {
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );

          if (productIndex > -1) {
            userCart.products[productIndex].quantity += Number(quantity);
          } else {
            userCart.products.push(guestItem);
          }
        });

        userCart.totalPrice = cart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        await userCart.save();

        try {
          await Cart.findByIdAndDelete({ guestId });
        } catch (error) {
          res.status(500).json({ message: "Server Error", error: error });
        }
        res.status(200).json(userCart);
      } else {
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();

        res.status(200).json(guestCart);
      }
    } else {
        if (userCart) {
            return  res.status(200).json(userCart);
        }
        return res.status(404).json({ message: "Guest cart Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error });
  }
});

module.exports = router;
