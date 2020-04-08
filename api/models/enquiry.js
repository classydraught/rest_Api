const mongoose = require("mongoose");

const enquirySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  contactType: { type: String, required: true },
  agree: { type: Boolean, required: true },
  message: { type: String, required: true },
  date: { type: String, required: true },
  phone: { type: Number, required: true },
});

module.exports = mongoose.model("Enquiry", enquirySchema);
