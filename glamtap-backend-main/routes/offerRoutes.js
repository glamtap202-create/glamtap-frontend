const express = require("express");
const router = express.Router();
const { claimOneRupeeService, getOfferStatus } = require("../controllers/offerController");
const { protect } = require("../middleware/authMiddleware");

// Dono routes par 'protect' hona chahiye
router.get("/status", protect, getOfferStatus);
router.post("/claim-one-rupee", protect, claimOneRupeeService);

module.exports = router;