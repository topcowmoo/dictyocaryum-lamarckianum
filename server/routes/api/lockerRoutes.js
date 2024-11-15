const router = require('express').Router(); // Import the Express Router to create route handlers
const auth = require('../../auth'); // Import authentication middleware to protect routes

// Import the controller functions that handle the logic for each route
const {
    getAllPasswords, // Function to retrieve all passwords
    createPassword, // Function to create a new password entry
    updatePassword, // Function to update an existing password entry
    deletePassword, // Function to delete a password entry
} = require('../../controllers/lockerController');

// Define routes for locker-related operations

// Route for handling GET and POST requests to the base URL ('/locker')
// - GET: Retrieve all passwords (protected by auth)
// - POST: Create a new password entry (protected by auth)
router.route('/')
    .get(auth.authenticateToken, getAllPasswords) // Protect the GET route with authentication
    .post(auth.authenticateToken, createPassword); // Protect the POST route with authentication

// Route for handling PUT and DELETE requests to '/locker/:id'
// - PUT: Update a specific password entry by ID (protected by auth)
// - DELETE: Delete a specific password entry by ID (protected by auth)
router.route('/:id')
    .put(auth.authenticateToken, updatePassword) // Protect the PUT route with authentication
    .delete(auth.authenticateToken, deletePassword); // Protect the DELETE route with authentication

module.exports = router; // Export the router to use it in the main API setup
