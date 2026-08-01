// controllers/offerController.js
const OfferClaim = require('./OfferClaim');
const User = require('./User'); // Aapki existing User file

const claimOneRupeeService = async (req, res) => {
  try {
    const userId = req.user._id; // Auth Middleware se User ID
    const { serviceId } = req.body;

    if (!serviceId) {
      return res.status(400).json({ success: false, message: "Service ID zaroori hai!" });
    }

    // Step 1: Check karein ki user ne pehle claim kiya hai ya nahi
    const existingClaim = await OfferClaim.findOne({ userId });

    if (existingClaim) {
      return res.status(400).json({ 
        success: false, 
        message: "Aap pehle hi Welcome Offer claim kar chuke hain!" 
      });
    }

    // Step 2: DB me Entry Create karein (Claim Record)
    const newClaim = await OfferClaim.create({
      userId,
      serviceId,
      status: 'PENDING'
    });

    // Step 3: Aapke Existing User ki Cart me Item Push Karein
    // (Aapke existing User schema ke according cart update logic)
    await User.findByIdAndUpdate(userId, {
      $push: {
        cart: {
          serviceId: serviceId,
          price: 1,
          isWelcomeOffer: true
        }
      }
    });

    return res.status(200).json({
      success: true,
      message: "₹1 Offer successfully claim ho gaya aur Cart me add ho gaya!",
      claimDetails: newClaim
    });

  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: "Server Error", 
      error: error.message 
    });
  }
};

module.exports = { claimOneRupeeService };