const Feature = require("../models/Feature");

// Get Features
exports.getFeatures = async (req, res) => {
  try {
    const features = await Feature.find();

    res.json({
      success: true,
      features,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Create Feature
exports.createFeature = async (req, res) => {
  try {
    const feature = await Feature.create(req.body);

    res.status(201).json({
      success: true,
      feature,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};