// Importing Schema and model from Mongoose library
const { Schema, model } = require('mongoose');

// Defining a schema for the 'Locker' collection
const lockerSchema = new Schema({
    // userId: References the ObjectId of a 'User' document, linking each locker entry to a user
    userId: {
        type: Schema.Types.ObjectId,  // Using ObjectId type for referencing another document
        ref: 'User',  // References the 'User' model
        required: true,  // userId is mandatory for associating locker entries with users
    },
      // name: Specifies the name of the locker entry
      name: {
        type: String,  // String data type for the name
        trim: true,  // Trims whitespace from the name
    },
    // username: Optional field for storing the username associated with the service
    username: {
        type: String,  // String data type for the username
        trim: true,  // Trims whitespace from the username
    },
    // password: Encrypted password associated with the service
    password: {
        type: String,  // String data type for the password
        required: 'Password is required',  // Custom error message if password is missing
    },
    // createdAt: Timestamp for when the locker entry was created
    createdAt: {
        type: Date,  // Date data type for creation timestamp
        default: Date.now,  // Defaults to the current date and time
    },
    // category: Specifies the category of the entry for organizational purposes
    category: {
        type: String,  // String data type for the category
        enum: ["All", "Identification", "Cards", "Login", "Entertainment", "Deleted"],  // Allowed values for the category
        default: "All",  // Default category if none is provided
    },
// Previous category: Used for tracking the previous category before deletion
    previousCategory: {
        type: String,
        enum: ["Identification", "Cards", "Login", "Entertainment", "All"], // no "Deleted" here
        default: null,
      },
});

// Exporting the model for use in other parts of the application
module.exports = model('Locker', lockerSchema);
