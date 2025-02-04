const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact:{type:String,require:true},
  college:{type:String,require:true},
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

module.exports = mongoose.model("User", userSchema);
