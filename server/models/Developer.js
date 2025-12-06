const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255
  },
  role: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Full-Stack']
  },
  tech_stack: {
    type: [String],
    required: true
  },
  experience: {
    type: Number,
    required: true,
    min: 0,
    max: 50
  },
  description: {
    type: String,
    maxlength: 1000
  },
  photo_url: {
    type: String
  },
  joining_date: {
    type: Date,
    default: Date.now
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Developer', developerSchema);
