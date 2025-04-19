const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    question: {
        type: String,
        required: true,
        trim: true
    },
    options: [
        {
            optionText: { type: String, required: true },
            votes: { type: Number, default: 0 }
        }
    ],
    totalVotes: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    votedUsers: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            optionIndex: {
                type: Number,
                required: true
            },
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Poll', pollSchema);
