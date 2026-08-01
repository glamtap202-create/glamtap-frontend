const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const {
  createSettlement,
  getAllSettlements,
  markSettlementPaid,
} = require("../controllers/settlementController");

router.post("/", protect, admin, createSettlement);
router.get("/", protect, admin, getAllSettlements);
router.patch("/:id/pay", protect, admin, markSettlementPaid);

module.exports = router;