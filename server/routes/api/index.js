const router = require('express').Router();
const userRoutes = require('./userRoutes');
const lockerRoutes = require('./lockerRoutes');

router.use('/user', userRoutes);
router.use('/locker', lockerRoutes);

module.exports = router;
