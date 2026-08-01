const Banner = require("../models/Banner");

// ================= CREATE BANNER =================
exports.createBanner = async (req, res) => {
  try {
    const banner = await Banner.create(req.body);

    res.status(201).json({
      success: true,
      banner,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= GET ALL BANNERS =================
exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ active: true });

    res.json({
      success: true,
      banners,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};