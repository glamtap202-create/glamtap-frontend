const Salon = require("../models/Salon");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// =============================
// Register Salon
// =============================
const registerSalon = async (req, res) => {
  try {
    const { name, ownerName, email, password, address, city, phone } = req.body;

    if (!name || !email || !password || !address || !city) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const existingSalon = await Salon.findOne({ email });

    if (existingSalon) {
      return res.status(400).json({
        success: false,
        message: "Salon already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const salon = await Salon.create({
      name,
      ownerName,
      email,
      password: hashedPassword,
      address,
      city,
      phone,
      approvalStatus: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Registration successful. Waiting for admin approval.",
      salon,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =============================
// Login Salon
// =============================
const loginSalon = async (req, res) => {
  try {
    const { email, password } = req.body;

    const salon = await Salon.findOne({ email });

    if (!salon) {
      return res.status(404).json({
        success: false,
        message: "Salon not found",
      });
    }

    const match = await bcrypt.compare(password, salon.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    if (salon.approvalStatus !== "Approved") {
      return res.status(403).json({
        success: false,
        message: `Salon is ${salon.approvalStatus}`,
      });
    }

    res.json({
      success: true,
      token: generateToken(salon._id),
      salon,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =============================
// Create Salon (Admin)
// =============================
const createSalon = async (req, res) => {
  try {
    const salon = await Salon.create(req.body);

    res.status(201).json({
      success: true,
      salon,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// =============================
// Get All Salons
// =============================
const getAllSalons = async (req, res) => {
  try {
    const salons = await Salon.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: salons.length,
      salons,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =============================
// Get Salon By ID
// =============================
const getSalonById = async (req, res) => {
  try {
    const salon = await Salon.findById(req.params.id);

    if (!salon) {
      return res.status(404).json({
        success: false,
        message: "Salon not found",
      });
    }

    res.status(200).json({
      success: true,
      salon,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =============================
// Update Salon
// =============================
const updateSalon = async (req, res) => {
  try {
    const salon = await Salon.findById(req.params.id);

    if (!salon) {
      return res.status(404).json({
        success: false,
        message: "Salon not found",
      });
    }

    salon.name = req.body.name || salon.name;
    salon.ownerName = req.body.ownerName || salon.ownerName;
    salon.email = req.body.email || salon.email;
    salon.address = req.body.address || salon.address;
    salon.city = req.body.city || salon.city;
    salon.phone = req.body.phone || salon.phone;
    salon.image = req.body.image || salon.image;
    salon.rating =
      req.body.rating !== undefined ? req.body.rating : salon.rating;

    if (req.body.password) {
      salon.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedSalon = await salon.save();

    res.status(200).json({
      success: true,
      message: "Salon updated successfully",
      salon: updatedSalon,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =============================
// Delete Salon
// =============================
const deleteSalon = async (req, res) => {
  try {
    const salon = await Salon.findById(req.params.id);

    if (!salon) {
      return res.status(404).json({
        success: false,
        message: "Salon not found",
      });
    }

    await salon.deleteOne();

    res.status(200).json({
      success: true,
      message: "Salon deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};// =============================
// Approve Salon
// =============================
const approveSalon = async (req, res) => {
  try {
    const salon = await Salon.findById(req.params.id);

    if (!salon) {
      return res.status(404).json({
        success: false,
        message: "Salon not found",
      });
    }

    salon.approvalStatus = "Approved";
    await salon.save();

    res.status(200).json({
      success: true,
      message: "Salon approved successfully",
      salon,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =============================
// Reject Salon
// =============================
const rejectSalon = async (req, res) => {
  try {
    const salon = await Salon.findById(req.params.id);

    if (!salon) {
      return res.status(404).json({
        success: false,
        message: "Salon not found",
      });
    }

    salon.approvalStatus = "Rejected";
    await salon.save();

    res.status(200).json({
      success: true,
      message: "Salon rejected successfully",
      salon,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =============================
// Export All Controllers
// =============================
module.exports = {
  registerSalon,
  loginSalon,
  createSalon,
  getAllSalons,
  getSalonById,
  updateSalon,
  deleteSalon,
  approveSalon,
  rejectSalon,
};