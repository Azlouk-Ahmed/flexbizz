const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const propositionSchema = new Schema({
  announcementId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Announcement', 
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  coverLetter: {
    type: String
  },
  portfolio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio',
  },

},{timestamps: true});

module.exports = mongoose.model('Proposition', propositionSchema);
