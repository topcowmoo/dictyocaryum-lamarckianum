const router = require('express').Router(); // Import the Express Router to handle routing
const userRoutes = require('./userRoutes'); // Import routes related to user operations
const lockerRoutes = require('./lockerRoutes'); // Import routes related to locker operations

// Mount the user routes under the '/users' endpoint
// All user-related API requests will start with '/users'
router.use('/users', userRoutes);

// Mount the locker routes under the '/locker' endpoint
// All locker-related API requests will start with '/locker'
router.use('/locker', lockerRoutes);

module.exports = router; // Export the router so it can be used in the API layer of the app
