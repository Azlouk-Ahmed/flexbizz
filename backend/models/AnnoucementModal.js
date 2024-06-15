const mongoose = require('mongoose');

const { Schema } = mongoose;

const announcementSchema = new Schema({
  position: {
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
    enum: ['Full-Time', 'Part-Time', 'Contract', 'Hourly', 'Freelance', 'On-Site'],
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
  budgetMin: {
    type: Number,
    required: true,
  },
  budgetMax: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
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
  applied: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  workingEnvironnement: {
    type: String,
    default: 'on site'
  },
  status: {
    type: Boolean,
    default: false
  },
  attachment: {
    type: String,
  },
});

module.exports = mongoose.model('Announcement', announcementSchema);
