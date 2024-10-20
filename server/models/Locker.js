const { Schema, model } = require('mongoose');

const lockerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    serviceName: {
        type: String,
        required: 'Service name is required',
        trim: true,
    },
    username: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: 'Password is required',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model('Locker', lockerSchema);
