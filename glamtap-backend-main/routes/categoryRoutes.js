const express = require("express");
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const router = express.Router();


// Create category
router.post("/", createCategory);


// Get categories
router.get("/", getAllCategories);


// Update category (Admin only)
router.put("/:id", protect, admin, updateCategory);


// Delete category (Admin only)
router.delete("/:id", protect, admin, deleteCategory);


module.exports = router;