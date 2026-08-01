const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  createReview,
  getAllReviews,
} = require("../controllers/reviewController");

// router.post("/", createReview);
// router.post("/", protect, createReview);
// router.get("/", getAllReviews);

router.post("/", protect, createReview);
router.get("/", protect, getAllReviews);

module.exports = router;