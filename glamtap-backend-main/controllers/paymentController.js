const Payment = require("../models/Payment");

// Get all payments (Admin)
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("bookingId", "totalAmount status bookingDate")
      .populate("userId", "name email")
      .populate("salonId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single payment
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("bookingId")
      .populate("userId", "name email")
      .populate("salonId", "name");

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update payment status (Admin) — e.g. mark refunded
const updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status, paidAt: status === "Success" ? new Date() : null },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllPayments, getPaymentById, updatePaymentStatus };