const SupportTicket = require("../models/SupportTicket");

// Create ticket (logged-in user)
const createTicket = async (req, res) => {
  try {
    const { subject, message, priority } = req.body;

    const ticket = await SupportTicket.create({
      userId: req.user.id,
      subject,
      message,
      priority,
    });

    res.status(201).json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get my tickets (logged-in user)
const getMyTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ success: true, tickets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tickets (Admin)
const getAllTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find()
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, tickets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update ticket status / reply (Admin)
const updateTicket = async (req, res) => {
  try {
    const { status, adminReply } = req.body;

    const ticket = await SupportTicket.findByIdAndUpdate(
      req.params.id,
      { status, adminReply },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete ticket (Admin)
const deleteTicket = async (req, res) => {
  try {
    const ticket = await SupportTicket.findByIdAndDelete(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json({ success: true, message: "Ticket deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTicket,
  getMyTickets,
  getAllTickets,
  updateTicket,
  deleteTicket,
};