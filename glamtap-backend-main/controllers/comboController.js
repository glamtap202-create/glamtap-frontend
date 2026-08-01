const mongoose = require("mongoose");
const Combo = require("../models/comboModel");

// Get All Combos
const getCombos = async (req, res) => {
  try {
    const combos = await Combo.find({});

    res.status(200).json({
      success: true,
      total: combos.length,
      combos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single combo by id
const getComboById = async (req, res) => {
  try {
    const { id } = req.params;
    let combo = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      combo = await Combo.findById(id);
    }

    if (!combo) {
      combo = await Combo.findOne({ _id: id });
    }

    if (!combo) {
      return res.status(404).json({
        success: false,
        message: "Combo not found",
      });
    }

    res.status(200).json({
      success: true,
      combo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create Combo
const createCombo = async (req, res) => {
  try {
    const combo = await Combo.create(req.body);

    res.status(201).json({
      success: true,
      combo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCombos,
  getComboById,
  createCombo,
};