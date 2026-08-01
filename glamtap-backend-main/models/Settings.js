const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    platformCommission: {
      type: Number,
      default: 10, // percentage
    },
    taxPercentage: {
      type: Number,
      default: 18, // GST %
    },
    siteEmail: {
      type: String,
      default: "",
    },
    sitePhone: {
      type: String,
      default: "",
    },
    siteAddress: {
      type: String,
      default: "",
    },
    supportEmail: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingsSchema);