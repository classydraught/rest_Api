const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  category: String,
  image: String,
  price: Number,
  featured: Boolean,
  description: String,
});

module.exports = mongoose.model("Course", courseSchema);
