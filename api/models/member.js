const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  image: { type: String, required: true },
  designation: { type: String, required: true },
  abbr: { type: String, required: true },
  featured: { type: Boolean, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Member", memberSchema);
