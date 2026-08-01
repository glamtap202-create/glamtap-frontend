const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
      default: "Admin",
    },
    action: {
      type: String,
      required: true, // e.g. "Deleted CMS page", "Updated settings"
    },
    module: {
      type: String,
      required: true, // e.g. "cms", "settings", "roles"
    },
    details: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActivityLog", activityLogSchema);