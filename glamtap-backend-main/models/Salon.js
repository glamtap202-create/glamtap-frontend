const mongoose = require("mongoose");

const salonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: true,
      sparse: true, // allows existing salons without email to not conflict
    },
    password: {
      type: String,
      // not required at schema level — existing salons won't have one yet
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    image: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    approvalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Salon", salonSchema);