const mongoose = require("mongoose");

const beauticianSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    salonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salon",
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      default: 0,
    },
    specialization: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Beautician", beauticianSchema);