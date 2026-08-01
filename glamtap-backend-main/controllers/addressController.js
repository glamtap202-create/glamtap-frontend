const Address = require("../models/Address");

// Create Address
exports.createAddress = async (req, res) => {
  try {
    const address = await Address.create(req.body);
    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Addresses
exports.getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.find().populate("userId");
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};