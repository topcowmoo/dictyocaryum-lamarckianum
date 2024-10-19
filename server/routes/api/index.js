const router = require('express').Router();
const userRoutes = require('./userRoutes');
const lockerRoutes = require('./lockerRoutes');

router.use('/users', userRoutes);
router.use('/locker', lockerRoutes);

module.exports = router;
