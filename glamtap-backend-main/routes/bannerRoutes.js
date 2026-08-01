const express = require("express");
const router = express.Router();

const {
  createBanner,
  getBanners,
} = require("../controllers/bannerController");

router.post("/", createBanner);   // ✅ POST
router.get("/", getBanners);      // ✅ GET

module.exports = router;