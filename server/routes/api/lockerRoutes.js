const router = require('express').Router(); // Import the Express Router to create route handlers
const auth = require('../../auth'); // Import authentication middleware to protect routes

// Import the controller functions that handle the logic for each route
const {
  getAllPasswords,
  createPassword,
  updatePassword,
  deletePassword,
  restorePassword, // Import the restorePassword controller function
} = require('../../controllers/lockerController');

// Define routes for locker-related operations

// Route for handling GET and POST requests to the base URL ('/locker')
router.route('/')
  .get(auth.authenticateToken, getAllPasswords) // Protect the GET route with authentication
  .post(auth.authenticateToken, createPassword); // Protect the POST route with authentication

// Route for handling PUT, PATCH, DELETE requests to '/locker/:id'
router.route('/:id')
  .put(auth.authenticateToken, updatePassword) // Protect the PUT route with authentication
  .patch(auth.authenticateToken, updatePassword) // Protect the PATCH route with authentication
  .delete(auth.authenticateToken, deletePassword); // Protect the DELETE route with authentication

// New route for restoring deleted entries
router.route('/:id/restore')
  .patch(auth.authenticateToken, restorePassword); // Restore a specific entry by ID

module.exports = router; // Export the router to use it in the main API setup
