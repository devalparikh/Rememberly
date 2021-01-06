const mongoose = require('mongoose');

// Instantiate mongoose schema
const Schema = mongoose.Schema;

// New user schema
const checkinSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    mood: {
        type: Number,
        required: true
    },
    activities: {
        type: [String],
    },
    notes: {
        type: String,
    }
}, {
    timestamps: true,
});

const Checkin = mongoose.model('Checkin', checkinSchema);

module.exports = Checkin;