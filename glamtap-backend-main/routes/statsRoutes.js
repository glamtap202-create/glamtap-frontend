const router = require("express").Router();

const {
  getStats,
  createStats,
} = require("../controllers/statsController");

router.get("/", getStats);
router.post("/", createStats);

module.exports = router;