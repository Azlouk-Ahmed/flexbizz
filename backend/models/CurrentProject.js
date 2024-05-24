const mongoose = require('mongoose');

const workVersionSchema = new mongoose.Schema({
  versionNumber: {
    type: Number,
    required: true,
    enum: [1, 2, 3], // Assuming there are exactly three versions
  },
  content: {
    type: String, // or Buffer, depending on the type of work
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
