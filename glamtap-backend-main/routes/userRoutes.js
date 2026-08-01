const express = require("express");
const {
    registerUser,
    loginUser,
    getUserProfile,
    getAllUsers
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const User = require("../models/User");
const router = express.Router();

// TEMPORARY - role admin karne ke liye
router.get("/make-admin/:email", async (req, res) => {
  const user = await User.findOneAndUpdate(
    { email: req.params.email },
    { role: "admin" },
    { new: true }
  );
  res.json({ message: "Role updated", user });
});

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Route
router.get("/profile", protect, getUserProfile);

// Admin Route - get all users
router.get("/", protect, admin, getAllUsers);

module.exports = router;