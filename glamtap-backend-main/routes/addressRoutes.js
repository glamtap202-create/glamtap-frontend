const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  createAddress,
  getAllAddresses,
} = require("../controllers/addressController");

const router = express.Router();

// router.post("/", createAddress);
// router.get("/", getAllAddresses);

router.post("/", protect, createAddress);
router.get("/", protect, getAllAddresses);

module.exports = router;