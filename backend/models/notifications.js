const mongoose = require('mongoose');

const {Schema} = mongoose;

const notificationSchema = new Schema({
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fromId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  elementId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  notificationType: {
    type: String,
    required: true,
    enum: ['like', 'comment', 'announcement', 'apply', 'acceptence'],
  },
  username: {
    type: String,
    required: true,
  }
},{timestamps: true});

module.exports = mongoose.model('Notification', notificationSchema);
