const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  name: String,
  tags: String,
  rating: Number,
  reviews: Number,
  views: Number,
  brand: [String],
  whyImportant: [String],
  recommendedFor: [String],
  benefits: [String],
  note: [String],
  salontymSuggestion: [String],
  yoursToTake: [String],
  whySalontym: [String],
  formalWarning: [String],
  items: [String],
  price: Number,
  oldPrice: Number,
  action: String,
  img: String,
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Combo", packageSchema);