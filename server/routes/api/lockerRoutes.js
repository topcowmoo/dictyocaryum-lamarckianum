const router = require('express').Router();
const auth = require('../../auth'); // Make sure to import your auth middleware

const {
    getAllPasswords,
    createPassword,
    updatePassword,
    deletePassword,
} = require('../../controllers/lockerController');

// Protect routes with auth.authenticateToken middleware
router.route('/')
    .get(auth.authenticateToken, getAllPasswords) // Protect the GET route
    .post(auth.authenticateToken, createPassword); // Protect the POST route

router.route('/:id')
    .put(auth.authenticateToken, updatePassword) // Protect the PUT route
    .delete(auth.authenticateToken, deletePassword); // Protect the DELETE route

module.exports = router;
