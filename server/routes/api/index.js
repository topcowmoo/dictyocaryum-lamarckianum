const router = require('express').Router();
const userRoutes = require('./userRoutes');
const lockerRoutes = require('./lockerRoutes');

// Middleware to handle requests starting with '/users' and '/thoughts'
router.use('/user', userRoutes);
router.use('/locker', lockerRoutes);

// Exporting the router to be used in other parts of the application
module.exports = router;