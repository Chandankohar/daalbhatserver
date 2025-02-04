const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image:{type: String, required: true},
  rating:{type: String, required: true},
  cuisine:{type: String, required: true},
  ingredients:[{type: Number, required: true}],
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
});

module.exports = mongoose.model("Menu", menuSchema);
