const User = require("../models/User");

const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items } = req.body;

    // Check karein kya Order me Welcome Offer item shamil tha
    const hasOfferItem = items && items.some((item) => item.isWelcomeOffer === true);

    if (hasOfferItem) {
      // Permanently Lock Offer: User ko next time ke liye block karein
      await User.findByIdAndUpdate(userId, {
        hasClaimedWelcomeOffer: true,
      });
    }

    // Order Place hone ke baad Cart Empty karein
    await User.findByIdAndUpdate(userId, {
      $set: { cart: [] },
    });

    return res.status(201).json({
      success: true,
      message: "Order successfully place ho gaya!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Order processing me error aaya",
      error: error.message,
    });
  }
};

module.exports = { createOrder };