const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: "Email is required",
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please fill a valid email address"],
  },
  passwordHash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
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
    enum: ["user", "admin"],
    default: "user",
  },
});

module.exports = model("User", userSchema);
