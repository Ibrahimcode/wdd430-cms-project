const mongoose = require("mongoose");

const sequenceShema = mongoose.Schema({
  maxContactId: { type: String, required: true },
  maxDocumentId: { type: String, required: true },
  maxMessageId: { type: String, required: true },
});

module.exports = mongoose.model("Sequence", sequenceShema);
