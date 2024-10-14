const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController');

// Route for getting all users and creating a new user
router.route('/')
    .get(getAllUser)     // Get all users
    .post(createUser);   // Create a new user

// Route for handling individual user actions (by ID)
router.route('/:id')
    .get(getUserById)    // Get a single user by ID
    .put(updateUser)     // Update a user by ID
    .delete(deleteUser); // Delete a user by ID

module.exports = router;
