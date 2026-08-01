const Cart = require("../models/Cart");
const Booking = require("../models/Booking");
const Address = require("../models/Address");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// Checkout
const checkout = async (req, res) => {
  try {
    const {
      userId,
      salonId,
      beauticianId,
      bookingDate,
      bookingTime,
      paymentMethod,
      addressId,
    } = req.body;

    // Get Cart Items
    const cartItems = await Cart.find({ userId }).populate("serviceId");

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // Calculate Total
    let totalAmount = 0;

    cartItems.forEach((item) => {
      totalAmount += item.serviceId.price * item.quantity;
    });

    // Create Booking for each service
    const bookings = [];

    for (const item of cartItems) {
      const booking = await Booking.create({
        userId,
        salonId,
        beauticianId,
        serviceId: item.serviceId._id,
        bookingDate,
        bookingTime,
        totalAmount: item.serviceId.price * item.quantity,
        paymentMethod,
      });

      bookings.push(booking);
    }

    // Clear Cart
    await Cart.deleteMany({ userId });

    // Send Confirmation Email
    console.log("CHECKOUT userId received:", userId);

    const user = await User.findById(userId);
    console.log("USER FOUND:", user);

    if (user && user.email) {
      console.log("SENDING EMAIL TO:", user.email);

      const serviceListHtml = cartItems
        .map(
          (item) =>
            `<li>${item.serviceId.name} - ₹${item.serviceId.price} x ${item.quantity}</li>`
        )
        .join("");

      await sendEmail({
        to: user.email,
        subject: "Your Glow Metro Booking is Confirmed!",
        html: `
          <h2>Thank you, ${user.name || "Customer"}!</h2>
          <p>Your booking has been confirmed.</p>
          <ul>${serviceListHtml}</ul>
          <p><strong>Total: ₹${totalAmount}</strong></p>
          <p>Payment Method: ${paymentMethod}</p>
        `,
      });

      console.log("✅ EMAIL SEND ATTEMPT DONE");
    } else {
      console.log("❌ No user found OR user has no email. userId was:", userId);
    }

    res.status(201).json({
      success: true,
      message: "Checkout completed successfully",
      addressId,
      totalAmount,
      bookings,
    });

  } catch (error) {
    console.log("CHECKOUT ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  checkout,
};