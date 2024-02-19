const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  website: {
    type: String,
  },
  socialMedia: {
    type: Object, 
  },

  projects: [{
    name: String,
    description: String,
    link: String,
    technologies: []
  }],
  skills: [{
    type: String,
  }],
  experience: [{
    type: Object, 
  }],

  education: [{
    type: Object, 
  }],
  awards: [{
    type: String,
  }],
  testimonials: [{
    type: String,
  }],

}, {
  timestamps: true, 
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
