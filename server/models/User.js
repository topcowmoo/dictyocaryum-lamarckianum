// Importing Schema and model from Mongoose
const { Schema, model } = require("mongoose");

// Defining a schema for the 'User' collection
const userSchema = new Schema({
  // email: User's email address, used as a unique identifier
  email: {
    type: String,  // String data type for the email address
    unique: true,  // Ensures each email is unique in the database
    required: "Email is required",  // Custom error message if the email is not provided
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],  // Regular expression to validate email format
  },
  // passwordHash: Hashed version of the user's password for security
  passwordHash: {
    type: String,  // String data type for storing the hashed password
    required: true,  // This field is mandatory
  },
  // salt: Salt used in the password hashing process for added security
  salt: {
    type: String,  // String data type for storing the salt
    required: true,  // This field is mandatory
  },
  // createdAt: Timestamp for when the user account was created
  createdAt: {
    type: Date,  // Date data type for the creation timestamp
    default: Date.now,  // Defaults to the current date and time
  },
  // lastLogin: Timestamp for the user's most recent login
  lastLogin: {
    type: Date,  // Date data type for the last login timestamp
  },
  // role: Defines the user's role, either 'user' or 'admin'
  role: {
    type: String,  // String data type for the role
    enum: ["user", "admin"],  // Allowed values for the role
    default: "user",  // Defaults to 'user' if no role is specified
  },
});


// Exporting the model for use in other parts of the application
module.exports = model("User", userSchema);
