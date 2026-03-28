const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: String,
  startDate:   { type: Date, required: true },
  endDate:     { type: Date },
  color:       { type: String, default: '#4F46E5' },
  category:    { type: String, enum: ['lecture', 'exam', 'deadline', 'other'], default: 'other' },
  owner:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);