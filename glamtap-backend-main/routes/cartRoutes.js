const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  addToCart,
  getCart,
  updateCart,
  removeCartItem,
  clearCart,
} = require("../controllers/cartController");

// Add to Cart
router.post("/", protect, addToCart);

// Get Cart
router.get("/", protect, getCart);

// Update Cart Quantity
router.put("/:id", protect, updateCart);

// Remove Single Cart Item
router.delete("/:id", protect, removeCartItem);

// Clear User Cart
router.delete("/clear/:userId", protect, clearCart);

module.exports = router;