const mongoose = require('mongoose');

const workVersionSchema = new mongoose.Schema({
  versionNumber: {
    type: Number,
    required: true,
    enum: [1, 2, 3], 
  },
  content: {
    type: String, 
    required: true,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
});

const currentProjectSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  announcement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Announcement',
    required: true,
  },
  workVersions: [workVersionSchema],
}, { timestamps: true });

const CurrentProject = mongoose.model('CurrentProject', currentProjectSchema);

module.exports = CurrentProject;
