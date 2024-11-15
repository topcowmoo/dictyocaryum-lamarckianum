const router = require('express').Router(); // Import the Express Router
const apiRoutes = require('./api'); // Import API routes

// Use the API routes under the '/api' path
// All requests to '/api' will be forwarded to the apiRoutes
router.use('/api', apiRoutes);

// Handle any undefined routes
// If a request doesn't match any defined routes, respond with a 404 error
router.use((req, res) => {
    res.status(404).json({ error: 'Route not found' }); // Respond with a JSON error message
});

module.exports = router; // Export the router to use in the main server setup
