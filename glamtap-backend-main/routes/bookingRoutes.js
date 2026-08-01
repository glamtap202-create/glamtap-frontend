const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const {
  createBooking,
  getMyBookings,
  getAllBookings,
  getBookingById,
  updateBooking,
  updateBookingStatus,
  cancelBooking,
  deleteBooking,
} = require("../controllers/bookingController");

// Create Booking
router.post("/", protect, createBooking);

// User Bookings
router.get("/my-bookings", protect, getMyBookings);

// Admin All Bookings
router.get("/", protect, admin, getAllBookings);

// Single Booking
router.get("/:id", protect, getBookingById);

// Update Booking
router.put("/:id", protect, updateBooking);

// Update Status
router.patch("/:id/status", protect, admin, updateBookingStatus);

// Cancel Booking
router.patch("/:id/cancel", protect, cancelBooking);

// Delete Booking
router.delete("/:id", protect, admin, deleteBooking);

module.exports = router;