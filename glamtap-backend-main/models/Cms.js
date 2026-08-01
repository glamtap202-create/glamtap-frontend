const mongoose = require("mongoose");

const cmsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "draft"],
      default: "draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cms", cmsSchema);