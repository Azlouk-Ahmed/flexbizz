const mongoose = require('mongoose');

const { Schema, types } = mongoose;

const announcementSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 500,
  },
  jobType: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Contract', 'Hourly', 'Remote', 'On-Site'],
    required: true,
  },
  skillsRequired: {
    type: Array,
    required: true,
    validate: {
      validator: (skills) => skills.length > 0 && skills.length <= 10,
      message: 'Please provide at least 1 and up to 10 skills required.',
    },
  },
  budgetRange: {
    type: String,
    required: true,
    match: /^\DT\d+-\DT\d+$/,
    message: 'Budget range must be in the format "DT[low]-[high]".',
  },
  deadline: {
    type: Date,
    required: true,
    validate: {
      validator: (deadline) => deadline >= Date.now(),
      message: 'Deadline must be in the future.',
    },
  },
  additionalDetails: {
    type: String,
    trim: true,
    maxlength: 250,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  status: {
    type: String,
    enum: ['available', 'working on', 'not available'],
    default: 'available'
  }
});

module.exports = mongoose.model('Announcement', announcementSchema);
