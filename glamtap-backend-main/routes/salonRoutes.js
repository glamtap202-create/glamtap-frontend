const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const { protectSalon, approvedOnly } = require("../middleware/salonAuthMiddleware");

const {
  createSalon,
  getAllSalons,
  getSalonById,
  updateSalon,
  deleteSalon,
  registerSalon,
  loginSalon,
  approveSalon,
  rejectSalon,
} = require("../controllers/salonController");

// =======================
// Partner Authentication
// =======================
router.post("/register", registerSalon);
router.post("/login", loginSalon);

// =======================
// Admin Approval
// =======================
router.patch("/:id/approve", protect, admin, approveSalon);
router.patch("/:id/reject", protect, admin, rejectSalon);

// =======================
// Admin CRUD
// =======================
router.post("/", protect, admin, createSalon);
router.get("/", getAllSalons);
router.get("/:id", getSalonById);
router.put("/:id", protect, admin, updateSalon);
router.delete("/:id", protect, admin, deleteSalon);

module.exports = router;