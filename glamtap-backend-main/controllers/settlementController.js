const Settlement = require("../models/Settlement");
const Booking = require("../models/Booking");

// Create a settlement batch for a salon (Admin)
// Pulls all Unsettled, Completed bookings for that salon in the date range
const createSettlement = async (req, res) => {
  try {
    const { salonId, periodStart, periodEnd } = req.body;

    const bookings = await Booking.find({
      salonId,
      settlementStatus: "Unsettled",
      status: "Completed",
      bookingDate: { $gte: periodStart, $lte: periodEnd },
    });

    if (bookings.length === 0) {
      return res.status(400).json({
        message: "No unsettled completed bookings found for this period",
      });
    }

    const totalAmount = bookings.reduce((sum, b) => sum + b.totalAmount, 0);

    const settlement = await Settlement.create({
      salonId,
      bookings: bookings.map((b) => b._id),
      totalAmount,
      periodStart,
      periodEnd,
    });

    res.status(201).json({ success: true, settlement });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all settlements (Admin)
const getAllSettlements = async (req, res) => {
  try {
    const settlements = await Settlement.find()
      .populate("salonId", "name ownerName")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, settlements });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark settlement as Paid (Admin) — also flips linked bookings to Settled
const markSettlementPaid = async (req, res) => {
  try {
    const settlement = await Settlement.findById(req.params.id);

    if (!settlement) {
      return res.status(404).json({ message: "Settlement not found" });
    }

    settlement.status = "Paid";
    settlement.paidAt = new Date();
    await settlement.save();

    await Booking.updateMany(
      { _id: { $in: settlement.bookings } },
      { settlementStatus: "Settled" }
    );

    res.status(200).json({ success: true, settlement });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createSettlement, getAllSettlements, markSettlementPaid };