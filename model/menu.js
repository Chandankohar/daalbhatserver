const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image:{type: String, required: true},
  rating:{type: String},
  cuisine:{type: String, required: true},
  ingredients:[{type: String, required: true}],
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant",require:true },
});

module.exports = mongoose.model("Menu", menuSchema);
