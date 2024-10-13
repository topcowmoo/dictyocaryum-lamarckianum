const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { 
        type: String,
        unique: true,
        trim: true,
        required: 'Username is required',
    },
    email: {
        type: String,
        unique: true,
        required: 'Email is required',
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please fill a valid email address'],
    },
    passwordHash: { 
        type: String,
        required: 'Password is required',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastLogin: {
        type: Date,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
});

module.exports = model('User', userSchema);
