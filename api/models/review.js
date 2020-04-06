const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  value: { type: Number, required: true },
  author: { type: String, required: true },
  comment: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model("Review", reviewSchema);
