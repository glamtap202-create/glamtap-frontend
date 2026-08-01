const express = require("express");

const router = express.Router();

const {
  getCombos,
  getComboById,
  createCombo,
} = require("../controllers/comboController");

router.get("/", getCombos);
router.get("/:id", getComboById);
router.post("/", createCombo);

module.exports = router;