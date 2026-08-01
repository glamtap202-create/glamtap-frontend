const Beautician = require("../models/Beautician");

// Create Beautician
const createBeautician = async (req, res) => {
  try {
    const beautician = await Beautician.create(req.body);

    res.status(201).json({
      message: "Beautician created successfully",
      beautician,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Beauticians
const getAllBeauticians = async (req, res) => {
  try {
    const beauticians = await Beautician.find().populate("salonId");

    res.status(200).json(beauticians);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Beautician By ID
const getBeauticianById = async (req, res) => {
  try {
    const beautician = await Beautician.findById(req.params.id);

    if (!beautician) {
      return res.status(404).json({
        message: "Beautician not found",
      });
    }

    res.json(beautician);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Beautician
const updateBeautician = async (req, res) => {
  try {
    const beautician = await Beautician.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!beautician) {
      return res.status(404).json({
        message: "Beautician not found",
      });
    }

    res.json(beautician);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Beautician
const deleteBeautician = async (req, res) => {
  try {
    const beautician = await Beautician.findByIdAndDelete(req.params.id);

    if (!beautician) {
      return res.status(404).json({
        message: "Beautician not found",
      });
    }

    res.json({
      message: "Beautician deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBeautician,
  getAllBeauticians,
  getBeauticianById,
  updateBeautician,
  deleteBeautician,
};