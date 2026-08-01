const jwt = require("jsonwebtoken");
const Salon = require("../models/Salon");

// Verifies token belongs to a real, approved salon
const protectSalon = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.salon = {
        id: decoded.id,
      };

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized, invalid token",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "Not authorized, no token",
    });
  }
};

// Confirms salon is approved (extra safety, e.g. if approval revoked after login)
const approvedOnly = async (req, res, next) => {
  try {
    const salon = await Salon.findById(req.salon.id);

    if (!salon) {
      return res.status(404).json({ message: "Salon not found" });
    }

    if (salon.approvalStatus !== "Approved") {
      return res.status(403).json({
        message: "Access denied. Salon not approved.",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { protectSalon, approvedOnly };