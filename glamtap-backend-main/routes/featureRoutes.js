const router = require("express").Router();

const {
  getFeatures,
  createFeature,
} = require("../controllers/featureController");

router.get("/", getFeatures);
router.post("/", createFeature);

module.exports = router;