const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  registerid:{type:String,required:true},
  contact:{type:String,require:true},
  description: { type: String },
  rating:{type: String, required: true},
  cuisine:{type: String, required: true},
  foodCourt: { type: mongoose.Schema.Types.ObjectId, ref: "FoodCourt" },
  menus: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
  role:{type:String,default:'resturant'}
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
