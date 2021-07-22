const mongoose = require("mongoose");

const contactShema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  imageUrl: { type: String },
  group: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
  // sender: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" },
});

module.exports = mongoose.model("Contact", contactShema);
