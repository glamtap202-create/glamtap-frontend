const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // 🟢 Welcome Offer Status Track karne ke liye
    hasClaimedWelcomeOffer: {
      type: Boolean,
      default: false,
    },

    // 🕒 24-Hour Timer Expiry Store karne ke liye
    welcomeOfferExpiresAt: {
      type: Date,
      default: null,
    },

    // 🛒 User Cart Array
    cart: [
      {
        serviceId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
        },
        price: {
          type: Number,
          default: 1,
        },
        isWelcomeOffer: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);