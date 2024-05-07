const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    announcement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Announcement',
        required: true
    },
    clientRating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    clientComment: {
        type: String
    },
    budget: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = Achievement;
