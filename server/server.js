const express = require('express'); // Import the Express framework
const path = require('path'); // Import the path module for working with file and directory paths
const mongoose = require('mongoose'); // Import Mongoose to interact with MongoDB
const cors = require('cors'); // Import CORS middleware to handle cross-origin requests
const cookieParser = require('cookie-parser'); // Import cookie-parser to parse cookies
const userRoutes = require('./routes/api/userRoutes'); // Import user-related routes
const lockerRoutes = require('./routes/api/lockerRoutes'); // Import locker-related routes
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // Load environment variables from a .env file

const app = express(); // Create an Express application
const PORT = process.env.PORT || 8001; // Set the server port from environment variables or default to 8001

// List of allowed origins for CORS
const allowedOrigins = [
  'http://localhost:8000', // Local development origin
  'https://vpl.onrender.com', // Deployed application origin
];

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies from incoming requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests from allowed origins or if the origin is undefined (e.g., Postman or same-origin requests)
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Deny the request if the origin is not allowed
    }
  },
  credentials: true, // Allow credentials (cookies) to be sent in cross-origin requests
}));
app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

// API Route setup
app.use('/api/user', userRoutes); // Use user-related routes for '/api/user' endpoint
app.use('/api/locker', lockerRoutes); // Use locker-related routes for '/api/locker' endpoint

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist'))); // Serve static files from the client/dist directory
  app.get('*', (req, res) => {
    // For any other route, send the index.html file from the client/dist directory
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI) // Connect to MongoDB using the URI from environment variables
  .then(() => console.log('MongoDB connected successfully')) // Log success message if connected
  .catch((err) => console.error('MongoDB connection error:', err)); // Log error message if connection fails

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log message indicating that the server is running
});
