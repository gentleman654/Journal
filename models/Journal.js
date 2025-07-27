const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  dateCreated: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Journal', journalSchema);
