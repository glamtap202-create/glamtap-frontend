const mongoose = require("mongoose");

const statsSchema = new mongoose.Schema({

    professionals:Number,
    downloads:Number,
    completed:Number,
    cities:Number,
    rating:Number

});

module.exports = mongoose.model("Stats",statsSchema);