const mongoose = require("mongoose"); // Import the mongoose library

// Establish a connection to the MongoDB database using the connection string from environment variables
mongoose
  .connect(process.env.MONGODB_URI) // Connect to MongoDB using the URI provided in environment variables
  .then(() => console.log("MongoDB connected")) // Log a success message if the connection is successful
  .catch((err) => console.log("Connection failed", err)); // Log an error message if the connection fails

// Export the mongoose connection to use it in other parts of the application
module.exports = mongoose.connection;
