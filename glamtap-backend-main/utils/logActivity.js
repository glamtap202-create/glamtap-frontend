const ActivityLog = require("../models/ActivityLog");

const logActivity = async ({ adminName = "Admin", action, module, details = "" }) => {
  try {
    await ActivityLog.create({ adminName, action, module, details });
  } catch (err) {
    console.log("⚠️ Failed to log activity:", err.message);
  }
};

module.exports = logActivity;