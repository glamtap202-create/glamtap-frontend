const User = require("../models/User");

// 1. GET Status Controller
const getOfferStatus = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User nahi mila" });
    }

    const cartList = user.cart || [];
    const claimedItem = cartList.find((item) => item.isWelcomeOffer === true);

    const now = new Date();
    const isExpired = user.welcomeOfferExpiresAt
      ? new Date(user.welcomeOfferExpiresAt) < now
      : false;

    return res.status(200).json({
      success: true,
      hasClaimedWelcomeOffer: user.hasClaimedWelcomeOffer || false,
      isOfferInCart: !!claimedItem,
      claimedServiceId: claimedItem ? claimedItem.serviceId : null,
      expiresAt: user.welcomeOfferExpiresAt, // 👈 Frontend ke liye Expiry Date
      isExpired: isExpired,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 2. POST Claim Controller
const claimOneRupeeService = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { serviceId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User nahi mila" });
    }

    if (user.hasClaimedWelcomeOffer) {
      return res.status(400).json({
        success: false,
        message: "Aap pehle hi Welcome Offer claim kar chuke hain!",
      });
    }

    const cartList = user.cart || [];
    const alreadyInCart = cartList.some((item) => item.isWelcomeOffer === true);
    if (alreadyInCart) {
      return res.status(400).json({
        success: false,
        message: "Aapki cart me pehle se ₹1 ka offer added hai!",
      });
    }

    // 🕒 24 Ghante aage ka Time calculate karein
    const expiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.cart.push({
      serviceId,
      price: 1,
      isWelcomeOffer: true,
    });
    user.welcomeOfferExpiresAt = expiryTime; // 👈 DB me Expiry Save Karein

    await user.save();

    return res.status(200).json({
      success: true,
      message: "₹1 Service Cart me successfully add ho gayi!",
      cart: user.cart,
      expiresAt: expiryTime, // 👈 Response me send karein
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getOfferStatus, claimOneRupeeService };