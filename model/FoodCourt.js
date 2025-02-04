const mongoose = require("mongoose");

const foodcourtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String ,require:true},
  location: { type: String, required: true },
  university:{type: String, required: true },
  
});

module.exports = mongoose.model("FoodCourt", foodcourtSchema);
