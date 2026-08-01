const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const {
  createService,
  getAllServices,
  getServiceById,
  getServicesByCategory,
  searchServices,
  filterServices,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const router = express.Router();

// ================= SEARCH SERVICES =================
// GET /api/services/search?keyword=facial

router.get("/search", searchServices);

// ================= FILTER SERVICES =================
// GET /api/services/filter?category=Waxing&minPrice=200

router.get("/filter", filterServices);

// ================= GET ALL SERVICES =================
// GET /api/services?page=1&limit=8

router.get("/", getAllServices);

// ================= GET SERVICES BY CATEGORY =================
// GET /api/services/category/Waxing

router.get("/category/:category", getServicesByCategory);

// ================= GET SINGLE SERVICE =================
// GET /api/services/:id

router.get("/:id", getServiceById);

// ================= CREATE SERVICE =================
// POST /api/services

router.post("/", protect, admin, createService);

// ================= UPDATE SERVICE =================
// PUT /api/services/:id

router.put("/:id", protect, admin, updateService);

// ================= DELETE SERVICE =================
// DELETE /api/services/:id

router.delete("/:id", protect, admin, deleteService);

module.exports = router;