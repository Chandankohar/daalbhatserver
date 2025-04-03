const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  registerid:{type:String,required:true},
  contact:{type:String,require:true},
  description: { type: String ,require:true},
  rating:{type: String},
  password: { type: String, required: true },
  cuisine:{type: String, required: true},
  image:{type:String,require:true},
  foodCourt: { type: mongoose.Schema.Types.ObjectId, ref: "FoodCourt" ,require:true},
  
  role:{type:String,default:'resturant'}
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
