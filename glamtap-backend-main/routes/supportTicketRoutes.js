const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const {
  createTicket,
  getMyTickets,
  getAllTickets,
  updateTicket,
  deleteTicket,
} = require("../controllers/supportTicketController");

// User routes
router.post("/", protect, createTicket);
router.get("/my-tickets", protect, getMyTickets);

// Admin routes
router.get("/", protect, admin, getAllTickets);
router.patch("/:id", protect, admin, updateTicket);
router.delete("/:id", protect, admin, deleteTicket);

module.exports = router;