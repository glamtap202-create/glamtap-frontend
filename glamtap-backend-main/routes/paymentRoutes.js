const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const {
  getAllPayments,
  getPaymentById,
  updatePaymentStatus,
} = require("../controllers/paymentController");

router.get("/", protect, admin, getAllPayments);
router.get("/:id", protect, admin, getPaymentById);
router.patch("/:id/status", protect, admin, updatePaymentStatus);

module.exports = router;