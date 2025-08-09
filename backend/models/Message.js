// models/Message.js
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  wa_id: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
  timestamp: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
  sender: {
    type: String,
    required: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);
