const Cart = require("../models/Cart");

// ================= ADD TO CART =================

const addToCart = async (req, res) => {
  try {
    const { userId, serviceId, quantity } = req.body;

    // Check if service already exists in cart
    const existingCart = await Cart.findOne({ userId, serviceId });

    if (existingCart) {
      existingCart.quantity += quantity || 1;
      await existingCart.save();

      return res.json({
        success: true,
        message: "Cart updated successfully",
        cart: existingCart,
      });
    }

    const cart = await Cart.create({
      userId,
      serviceId,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: "Added to cart",
      cart,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET CART =================

const getCart = async (req, res) => {
  try {
    const cart = await Cart.find()
      .populate("userId")
      .populate("serviceId");

    res.json(cart);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= UPDATE CART =================

const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        quantity: req.body.quantity,
      },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    res.json({
      success: true,
      message: "Cart updated",
      cart,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= REMOVE CART ITEM =================

const removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);

    if (!cart) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    res.json({
      success: true,
      message: "Item removed from cart",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= CLEAR CART =================

const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({
      userId: req.params.userId,
    });

    res.json({
      success: true,
      message: "Cart cleared successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeCartItem,
  clearCart,
};