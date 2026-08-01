const Stats = require("../models/Stats");

// GET
exports.getStats = async (req, res) => {
  try {
    const stats = await Stats.findOne();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST
exports.createStats = async (req, res) => {
  try {
    const stats = await Stats.create(req.body);

    res.status(201).json({
      success: true,
      stats,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};