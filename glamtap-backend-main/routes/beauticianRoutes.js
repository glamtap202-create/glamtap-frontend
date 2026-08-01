const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const {
  createBeautician,
  getAllBeauticians,
  getBeauticianById,
  updateBeautician,
  deleteBeautician,
} = require("../controllers/beauticianController");

// Create Beautician (Admin)
router.post("/", protect, admin, createBeautician);

// Get All Beauticians
router.get("/", getAllBeauticians);

// Get Beautician By ID
router.get("/:id", getBeauticianById);

// Update Beautician (Admin)
router.put("/:id", protect, admin, updateBeautician);

// Delete Beautician (Admin)
router.delete("/:id", protect, admin, deleteBeautician);

module.exports = router;