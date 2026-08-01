const express = require("express");
const router = express.Router();

const {
  createCms,
  getCms,
  getCmsById,
  updateCms,
  deleteCms,
} = require("../controllers/cmsController");

router.post("/", createCms);
router.get("/", getCms);
router.get("/:id", getCmsById);
router.put("/:id", updateCms);
router.delete("/:id", deleteCms);

module.exports = router;