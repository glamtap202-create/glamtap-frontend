const Review = require("../models/Review");

// Create Review
exports.createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("userId")
      .populate("serviceId");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};