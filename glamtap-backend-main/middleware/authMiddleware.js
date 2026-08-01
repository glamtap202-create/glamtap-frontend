const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 1. Header se token nikaalein
      token = req.headers.authorization.split(" ")[1];

      // 2. Token decode karein
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. User ko Database se fetch karein (password chhod kar)
      const user = await User.findById(decoded.id || decoded._id).select("-password");

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User account nahi mila, unauthorized access!",
        });
      }

      // 4. Complete User object req.user me attach karein
      req.user = user;

      next();
    } catch (error) {
      console.error("JWT Verification Error:", error.message);
      return res.status(401).json({
        success: false,
        message: "Not authorized, invalid or expired token",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token provided",
    });
  }
};

module.exports = { protect };