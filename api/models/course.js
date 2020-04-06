const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  featured: { type: Boolean, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Course", courseSchema);
